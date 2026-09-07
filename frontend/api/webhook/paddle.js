import { Paddle, Environment } from '@paddle/paddle-node-sdk';
import admin from 'firebase-admin';

/**
 * Vercel Serverless Configuration:
 * Disable automatic body parsing to allow raw signature verification
 */
export const config = {
  api: {
    bodyParser: false
  }
};

/**
 * Helper to safely initialize Firebase Admin SDK (Singleton)
 */
function getFirebaseAdmin() {
  if (admin.apps && admin.apps.length > 0) {
    return admin.app();
  }

  // 1. Env variable with full JSON string (FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_ADMIN_CREDENTIALS)
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.FIREBASE_ADMIN_CREDENTIALS;
  if (serviceAccountJson) {
    try {
      const parsed = typeof serviceAccountJson === 'string' ? JSON.parse(serviceAccountJson) : serviceAccountJson;
      return admin.initializeApp({
        credential: admin.credential.cert(parsed),
        projectId: parsed.project_id || process.env.FIREBASE_PROJECT_ID || 'healthlexmed'
      });
    } catch (e) {
      console.error('[Firebase Admin] Error parsing service account JSON:', e);
    }
  }

  // 2. Split env vars: FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.REACT_APP_FIREBASE_PROJECT_ID || 'healthlexmed';

  if (clientEmail && privateKey) {
    try {
      return admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey
        }),
        projectId
      });
    } catch (e) {
      console.error('[Firebase Admin] Error initializing with individual env vars:', e);
    }
  }

  // 3. Fallback: Google Application Default Credentials
  try {
    return admin.initializeApp({
      projectId
    });
  } catch (err) {
    console.error('[Firebase Admin] Fallback initialization error:', err);
    return null;
  }
}

/**
 * Updates a user's subscription status in Firestore safely.
 * Matches by userId (UID) first; falls back to customerEmail if userId not found.
 */
async function updateUserSubscription(userId, customerEmail, updateFields) {
  try {
    const adminApp = getFirebaseAdmin();
    if (!adminApp) {
      console.error('[Paddle Webhook Error] Firebase Admin could not be initialized.');
      return false;
    }

    const db = admin.firestore();
    let targetDocRef = null;

    // 1. Check direct userId (UID)
    if (userId && typeof userId === 'string' && userId !== 'unknown' && userId.trim() !== '') {
      const docRef = db.collection('users').doc(userId.trim());
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        targetDocRef = docRef;
      }
    }

    // 2. Fallback to customerEmail query if doc wasn't found by userId
    if (!targetDocRef && customerEmail && typeof customerEmail === 'string' && customerEmail.includes('@')) {
      const cleanEmail = customerEmail.toLowerCase().trim();
      const snap = await db.collection('users').where('email', '==', cleanEmail).limit(1).get();
      if (!snap.empty) {
        targetDocRef = snap.docs[0].ref;
      }
    }

    if (targetDocRef) {
      await targetDocRef.set({
        ...updateFields,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      console.log(`[Paddle Webhook] Firestore user updated successfully: ${targetDocRef.id}`, updateFields);
      return true;
    } else {
      console.warn(`[Paddle Webhook] No matching Firestore user found for UID: ${userId}, Email: ${customerEmail}`);
      return false;
    }
  } catch (err) {
    console.error('[Paddle Webhook] Error updating Firestore:', err);
    return false;
  }
}

/**
 * Helper to safely extract raw request body as UTF-8 string
 */
async function getRawBody(req) {
  if (req.rawBody && typeof req.rawBody === 'string') {
    return req.rawBody;
  }
  if (typeof req.body === 'string') {
    return req.body;
  }
  if (req.body && typeof req.body === 'object') {
    return JSON.stringify(req.body);
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', (err) => reject(err));
  });
}

