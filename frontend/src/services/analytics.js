/**
 * Google Analytics (GA4) Consent Management & Tracking Service
 * HealthLexMed — KVKK & GDPR Compliant Analytics Handler
 */

export const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-F8RSPV39KQ';
export const COOKIE_CONSENT_KEY = 'hlx_cookie_consent'; // 'accepted' | 'declined'

/**
 * Returns the current cookie consent status ('accepted', 'declined', or null if not yet chosen).
 */
export const getCookieConsent = () => {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
};

/**
 * Initializes Google Analytics 4 only when user gives explicit consent.
 */
export const initGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;

  try {
    // Enable tracking if previously disabled
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

    // Dynamically insert gtag.js script if not already present
    if (!document.getElementById('ga-gtag-script')) {
      const script = document.createElement('script');
      script.id = 'ga-gtag-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      personalization_storage: 'denied'
    });
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true
    });

    window.__hlxGaInitialized = true;
  } catch (error) {
    console.error('[Analytics] Failed to initialize Google Analytics:', error);
  }
};

/**
 * Disables Google Analytics when user declines or revokes consent.
 */
export const disableGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;

  try {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        personalization_storage: 'denied'
      });
    }

    // Remove script tag if present
    const existingScript = document.getElementById('ga-gtag-script');
    if (existingScript) {
      existingScript.remove();
    }

    window.__hlxGaInitialized = false;
  } catch (error) {
    console.error('[Analytics] Failed to disable Google Analytics:', error);
  }
};

/**
 * Sets user cookie consent and triggers the appropriate analytics behavior.
 * @param {'accepted' | 'declined'} consent
 */
export const setCookieConsent = (consent) => {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, consent);
  } catch (e) {
    console.warn('[Analytics] Could not write cookie consent to localStorage', e);
  }

  if (consent === 'accepted') {
    initGoogleAnalytics();
  } else {
    disableGoogleAnalytics();
  }
};

/**
 * Checks consent on app start and boots GA only if consent was previously given.
 */
export const initAnalyticsOnLoad = () => {
  const consent = getCookieConsent();
  if (consent === 'accepted') {
    initGoogleAnalytics();
  } else {
    disableGoogleAnalytics();
  }
};
