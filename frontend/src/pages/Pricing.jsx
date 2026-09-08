import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getUser, getUserTrialState, formatTurkishName } from '@/utils/storage';
import { auth } from '@/firebase/config';
import { openPaddleCheckout, PADDLE_PRICE_ID, IS_PAYMENT_ACTIVE } from '@/services/paddle';
import { toast } from 'sonner';

const TRANSLATIONS = {
  tr: {
    nav1: 'Panelim',
    nav2: 'Çalışma / Sözlük',
    nav3: 'Morfemler',
    nav4: 'Oyunlar',
    nav6: 'Tarifeler',
    trial: 'Deneme',
    trialUpper: '3 GÜNLÜK DENEME',
    daysLeft: 'gün kaldı',
    currentPlan: 'MEVCUT PLAN',
    title: 'Sana uygun tarifeyi seç',
    sub: 'Ücretsiz 3 gün boyunca dene. Sana uygun tarifeyi seç.',
    titleVisitor: 'Terimleri parçala, anla, birleştir.',
    subVisitor: '3 gün ücretsiz dene, kart bilgisi gerekmez. Sonra sana uygun tarifeyle devam et.',
    noCardNote: 'Kart bilgisi gerekmez.',
    startTrial: '3 gün ücretsiz dene',
    save: '2 ay bedava',
    tabNames: ['Ücretsiz', 'Temel', 'Pro', 'Ömür'],
    monthly: 'Aylık',
    yearly: 'Yıllık',
    compare: 'ÖZELLİKLER',
    pFree: 'ÜCRETSİZ',
    pBasic: 'TEMEL',
    pPro: 'PRO',
    pLife: 'ÖMÜR BOYU',
    cancel: 'Tek tıkla iptal, soru sorulmaz',
    vat: 'Fiyatlara KDV dahil',
    secure: '256-bit güvenli ödeme',
    perMo: '/ ay',
    perYr: '/ yıl',
    perOnce: 'tek ödeme',
    free: '₺0',
    plans: [
      {
        name: 'Ücretsiz Deneme',
        tag: '3 gün boyunca tüm özellikler açık.',
        note: '3 günün sonunda otomatik biter',
        cta: 'Denemeye başla',
        ctaCurrent: 'Mevcut Plan',
        feats: [
          ['✓', '10 kategori · 571+ morfem'],
          ['✓', '4 oyun modunun tamamı açık'],
          ['✓', 'İlerleme ve seviye sistemi'],
          ['✓', 'Öğrendiğin terimlerle tekrar'],
          ['✓', '3 gün sınırsız tam erişim']
        ]
      },
      {
        name: 'Temel',
        tag: 'Kütüphanenin tamamı, 2 oyun modu.',
        mo: '₺99',
        yrp: '₺790',
        noteMo: 'Aylık faturalandırılır',
        noteYr: 'Yıllık faturalandırılır · ₺66/ay',
        cta: 'Temel’i seç',
        feats: [
          ['✓', '10 kategori · 571+ morfem'],
          ['✓', 'Flashcard ve Eşleştirme'],
          ['✓', 'Temel ilerleme takibi'],
          ['–', 'Quiz ve Morfem Yapıcı'],
          ['–', 'Seviye sistemi ve tekrar']
        ]
      },
      {
        name: 'Pro',
        tag: 'Tam öğrenme deneyimi; 4 mod, seviye, tekrar.',
        badge: 'SINIRLI SÜRE · %55',
        mo: null,
        yrp: '₺2.000',
        old: '₺4.500',
        noteYr: 'Yıllık faturalandırılır · ₺167/ay',
        noteMo: 'Sadece yıllık · ₺167/ay',
        cta: "Pro'ya geç",
        feats: [
          ['✓', '10 kategori · 571+ morfem'],
          ['✓', '4 oyun modu'],
          ['✓', 'İlerleme ve seviye sistemi'],
          ['✓', 'Öğrendiğin terimlerle tekrar'],
          ['✓', 'Gelecek modüller dahil']
        ]
      },
      {
        name: 'Ömür Boyu',
        tag: 'Bir kez öde süresiz kullan.',
        badge: 'SINIRLI SÜRE · %25',
        old: '₺8.000',
        once: '₺5.990',
        note: 'Tek ödeme · Süresiz erişim',
        cta: 'Ömür boyu al',
        feats: [
          ['✓', '10 kategori · 571+ morfem'],
          ['✓', '4 oyun modu'],
          ['✓', 'İlerleme ve seviye sistemi'],
          ['✓', 'Öğrendiğin terimlerle tekrar'],
          ['✓', 'Gelecek modüller dahil']
        ]
      }
    ],
    rows: [
      ['Çalışma / Sözlük terimleri', '571+', '571+', '571+', '571+'],
      ['Morfem kütüphanesi', 'Tümü', 'Tümü', 'Tümü', 'Tümü'],
      ['Flashcard · Eşleştirme', '✓', '✓', '✓', '✓'],
      ['Quiz · Morfem Yapıcı', '✓ (3 gün)', '–', '✓', '✓'],
      ['İlerleme ve seviye sistemi', '✓ (3 gün)', 'Temel', '✓', '✓'],
      ['Öğrenilen terimlerle tekrar', '✓ (3 gün)', '–', '✓', '✓'],
      ['Gelecek modüller', '–', '–', '✓', '✓'],
      ['Süre', '3 gün', 'Ay / Yıl', 'Yıl', 'Süresiz']
    ]
  },
  en: {
    nav1: 'Dashboard',
    nav2: 'Study / Glossary',
    nav3: 'Morphemes',
    nav4: 'Games',
    nav6: 'Pricing',
    trial: 'Trial',
    trialUpper: '3-DAY TRIAL',
    daysLeft: 'days left',
    currentPlan: 'CURRENT PLAN',
    title: 'Pick the plan that fits',
    sub: 'Try free for 3 days. Choose the plan that fits you.',
    titleVisitor: 'Split, understand, rebuild terms.',
    subVisitor: 'Try 3 days free, no card required. Then continue with the plan that fits you.',
    noCardNote: 'No card required.',
    startTrial: 'Try 3 days free',
    save: '2 months free',
    tabNames: ['Free', 'Basic', 'Pro', 'Lifetime'],
    monthly: 'Monthly',
    yearly: 'Yearly',
    compare: 'FEATURES',
    pFree: 'FREE',
    pBasic: 'BASIC',
    pPro: 'PRO',
    pLife: 'LIFETIME',
    cancel: 'Cancel in one click, no questions',
    vat: 'VAT included',
    secure: '256-bit secure payment',
    perMo: '/ mo',
    perYr: '/ yr',
    perOnce: 'one-time',
    free: '₺0',
    plans: [
      {
        name: 'Free Trial',
        tag: 'Full access for 3 days, no card required.',
        note: 'Ends automatically after 3 days',
        cta: 'Start trial',
        ctaCurrent: 'Current Plan',
        feats: [
          ['✓', '10 categories · 571+ morphemes'],
          ['✓', 'All 4 game modes unlocked'],
          ['✓', 'Progress and level system'],
          ['✓', 'Review with learned terms'],
          ['✓', 'Unlimited access for 3 days']
        ]
      },
      {
        name: 'Basic',
        tag: 'The full library, 2 game modes.',
        mo: '₺99',
        yrp: '₺790',
        noteMo: 'Billed monthly',
        noteYr: 'Billed yearly · ₺66/mo',
        cta: 'Choose Basic',
        feats: [
          ['✓', '10 categories · 571+ morphemes'],
          ['✓', 'Flashcard and Matching'],
          ['✓', 'Basic progress tracking'],
          ['–', 'Quiz and Morpheme Builder'],
          ['–', 'Level system and review']
        ]
      },
      {
        name: 'Pro',
        tag: 'The full experience; 4 modes, levels, review.',
        badge: 'LIMITED TIME · 55% OFF',
        mo: null,
        yrp: '₺2,000',
        old: '₺4,500',
        noteYr: 'Billed yearly · ₺167/mo',
        noteMo: 'Yearly only · ₺167/mo',
        cta: 'Go Pro',
        feats: [
          ['✓', '10 categories · 571+ morphemes'],
          ['✓', '4 game modes'],
          ['✓', 'Progress and level system'],
          ['✓', 'Review with learned terms'],
          ['✓', 'Future modules included']
        ]
      },
      {
        name: 'Lifetime',
        tag: 'Pay once, use forever.',
        badge: 'LIMITED TIME · 25% OFF',
        old: '₺8,000',
        once: '₺5,990',
        note: 'One payment · Lifetime access',
        cta: 'Get Lifetime',
        feats: [
          ['✓', '10 categories · 571+ morphemes'],
          ['✓', '4 game modes'],
          ['✓', 'Progress and level system'],
          ['✓', 'Review with learned terms'],
          ['✓', 'Future modules included']
        ]
      }
    ],
    rows: [
      ['Study / Glossary terms', '571+', '571+', '571+', '571+'],
      ['Morpheme library', 'All', 'All', 'All', 'All'],
      ['Flashcard · Matching', '✓', '✓', '✓', '✓'],
      ['Quiz · Morpheme Builder', '✓ (3 days)', '–', '✓', '✓'],
      ['Progress and level system', '✓ (3 days)', 'Basic', '✓', '✓'],
      ['Review with learned terms', '✓ (3 days)', '–', '✓', '✓'],
      ['Future modules', '–', '–', '✓', '✓'],
      ['Duration', '3 days', 'Mo / Yr', 'Year', 'Forever']
    ]
  }
};

