import { initializePaddle } from '@paddle/paddle-js';
import { toast } from 'sonner';
import { auth } from '@/firebase/config';
import { getUser } from '@/utils/storage';

// Environment variable configurations (Safe client-side tokens & price ID only)
const PADDLE_TOKEN =
  process.env.REACT_APP_PADDLE_CLIENT_TOKEN ||
  process.env.PADDLE_CLIENT_TOKEN ||
  'live_66372dae24be5820f1b9b1ea264';

const PADDLE_ENV = (
  process.env.REACT_APP_PADDLE_ENV ||
  process.env.PADDLE_ENV ||
  'production'
).toLowerCase().trim();

// Single Plan: Annual Pro Membership (Yıllık Plan)
export const PADDLE_PRICE_ID =
  process.env.REACT_APP_PADDLE_PRICE_ID ||
  process.env.PADDLE_PRICE_ID ||
  process.env.REACT_APP_PADDLE_PRICE_PRO ||
  'pri_01m1hbkgmff67g3mght6w6bj2q';

// Backward compatibility alias
export const PADDLE_PRICE_PRO = PADDLE_PRICE_ID;
export const PADDLE_DEFAULT_PRICE_ID = PADDLE_PRICE_ID;

let paddleInstancePromise = null;

/**
 * Initializes and returns the singleton Paddle.js instance.
 */
export const getPaddle = async () => {
  if (paddleInstancePromise) {
    return paddleInstancePromise;
  }

  paddleInstancePromise = (async () => {
    try {
      if (!PADDLE_TOKEN) {
        console.warn('[Paddle] PADDLE_CLIENT_TOKEN is not defined in .env.');
      }

      const paddle = await initializePaddle({
        environment: (PADDLE_ENV === 'production' || PADDLE_TOKEN.startsWith('live_')) ? 'production' : 'sandbox',
        token: PADDLE_TOKEN,
        eventCallback: (event) => {
          if (process.env.NODE_ENV !== 'production') {
            console.log('[Paddle Event]', event?.name, event);
          }

          // Ödeme Başarılı Bildirimi ve /welcome sayfasına yönlendirme
          if (event?.name === 'checkout.completed') {
            console.log('[Paddle] Checkout completed successfully!', event.data);
            toast.success('Ödemeniz başarıyla tamamlandı! Hoş geldiniz 🎉', {
              duration: 5000
            });

            if (typeof window !== 'undefined') {
              setTimeout(() => {
                window.location.href = '/welcome';
              }, 600);
            }
          }

          // Ödeme Başarısız Bildirimi
          if (event?.name === 'checkout.payment.failed') {
            console.warn('[Paddle] Payment failed:', event.data);
            toast.error('Ödeme işlemi tamamlanamadı. Lütfen kart bilgilerinizi kontrol edip tekrar deneyin.', {
              duration: 6000
            });
          }

          // Genel Hata Bildirimi
          if (event?.name === 'checkout.error') {
            console.error('[Paddle] Checkout error:', event.data);
            toast.error('Ödeme sırasında bir hata oluştu. Lütfen tekrar deneyiniz.');
          }

          // Pencere Kapatıldığında
          if (event?.name === 'checkout.closed') {
            console.log('[Paddle] Checkout overlay closed.');
          }
        }
      });

      if (paddle) {
        if (typeof window !== 'undefined') {
          window.Paddle = paddle;
        }
      } else {
        console.error('[Paddle] Failed to initialize Paddle instance.');
      }

      return paddle;
    } catch (error) {
      console.error('[Paddle] Initialization error:', error);
      paddleInstancePromise = null;
      return null;
    }
  })();

  return paddleInstancePromise;
};

/**
 * Fetches localized price preview for the single Annual Pro Membership
 * using Paddle.PricePreview without any frontend rounding or math.
 * 
 * @param {string} [priceId=PADDLE_PRICE_ID]
 * @returns {Promise<{ formattedTotal: string, currencyCode: string, productName: string } | null>}
 */
