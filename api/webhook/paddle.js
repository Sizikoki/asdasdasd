import { Paddle, Environment } from '@paddle/paddle-node-sdk';

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
  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET_KEY || process.env.PADDLE_WEBHOOK_KEY;
  const apiKey = process.env.PADDLE_API_KEY || process.env.PADDLE_SERVER_API_KEY || 'placeholder_api_key';
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
        break;
      }

      case 'subscription.created':
      case 'subscription.activated': {
        const subscription = eventData.data;
        console.log('[Paddle] Subscription Active. Customer:', subscription?.customerId, 'Status:', subscription?.status);
        break;
      }

      case 'subscription.updated': {
        const subscription = eventData.data;
        console.log('[Paddle] Subscription Updated. Status:', subscription?.status);
        break;
      }

      case 'subscription.canceled': {
        const subscription = eventData.data;
        console.log('[Paddle] Subscription Canceled. ID:', subscription?.id);
        break;
      }

      case 'subscription.past_due': {
        const subscription = eventData.data;
        console.warn('[Paddle] Subscription Past Due. ID:', subscription?.id);
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