export const PricingView = () => {
  const navigate = useNavigate();
  const { currentLanguage, setLanguage } = useLanguage();
  const [period, setPeriod] = useState('yearly');
  const [mobileTab, setMobileTab] = useState(2); // 0: Ücretsiz, 1: Temel, 2: Pro, 3: Ömür
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const isTr = currentLanguage === 'tr';
  const yr = period === 'yearly';
  const t = TRANSLATIONS[isTr ? 'tr' : 'en'];

  const currentUser = auth?.currentUser || getUser();
  const trialState = getUserTrialState(currentUser);
  const trialDaysLeft = trialState.daysLeft;

  const selPlan = t.plans[mobileTab];
  const isMobFree = mobileTab === 0;
  const isMobBasic = mobileTab === 1;
  const isMobPro = mobileTab === 2;
  const isMobLife = mobileTab === 3;

  let mobPrice = selPlan.mo;
  let mobPer = t.perMo;
  let mobNote = selPlan.noteMo;

  if (isMobFree) {
    mobPrice = t.free;
    mobPer = '';
    mobNote = selPlan.note;
  } else if (isMobLife) {
    mobPrice = selPlan.once;
    mobPer = t.perOnce;
    mobNote = selPlan.note;
  } else if (isMobPro) {
    mobPrice = selPlan.yrp;
    mobPer = t.perYr;
    mobNote = yr ? selPlan.noteYr : selPlan.noteMo;
  } else if (isMobBasic) {
    mobPrice = yr ? selPlan.yrp : selPlan.mo;
    mobPer = yr ? t.perYr : t.perMo;
    mobNote = yr ? selPlan.noteYr : selPlan.noteMo;
  }

  const handlePlanClick = async (planIndex) => {
    if (planIndex === 0) {
      // Ücretsiz Deneme / Devam Ediyor
      navigate('/dashboard');
      return;
    }

    // Ücretli Planlar (Pro, Temel, Ömür Boyu)
    if (!IS_PAYMENT_ACTIVE) {
      toast.info(isTr ? 'Ödeme sistemi yakında aktif olacak.' : 'Payment system coming soon.');
      return;
    }

    setCheckoutLoading(true);
    try {
      await openPaddleCheckout({
        priceId: PADDLE_PRICE_ID,
        customerEmail: currentUser?.email || undefined,
        customData: {
          plan: planIndex === 2 ? 'Annual Pro Membership' : planIndex === 1 ? 'Basic Plan' : 'Lifetime Membership',
          userId: currentUser?.uid || 'guest'
        }
      });
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased transition-colors">
      {/* ==================================================================== */}
      {/* 1) MOBİL GÖRÜNÜM (lg:hidden): FABLE SEÇENEK TABLI & TEK KART TASARIMI */}
      {/* ==================================================================== */}
      <div className="w-full flex lg:hidden flex-col gap-4 max-w-md mx-auto px-4 py-6 pb-28">
        {/* Mobil Üst Başlık Kartı (Dark Banner) */}
        <div className="bg-[#0f1b33] dark:bg-slate-900 text-white rounded-2xl p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div
              onClick={() => navigate('/')}
              className="font-extrabold text-base tracking-tight font-sans cursor-pointer"
            >
              Health<span className="font-serif italic font-bold text-[#8fb3ff]">Lex</span>Med
            </div>
            <div className="flex items-center gap-2">
              {/* TR / EN Dil Seçici */}
              <div
                onClick={() => setLanguage(isTr ? 'en' : 'tr')}
                className="flex bg-white/10 rounded-lg p-0.5 text-[11px] font-extrabold cursor-pointer select-none"
                role="button"
                tabIndex={0}
              >
                <span className={`px-2 py-1 rounded-md transition-all ${isTr ? 'bg-primary text-white' : 'text-slate-300'}`}>
                  TR
                </span>
                <span className={`px-2 py-1 rounded-md transition-all ${!isTr ? 'bg-primary text-white' : 'text-slate-300'}`}>
                  EN
                </span>
              </div>
              {currentUser ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-xs font-bold text-white/90 hover:text-white underline cursor-pointer"
                >
                  {isTr ? 'Panelim' : 'Dashboard'}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="text-xs font-bold text-white/90 hover:text-white underline cursor-pointer"
                >
                  {isTr ? 'Giriş yap' : 'Log in'}
                </button>
              )}
            </div>
          </div>

          <div>
            <h1 className="m-0 font-serif font-semibold text-2xl leading-snug text-white">
              {t.titleVisitor}
            </h1>
            <p className="m-0 text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
              {t.subVisitor}
            </p>
          </div>
        </div>

        {/* 4 Segmentli Plan Tab Seçici ([Ücretsiz] [Temel] [Pro] [Ömür]) */}
        <div className="flex bg-card border border-border rounded-xl p-1 font-bold text-xs shadow-xs select-none">
          {t.tabNames.map((name, idx) => {
            const isSelected = mobileTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setMobileTab(idx)}
                className={`flex-1 py-2.5 rounded-lg text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0f1b33] dark:bg-primary text-white shadow-xs font-extrabold'
                    : 'text-muted-foreground hover:text-foreground font-semibold'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Seçili Plan Kartı */}
        <div
          className={`bg-card border rounded-2xl p-5 sm:p-6 flex flex-col gap-4 relative shadow-sm transition-all ${
            isMobPro ? 'border-primary ring-2 ring-primary/20' : 'border-border'
          }`}
        >
          {/* Rozet */}
          {selPlan.badge && (
            <span
              className={`absolute -top-3 left-5 text-white font-extrabold text-[10px] tracking-wider py-1 px-3 rounded-md shadow-xs ${
                isMobLife ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-orange-500'
              }`}
            >
              {selPlan.badge}
            </span>
          )}
          {isMobFree && (
            <span className="absolute -top-3 left-5 bg-slate-900 dark:bg-slate-700 text-white font-extrabold text-[10px] tracking-wider py-1 px-3 rounded-md shadow-xs">
              {t.currentPlan}
            </span>
          )}

          <div>
            <div className="font-extrabold text-lg sm:text-xl text-foreground">{selPlan.name}</div>
            <div className="font-normal text-xs sm:text-sm leading-snug text-muted-foreground mt-1">
              {selPlan.tag}
            </div>
          </div>

          {/* Fiyat Alanı */}
          <div className="flex flex-col gap-1">
            {selPlan.old && (
              <span className="font-semibold text-xs text-muted-foreground/60 line-through">
                {selPlan.old}
              </span>
            )}
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
                {mobPrice}
              </span>
              {mobPer && <span className="font-semibold text-xs sm:text-sm text-muted-foreground">{mobPer}</span>}
            </div>
            <span className="text-xs text-muted-foreground">{mobNote}</span>
          </div>

          {/* Aylık / Yıllık Toggle (Temel veya Pro için) */}
          {(isMobBasic || isMobPro) && (
            <div
              onClick={() => setPeriod(yr ? 'monthly' : 'yearly')}
              className="flex bg-muted/60 border border-border rounded-xl p-1 font-bold text-xs cursor-pointer select-none"
            >
              <span
                className={`flex-1 py-2 text-center rounded-lg transition-all ${
                  !yr ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground'
                }`}
              >
                {t.monthly}
              </span>
              <span
                className={`flex-1 py-2 text-center rounded-lg transition-all ${
                  yr ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground'
                }`}
              >
                {t.yearly} · {t.save}
              </span>
            </div>
          )}

          {/* Özellik Listesi */}
          <div className="flex flex-col gap-2.5 border-t border-border/80 pt-4">
            {selPlan.feats.map((f, fIdx) => {
              const isChecked = f[0] === '✓';
              return (
                <div
                  key={fIdx}
                  className={`flex gap-2.5 items-start text-xs sm:text-sm leading-snug font-medium ${
                    isChecked ? 'text-foreground' : 'text-muted-foreground/60'
                  }`}
                >
                  <span
                    className={`font-extrabold flex-none ${
                      isChecked ? 'text-primary' : 'text-muted-foreground/40'
                    }`}
                  >
                    {f[0]}
                  </span>
                  <span>{f[1]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Güven Rozeti */}
        <div className="text-center font-semibold text-xs text-muted-foreground py-1">
          ✓ {t.cancel} · ✓ {t.vat} · 🔒 {t.secure}
        </div>

        {/* Mobil Alt Yapışkan CTA Alanı */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3 sm:p-4 shadow-lg lg:hidden flex flex-col gap-2">
          <button
            onClick={() => handlePlanClick(mobileTab)}
            disabled={checkoutLoading || isMobFree}
            className={`w-full text-center font-bold text-sm sm:text-base py-3 px-4 rounded-xl transition-all cursor-pointer shadow-sm ${
              isMobFree
                ? 'bg-muted text-muted-foreground border border-border cursor-default'
                : isMobPro
                ? 'bg-gradient-to-r from-[#2b7fff] to-[#5aa9ff] hover:from-[#2563eb] hover:to-[#3b82f6] text-white shadow-md'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            {isMobFree ? selPlan.ctaCurrent : `${selPlan.cta} →`}
          </button>
          <div className="text-xs text-muted-foreground text-center">
            {t.noCardNote}{' '}
            <button
              onClick={() => navigate('/terms')}
              className="font-bold text-primary hover:underline cursor-pointer"
            >
              {t.startTrial}
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2) MASAÜSTÜ GÖRÜNÜM (hidden lg:flex): 4'LÜ GENİŞ KART IZGARASI & TABLO */}
      {/* ==================================================================== */}
      <div className="hidden lg:flex w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-col gap-12 items-center">
        
        {/* Başlık ve Aylık / Yıllık Seçici */}
        <div className="text-center flex flex-col gap-3.5 items-center max-w-4xl w-full">
          <h1 className="m-0 font-serif font-semibold text-3xl sm:text-4xl lg:text-[44px] leading-tight text-foreground">
            {t.title}
          </h1>
          <p className="m-0 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
            {t.sub}
          </p>

          {/* Aylık / Yıllık Toggle Butonu */}
          <div
            onClick={() => setPeriod(yr ? 'monthly' : 'yearly')}
            className="flex bg-card border border-border rounded-xl p-1.5 font-extrabold text-sm cursor-pointer mt-3 shadow-xs select-none"
            role="button"
            tabIndex={0}
          >
            <span
              className={`py-2 px-5 rounded-lg transition-all ${
                !yr ? 'bg-primary text-primary-foreground shadow-xs font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.monthly}
            </span>
            <span
              className={`py-2 px-5 rounded-lg transition-all flex items-center gap-2 ${
                yr ? 'bg-primary text-primary-foreground shadow-xs font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.yearly}
              <span className="text-[11px] font-extrabold bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-xs">
                %55
              </span>
            </span>
          </div>
        </div>

        {/* 4 Plan Kartı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 w-full items-stretch">
          {t.plans.map((p, idx) => {
            const isFree = idx === 0;
            const isBasic = idx === 1;
            const isPro = idx === 2;
            const isLife = idx === 3;

            let price = p.mo;
            let per = t.perMo;
            let note = p.noteMo;

            if (isFree) {
              price = t.free;
              per = '';
              note = p.note;
            } else if (isLife) {
              price = p.once;
              per = t.perOnce;
              note = p.note;
            } else if (isPro) {
              price = p.yrp;
              per = t.perYr;
              note = yr ? p.noteYr : p.noteMo;
            } else if (isBasic) {
              price = yr ? p.yrp : p.mo;
              per = yr ? t.perYr : t.perMo;
              note = yr ? p.noteYr : p.noteMo;
            }

            return (
              <div
                key={idx}
                className={`bg-card border rounded-2xl p-6 xl:p-8 2xl:p-9 flex flex-col gap-5 relative shadow-sm transition-all duration-200 ${
                  isPro
                    ? 'border-primary ring-2 ring-primary/20 shadow-md lg:-translate-y-1'
                    : 'border-border hover:border-border/80'
                }`}
              >
                {/* Rozetler */}
                {p.badge && (
                  <span className={`absolute -top-3 left-6 text-white font-extrabold text-[11px] tracking-wide py-1 px-3.5 rounded-full shadow-xs ${
                    isLife ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-amber-500'
                  }`}>
                    {p.badge}
                  </span>
                )}
                {isFree && (
                  <span className="absolute -top-3 left-6 bg-slate-900 dark:bg-slate-700 text-white font-extrabold text-[11px] tracking-wide py-1 px-3.5 rounded-full shadow-xs">
                    {t.currentPlan}
                  </span>
                )}

                <div>
                  <div className="font-extrabold text-[17px] xl:text-[19px] text-foreground">{p.name}</div>
                  <div className="font-normal text-[13.5px] xl:text-[14.5px] leading-snug text-muted-foreground mt-1 min-h-[40px]">
                    {p.tag}
                  </div>
                </div>

                {/* Fiyat Alanı */}
                <div className="flex flex-col gap-1">
                  {p.old && (
                    <span className="font-semibold text-sm xl:text-base text-muted-foreground/60 line-through">
                      {p.old}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-extrabold text-3xl sm:text-4xl xl:text-[42px] text-foreground tracking-tight">
                      {price}
                    </span>
                    {per && <span className="font-semibold text-sm xl:text-base text-muted-foreground">{per}</span>}
                  </div>
                  <span className="text-xs xl:text-sm text-muted-foreground">{note}</span>
                </div>

                {/* Buton */}
                <button
                  onClick={() => handlePlanClick(idx)}
                  disabled={checkoutLoading || isFree}
                  className={`w-full text-center font-bold text-[14px] xl:text-[15px] py-3.5 px-4 rounded-xl transition-all cursor-pointer shadow-xs ${
                    isFree
                      ? 'bg-muted text-muted-foreground border border-border cursor-default'
                      : isPro
                      ? 'bg-gradient-to-r from-[#2b7fff] to-[#5aa9ff] hover:from-[#2563eb] hover:to-[#3b82f6] text-white shadow-md hover:shadow-lg'
                      : 'bg-primary text-primary-foreground hover:opacity-90'
                  }`}
                >
                  {isFree ? p.ctaCurrent : p.cta}
                </button>

                {/* Özellik Maddeleri */}
                <div className="flex flex-col gap-3 border-t border-border/80 pt-5 mt-auto">
                  {p.feats.map((f, fIdx) => {
                    const isChecked = f[0] === '✓';
                    return (
                      <div
                        key={fIdx}
                        className={`flex gap-3 items-start text-[13.5px] xl:text-[14.5px] leading-snug font-medium ${
                          isChecked ? 'text-foreground' : 'text-muted-foreground/60'
                        }`}
                      >
                        <span
                          className={`font-extrabold flex-none ${
                            isChecked ? 'text-primary' : 'text-muted-foreground/40'
                          }`}
                        >
                          {f[0]}
                        </span>
                        <span>{f[1]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Karşılaştırma Tablosu */}
        <div className="w-full bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
          <div className="grid grid-cols-5 p-4 sm:p-5 xl:p-6 2xl:p-7 border-b border-border font-extrabold text-xs sm:text-sm tracking-wider text-muted-foreground uppercase bg-muted/30">
            <span className="col-span-1">{t.compare}</span>
            <span className="text-center">{t.pFree}</span>
            <span className="text-center">{t.pBasic}</span>
            <span className="text-center text-primary font-black">{t.pPro}</span>
            <span className="text-center">{t.pLife}</span>
          </div>

          <div className="divide-y divide-border/60">
            {t.rows.map((r, rIdx) => (
              <div
                key={rIdx}
                className="grid grid-cols-5 p-4 sm:p-5 xl:p-6 text-[14px] sm:text-[15px] xl:text-[16px] font-semibold text-foreground items-center hover:bg-muted/20 transition-colors"
              >
                <span className="col-span-1 text-muted-foreground font-medium">{r[0]}</span>
                <span className="text-center text-muted-foreground">{r[1]}</span>
                <span className="text-center text-muted-foreground">{r[2]}</span>
                <span className="text-center text-primary font-bold">{r[3]}</span>
                <span className="text-center text-foreground font-bold">{r[4]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Güven Rozetleri */}
        <div className="flex flex-wrap gap-8 sm:gap-12 xl:gap-16 items-center justify-center font-semibold text-sm sm:text-base text-muted-foreground py-2">
          <span className="flex items-center gap-2">
            <span className="text-emerald-500 font-bold">✓</span> {t.cancel}
          </span>
          <span className="flex items-center gap-2">
            <span className="text-emerald-500 font-bold">✓</span> {t.vat}
          </span>
          <span className="flex items-center gap-2.5">
            <span>🔒 {t.secure}</span>
            <span className="border border-border bg-card rounded px-2 py-0.5 font-bold text-xs text-foreground">
              VISA
            </span>
            <span className="border border-border bg-card rounded px-2 py-0.5 font-bold text-xs text-foreground">
              MC
            </span>
            <span className="border border-border bg-card rounded px-2 py-0.5 font-bold text-xs text-foreground">
              TROY
            </span>
          </span>
        </div>

      </div>
    </div>
  );
};

export const Pricing = PricingView;
export default PricingView;
