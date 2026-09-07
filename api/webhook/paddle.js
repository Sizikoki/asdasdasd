import { Paddle, Environment } from '@paddle/paddle-node-sdk';

// Raw stream okuyucu (Vercel Serverless Function için)
async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const signature = req.headers['paddle-signature'] || '';
  const webhookSecret = (process.env.PADDLE_WEBHOOK_SECRET_KEY || process.env.PADDLE_WEBHOOK_KEY || '').trim();
  const apiKey = (process.env.PADDLE_API_KEY || process.env.PADDLE_SERVER_API_KEY || 'placeholder_api_key').trim();
  const environment = (process.env.PADDLE_ENV || 'production').toLowerCase().trim() === 'production'
    ? Environment.production
    : Environment.sandbox;

  if (!webhookSecret) {
    console.error('[Paddle Webhook Error] PADDLE_WEBHOOK_SECRET_KEY is missing.');
    return res.status(500).json({ error: 'Server webhook secret configuration missing' });
  }

  let rawBodyString = '';
  try {
    const buf = await buffer(req);
    rawBodyString = buf.toString('utf8');
  } catch (readErr) {
    console.error('[Paddle Webhook Error] Failed to read raw body:', readErr);
    return res.status(400).json({ error: 'Could not read request body' });
  }

  try {
    const paddle = new Paddle(apiKey, { environment });
    // Ham string üzerinden doğrulama
    const eventData = await paddle.webhooks.unmarshal(rawBodyString, webhookSecret, signature);

    console.log('[Paddle Webhook Verified] Event:', eventData.eventType);

    switch (eventData.eventType) {
      case 'transaction.completed':
      case 'transaction.paid': {
        const transaction = eventData.data;
        const customerEmail = transaction?.customer?.email || transaction?.customData?.email || transaction?.details?.customer?.email;
        console.log('[Paddle] Transaction Completed. Email:', customerEmail);
        // Burada Firestore'da user.isPro = true yapılmalı
        break;
      }

      case 'subscription.canceled': {
        const subscription = eventData.data;
        const customerId = subscription?.customerId;
        console.log('[Paddle] Subscription Canceled. CustomerId:', customerId, 'SubID:', subscription?.id);
        // BURAYA DİKKAT: İptal anında Firestore'daki kullanıcıyı bulup isPro = false yapılmalı
        break;
      }

      default:
        console.log('[Paddle] Unhandled event:', eventData.eventType);
    }

    return res.status(200).json({
      success: true,
      eventType: eventData.eventType
    });
  } catch (error) {
    console.error('❌ [Paddle Webhook] Signature failure:', error.message);
    return res.status(400).json({
      error: 'Invalid Paddle webhook signature',
      details: error.message
    });
  }
}