/**
 * Paddle Webhook Handler (Vercel Serverless Function)
 * Route: /api/webhook/paddle
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const signature = req.headers['paddle-signature'] || req.headers['Paddle-Signature'] || '';
  const webhookSecret = (process.env.PADDLE_WEBHOOK_SECRET_KEY || process.env.PADDLE_WEBHOOK_KEY || '').trim();
  const apiKey = (process.env.PADDLE_API_KEY || process.env.PADDLE_SERVER_API_KEY || 'placeholder_api_key').trim();
  const environment = (process.env.PADDLE_ENV || 'production').toLowerCase().trim() === 'production'
    ? Environment.production
    : Environment.sandbox;

  if (!webhookSecret) {
    console.error('[Paddle Webhook Error] PADDLE_WEBHOOK_SECRET_KEY is missing in environment variables.');
    return res.status(500).json({ error: 'Server webhook secret configuration missing' });
  }

  let rawBody;
  try {
    rawBody = await getRawBody(req);
  } catch (readErr) {
    console.error('[Paddle Webhook Error] Failed to read request body stream:', readErr);
    return res.status(400).json({ error: 'Could not read request body' });
  }

  try {
    // 🔒 PADDLE-SIGNATURE VERIFICATION
    // Initializes Paddle Node SDK and cryptographically validates the payload using the secret key & signature
    const paddle = new Paddle(apiKey, { environment });
    const eventData = await paddle.webhooks.unmarshal(rawBody, webhookSecret, signature);

    console.log('[Paddle Webhook Verified] Event:', eventData.eventType);

    // Handle distinct subscription & transaction event types
    switch (eventData.eventType) {
      case 'transaction.completed':
      case 'transaction.paid': {
        const transaction = eventData.data;
        const customerEmail = transaction?.customer?.email || transaction?.customData?.email || transaction?.details?.customer?.email;
        const userId = transaction?.customData?.userId;
        const plan = transaction?.customData?.plan || 'Annual Pro Membership';

        console.log('[Paddle] Transaction Completed. Email:', customerEmail, 'Plan:', plan, 'UserId:', userId);

        await updateUserSubscription(userId, customerEmail, {
          isPro: true,
          subscriptionStatus: 'active',
          plan: plan,
          paddleTransactionId: transaction?.id || null,
          paddleCustomerId: transaction?.customerId || null
        });
        break;
      }

      case 'subscription.created':
      case 'subscription.activated': {
        const subscription = eventData.data;
        const userId = subscription?.customData?.userId;
        const customerEmail = subscription?.customData?.email || subscription?.customer?.email;

        console.log('[Paddle] Subscription Active. Customer:', subscription?.customerId, 'Status:', subscription?.status);

        await updateUserSubscription(userId, customerEmail, {
          isPro: true,
          subscriptionStatus: 'active',
          paddleSubscriptionId: subscription?.id || null,
          paddleCustomerId: subscription?.customerId || null
        });
        break;
      }

      case 'subscription.updated': {
        const subscription = eventData.data;
        const userId = subscription?.customData?.userId;
        const customerEmail = subscription?.customData?.email || subscription?.customer?.email;
        const status = subscription?.status;
        const isActive = status === 'active' || status === 'trialing';

        console.log('[Paddle] Subscription Updated. Status:', status);

        await updateUserSubscription(userId, customerEmail, {
          isPro: isActive,
          subscriptionStatus: status || 'updated',
          paddleSubscriptionId: subscription?.id || null
        });
        break;
      }

      case 'subscription.canceled': {
        const subscription = eventData.data;
        const userId = subscription?.customData?.userId;
        const customerEmail = subscription?.customData?.email || subscription?.customer?.email;

        console.log('[Paddle] Subscription Canceled. ID:', subscription?.id);

        await updateUserSubscription(userId, customerEmail, {
          isPro: false,
          subscriptionStatus: 'canceled',
          paddleSubscriptionId: subscription?.id || null
        });
        break;
      }

      case 'subscription.past_due': {
        const subscription = eventData.data;
        const userId = subscription?.customData?.userId;
        const customerEmail = subscription?.customData?.email || subscription?.customer?.email;

        console.warn('[Paddle] Subscription Past Due. ID:', subscription?.id);

        await updateUserSubscription(userId, customerEmail, {
          subscriptionStatus: 'past_due'
        });
        break;
      }

      default:
        console.log('[Paddle] Received unhandled event type:', eventData.eventType);
    }

    return res.status(200).json({
      success: true,
      eventType: eventData.eventType,
      receivedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ [Paddle Webhook] Invalid Paddle Signature or parsing failure:', error.message);
    return res.status(400).json({
      error: 'Invalid Paddle webhook signature',
      details: error.message
    });
  }
}