export const getAnnualPricePreview = async (priceId = PADDLE_PRICE_ID) => {
  try {
    const paddle = await getPaddle();
    if (!paddle || typeof paddle.PricePreview !== 'function') {
      return null;
    }

    const response = await paddle.PricePreview({
      items: [
        {
          priceId,
          quantity: 1
        }
      ]
    });

    const lineItem = response?.data?.details?.lineItems?.[0];
    if (!lineItem) {
      return null;
    }

    // Direct formatted totals from Paddle (NO frontend rounding/math)
    const formattedTotal = lineItem.formattedTotals?.total || lineItem.formattedTotals?.subtotal || '';

    return {
      priceId,
      formattedTotal,
      currencyCode: lineItem.price?.unitPrice?.currencyCode || response?.data?.currencyCode || '',
      rawTotal: lineItem.totals?.total,
      productName: lineItem.product?.name || 'Annual Pro Membership'
    };
  } catch (error) {
    console.warn('[Paddle] Error fetching annual price preview:', error);
    return null;
  }
};

/**
 * Multi-item Price Preview helper for backward compatibility
 */
export const getPricePreviews = async (priceIds = [PADDLE_PRICE_ID]) => {
  const validIds = priceIds.filter((id) => Boolean(id && typeof id === 'string'));
  if (validIds.length === 0) return {};

  try {
    const paddle = await getPaddle();
    if (!paddle || typeof paddle.PricePreview !== 'function') {
      return {};
    }

    const response = await paddle.PricePreview({
      items: validIds.map((priceId) => ({
        priceId,
        quantity: 1
      }))
    });

    const priceMap = {};
    const lineItems = response?.data?.details?.lineItems || [];

    lineItems.forEach((item) => {
      const pId = item?.price?.id;
      if (pId) {
        priceMap[pId] = {
          priceId: pId,
          formattedTotal: item.formattedTotals?.total || item.formattedTotals?.subtotal || '',
          currencyCode: item.price?.unitPrice?.currencyCode || response?.data?.currencyCode || '',
          rawTotal: item.totals?.total,
          productName: item.product?.name
        };
      }
    });

    return priceMap;
  } catch (error) {
    console.warn('[Paddle] Error fetching price previews:', error);
    return {};
  }
};

/**
 * Opens the Paddle Checkout overlay for the single Annual Pro Membership.
 * - Overlay display mode (settings.displayMode: 'overlay')
 * - One-page variant (settings.variant: 'one-page')
 * - Prefills current signed-in Firebase user email
 * - Redirects to /welcome on success
 * 
 * @param {Object} [options]
 * @param {string} [options.priceId]
 * @param {string} [options.customerEmail]
 * @param {Object} [options.customData]
 * @param {string} [options.successUrl]
 * @param {string} [options.theme]
 */
export const openPaddleCheckout = async ({
  priceId = PADDLE_PRICE_ID,
  customerEmail,
  customData = {},
  successUrl,
  theme = 'light'
} = {}) => {
  try {
    const paddle = await getPaddle();
    if (!paddle) {
      toast.error('Ödeme sistemi başlatılamadı. Lütfen internet bağlantınızı kontrol edin.');
      return;
    }

    const activePriceId = priceId || PADDLE_PRICE_ID;
    const currentLang = typeof window !== 'undefined' && localStorage.getItem('healthlex_lang') === 'en' ? 'en' : 'tr';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const resolvedSuccessUrl = successUrl || (origin ? `${origin}/welcome` : '/welcome');

    const checkoutSettings = {
      displayMode: 'overlay',   // Overlay modal checkout
      variant: 'one-page',       // One-page checkout experience
      theme: theme || 'light',
      locale: currentLang,
      successUrl: resolvedSuccessUrl
    };

    const checkoutOptions = {
      items: [{ priceId: activePriceId, quantity: 1 }],
      settings: checkoutSettings,
      customData
    };

    // Firebase Auth'taki aktif kullanıcının e-postasını otomatik aktar (Prefill)
    const activeUser = auth.currentUser || getUser();
    const resolvedEmail = customerEmail || activeUser?.email;

    if (resolvedEmail && typeof resolvedEmail === 'string' && resolvedEmail.includes('@')) {
      checkoutOptions.customer = {
        email: resolvedEmail.trim()
      };
    }

    paddle.Checkout.open(checkoutOptions);
  } catch (error) {
    console.error('[Paddle] Error opening checkout:', error);
    toast.error('Ödeme penceresi açılırken bir hata oluştu.');
  }
};

export default {
  getPaddle,
  getAnnualPricePreview,
  getPricePreviews,
  openPaddleCheckout,
  PADDLE_PRICE_ID
};
