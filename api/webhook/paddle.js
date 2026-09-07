import { Paddle, Environment } from '@paddle/paddle-node-sdk';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  if (req.rawBody) {
    return typeof req.rawBody === 'string' ? req.rawBody : req.rawBody.toString('utf8');
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  if (chunks.length > 0) {
    return Buffer.concat(chunks).toString('utf8');
  }

  if (typeof req.body === 'string') {
    return req.body;
  }
  if (req.body && typeof req.body === 'object') {
    return JSON.stringify(req.body);
  }

  return '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const signature = (req.headers['paddle-signature'] || '').trim();
  const webhookSecret = (process.env.PADDLE_WEBHOOK_SECRET_KEY || process.env.PADDLE_WEBHOOK_KEY || '').trim();
  const apiKey = (process.env.PADDLE_API_KEY || process.env.PADDLE_SERVER_API_KEY || 'placeholder_api_key').trim();
  const environment = (process.env.PADDLE_ENV || 'production').toLowerCase().trim() === 'production'
    ? Environment.production
    : Environment.sandbox;

  if (!webhookSecret) {
    console.error('[Paddle Error] Webhook secret key environment variable bulunamadı.');
    return res.status(500).json({ error: 'Webhook secret missing' });
  }

  let rawBodyString = '';
  try {
    rawBodyString = await getRawBody(req);
  } catch (err) {
    console.error('[Paddle Error] Body okunamadı:', err);
    return res.status(400).json({ error: 'Gövde okunamadı' });
  }

  // Teşhis logları
  console.log('[Paddle Debug] Signature Header:', signature ? 'Mevcut' : 'Eksik');
  console.log('[Paddle Debug] Secret Key Uzunluğu:', webhookSecret.length);
  console.log('[Paddle Debug] Raw Body Uzunluğu:', rawBodyString.length);

  try {
    const paddle = new Paddle(apiKey, { environment });
    const eventData = await paddle.webhooks.unmarshal(rawBodyString, webhookSecret, signature);

    console.log('[Paddle Webhook] Başarılı Event:', eventData.eventType);

    switch (eventData.eventType) {
      case 'transaction.completed':
      case 'transaction.paid':
        console.log('[Paddle] Ödeme tamamlandı:', eventData.data?.id);
        break;

      case 'subscription.canceled':
        console.log('[Paddle] Abonelik iptal edildi:', eventData.data?.id);
        break;

      default:
        console.log('[Paddle] İşlenen olay:', eventData.eventType);
    }

    return res.status(200).json({ success: true, eventType: eventData.eventType });
  } catch (error) {
    console.error('❌ [Paddle Verification Hatası]:', error.message);
    return res.status(400).json({
      error: 'Invalid Paddle webhook signature',
      details: error.message
    });
  }
}