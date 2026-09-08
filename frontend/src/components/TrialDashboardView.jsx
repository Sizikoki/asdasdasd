import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useLanguage } from '@/context/LanguageContext';
import { getUser, getStats, getUserTrialState, formatTurkishName } from '@/utils/storage';
import { PricingView } from '@/pages/Pricing';

const TRANSLATIONS = {
  tr: {
    trial: 'Deneme',
    trialUpper: '3 GÜNLÜK DENEME',
    lastDay: 'Son gün',
    lastDayUpper: 'SON GÜN',
    trialEnded: 'Deneme bitti',
    day: 'Gün',
    daysLeft: 'gün kaldı',
    hello: 'Merhaba',
    endsOn: '9 Eyl 23:59’da biter',
    endsTonight: 'Bu gece 23:59’da biter',
    day1Sub: '3 günlük denemen başladı. Tüm kategoriler, 571 morfem ve 4 oyun modunun tamamı açık. Önce ilk terimini 20 saniyede çöz.',
    day3Sub: 'Denemenin son günü. Bugün 12 terim daha bitirebilirsin; ilerlemen saklanır.',
    solveFirst: 'İlk terimini çöz',
    resume: 'Kaldığın yerden devam et',
    seePro: "Pro'yu incele",
    goPro: "Tarifeleri gör",
    proTeaser: 'Pro ile 10 kategori, 571 morfem ve 4 oyun modu açılır.',
    progressKept: "İlerlemen saklanır; Pro'ya geçtiğinde kaldığın yerden devam edersin.",
    planName: 'Yıllık Pro Üyelik',
    price: '₺2.000 / yıl (₺4.500 yerine)',
    games: 'Oyunlar',
    play: 'Oyna',
    unlockPro: 'Pro ile açılır',
    modes: [
      { name: 'Flashcard', desc: 'Terim kartlarını çevirerek öğren.', cta: 'Kartları çevir →' },
      { name: 'Eşleştirme', desc: 'Terimleri Türkçe karşılıklarıyla eşleştir.', cta: 'Terimleri eşleştir →' },
      { name: 'Quiz', desc: 'Kategoriye özel çoktan seçmeli sorular.', cta: 'Quiz’e başla →' },
      { name: 'Morfem Yapıcı', desc: 'Ön ek, kök ve son ekle terimi kendin kur.', cta: 'Terimi kur →' }
    ]
  },
  en: {
    trial: 'Trial',
    trialUpper: '3-DAY TRIAL',
    lastDay: 'Last day',
    lastDayUpper: 'LAST DAY',
    trialEnded: 'Trial ended',
    day: 'Day',
    daysLeft: 'days left',
    hello: 'Hello',
    endsOn: 'Ends Sep 9, 23:59',
    endsTonight: 'Ends tonight at 23:59',
    day1Sub: 'Your 3-day trial has started. All categories, 571 morphemes and all 4 game modes are fully unlocked. Start by solving your first term in 20 seconds.',
    day3Sub: 'Last day of your trial. You can finish 12 more terms today; your progress is saved.',
    solveFirst: 'Solve your first term',
    resume: 'Pick up where you left off',
    seePro: 'See Pro',
    goPro: 'View plans',
    proTeaser: 'Pro unlocks 10 categories, 571 morphemes and all 4 game modes.',
    progressKept: 'Your progress is saved; going Pro resumes exactly where you left off.',
    planName: 'Annual Pro Membership',
    price: '₺2,000 / year (was ₺4,500)',
    games: 'Games',
    play: 'Play',
    unlockPro: 'Unlocks with Pro',
    modes: [
      { name: 'Flashcard', desc: 'Flip term cards to learn.', cta: 'Flip cards →' },
      { name: 'Matching', desc: 'Match terms with their meanings.', cta: 'Match terms →' },
      { name: 'Quiz', desc: 'Category-specific multiple choice.', cta: 'Start quiz →' },
      { name: 'Morpheme Builder', desc: 'Build the term from prefix, root and suffix.', cta: 'Build terms →' }
    ]
  }
};

const MODE_CONFIGS = [
  {
    bg: 'bg-gradient-to-br from-[#3b82f6] to-[#93c5fd]',
    d: 'M2 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z',
    locked: false,
    route: '/flashcards'
  },
  {
    bg: 'bg-gradient-to-br from-[#22c55e] to-[#facc15]',
    d: 'M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5',
    locked: false,
    route: '/match'
  },
  {
    bg: 'bg-gradient-to-br from-[#f97316] to-[#fcd34d]',
    d: 'M9.5 2a4 4 0 0 0-4 4v1.5a3.5 3.5 0 0 0 0 7V16a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4zM14.5 2a4 4 0 0 1 4 4v1.5a3.5 3.5 0 0 1 0 7V16a4 4 0 0 1-8 0',
    locked: false,
    route: '/quiz'
  },
  {
    bg: 'bg-gradient-to-br from-[#7c3aed] to-[#c084fc]',
    d: 'M14 7a2 2 0 1 0-4 0H7v3a2 2 0 1 0 0 4v3h3a2 2 0 1 0 4 0h3v-3a2 2 0 1 0 0-4V7z',
    locked: false,
    route: '/morpheme'
  }
];

export const TrialDashboardView = ({ user: propUser, userData: propUserData }) => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [currentUser, setCurrentUser] = useState(propUser || auth.currentUser);
  const [firestoreUser, setFirestoreUser] = useState(propUserData || null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const snap = await getDoc(doc(db, 'users', user.uid));
          if (snap.exists()) {
            setFirestoreUser(snap.data());
          }
        } catch (e) {
          console.warn('Error reading firestore user doc:', e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const isTr = currentLanguage === 'tr';
  const t = TRANSLATIONS[isTr ? 'tr' : 'en'];

  const [searchParams, setSearchParams] = useSearchParams();
  const dayParam = searchParams.get('day');
  const debugDay = dayParam ? parseInt(dayParam, 10) : null;

  // Dinamik Deneme Süresi Hesaplaması (URL parametresi ?day=3 ile simüle edilebilir)
  const baseTrial = getUserTrialState(currentUser);
  const currentDay = debugDay ? Math.min(3, Math.max(1, debugDay)) : baseTrial.currentDay;
  const daysLeft = debugDay ? Math.max(1, 4 - currentDay) : baseTrial.daysLeft;
  const endDate = baseTrial.endDate;
  const isLastDay = currentDay >= 3;

  // Dinamik Bitiş Tarihi Biçimlendirmesi
  const endsOnFormatted = isLastDay
    ? t.endsTonight
    : isTr
    ? `${endDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })} 23:59’da biter`
    : `Ends ${endDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}, 23:59`;

  // Gün 1 ve Gün 2 aynı sistemde çalışır, Gün 3 son gün olarak farklılaşır
  const currentSub = isLastDay ? t.day3Sub : t.day1Sub;

  // Kullanıcı Adı ve Soyadı (Türkçe İ, I, Ç, Ş, Ğ karakterleri korunarak)
  const storedUser = getUser();
  const rawName =
    firestoreUser?.displayName ||
    firestoreUser?.name ||
    currentUser?.displayName ||
    propUser?.displayName ||
    storedUser?.name ||
    currentUser?.email?.split('@')[0] ||
    (isTr ? 'Kullanıcı' : 'User');

  const userName = formatTurkishName(rawName);

  // Dinamik Kullanıcı İlerleme İstatistikleri
  const stats = getStats() || {};
  const learnedTermsCount = stats.learnedTerms || 0;
  const termsMax = 100;
  const termsPercent = Math.min(100, Math.round((learnedTermsCount / termsMax) * 100));

  const tabParam = searchParams.get('tab');
  const isPricingTab = tabParam === 'pricing';

  if (isPricingTab) {
    return <PricingView />;
  }

  const morphemesMax = 20;
  const morphemesCount = Math.min(morphemesMax, stats.morphemesReviewed || (learnedTermsCount > 0 ? Math.floor(learnedTermsCount / 4) : 0));
  const morphemesPercent = Math.min(100, Math.round((morphemesCount / morphemesMax) * 100));

  const quotas = [
    {
      name: isTr ? 'Çalışma / Sözlük' : 'Study / Glossary',
      count: `${learnedTermsCount} / ${termsMax} ${isTr ? 'terim' : 'terms'}`,
      w: `${termsPercent}%`,
      note: learnedTermsCount > 0
        ? `${termsMax - learnedTermsCount} ${isTr ? 'terim kaldı' : 'terms left'}`
        : `${termsMax} ${isTr ? 'terim açık' : 'terms open'}`,
      route: '/terms'
    },
    {
      name: isTr ? 'Morfemler' : 'Morphemes',
      count: `${morphemesCount} / ${morphemesMax} ${isTr ? 'morfem' : 'morphemes'}`,
      w: `${morphemesPercent}%`,
      note: isTr ? '571 morfemden 20’si açık' : '20 of 571 morphemes open',
      route: '/morphemes'
    },
    {
      name: isTr ? 'Oyunlar' : 'Games',
      count: isTr ? '2 / 4 mod' : '2 / 4 modes',
      w: '50%',
      note: isTr ? 'Flashcard ve Eşleştirme açık' : 'Flashcard and Matching open',
      route: '/games'
    }
  ];

  const todayFormatted = new Date().toLocaleDateString(isTr ? 'tr-TR' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased transition-colors flex flex-col justify-between">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 flex-1">
        
        {/* Karşılama ve Tarih */}
        <div className="pb-2">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">
            {todayFormatted}
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-serif">
            {t.hello}, {userName}! 👋
          </h1>
        </div>

        {/* Hero Alanı: Sol Karşılama & Sağ Deneme Kartı */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-6 sm:gap-8 items-start w-full">
          {/* Sol Kolon */}
          <div className="flex flex-col gap-3.5">
            <p className="text-base sm:text-[17px] leading-relaxed text-muted-foreground font-normal">
              {currentSub}
            </p>

            <div className="mt-1.5">
              <button
                onClick={() => navigate('/terms')}
                className="bg-gradient-to-r from-[#2b7fff] to-[#5aa9ff] hover:from-[#2563eb] hover:to-[#3b82f6] text-white font-bold text-[15px] py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
              >
                {isLastDay || learnedTermsCount > 0 ? `${t.resume} →` : `${t.solveFirst} →`}
              </button>
            </div>
          </div>

          {/* Sağ Kolon: Deneme Kartı (Gün 1-2 vs Gün 3) */}
          {isLastDay ? (
            /* Gün 3 (Son Gün) Kartı - Kırmızı Çeper */
            <div className="bg-card border-2 border-red-500 dark:border-red-600 rounded-2xl p-5 sm:p-6 flex flex-col gap-3.5 shadow-sm">
              <div className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-red-600 dark:text-red-400 uppercase">
                {t.trialUpper} · {t.lastDayUpper}
              </div>

              {/* 3 Parçalı İlerleme Çubuğu: 2 mavi, 1 turuncu */}
              <div className="flex gap-1.5">
                <span className="flex-1 h-2 rounded-full bg-[#2563eb]" />
                <span className="flex-1 h-2 rounded-full bg-[#2563eb]" />
                <span className="flex-1 h-2 rounded-full bg-[#f97316]" />
              </div>

              <div className="flex justify-between font-semibold text-[14px] text-foreground">
                <span>{t.day} 3 / 3</span>
                <span className="text-muted-foreground">{t.endsTonight}</span>
              </div>

              <div className="border-t border-border pt-3 text-[13px] leading-relaxed text-muted-foreground">
                {t.progressKept}
              </div>

              {/* Pro Plan Satırı */}
              <div className="flex justify-between items-center bg-muted/60 dark:bg-muted/30 border border-border/50 rounded-xl p-3 sm:p-3.5 mt-0.5">
                <div>
                  <div className="font-extrabold text-[14px] text-foreground">{t.planName}</div>
                  <div className="font-semibold text-[12px] text-muted-foreground">{t.price}</div>
                </div>
                <button
                  onClick={() => navigate('/pricing')}
                  className="bg-[#0f1b33] dark:bg-primary hover:bg-[#1a2d4c] dark:hover:bg-primary/90 text-white font-bold text-[13px] py-2 px-3.5 rounded-lg transition-all cursor-pointer shadow-xs"
                >
                  {t.goPro} →
                </button>
              </div>
            </div>
          ) : (
            /* Gün 1 & Gün 2 Kartı */
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 flex flex-col gap-3.5 shadow-sm">
              <div className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-muted-foreground uppercase">
                {t.trialUpper}
              </div>

              {/* 3 Parçalı Dinamik İlerleme Çubuğu */}
              <div className="flex gap-1.5">
                <span
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    currentDay >= 1 ? 'bg-[#2563eb]' : 'bg-muted'
                  }`}
                />
                <span
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    currentDay >= 2 ? 'bg-[#2563eb]' : 'bg-muted'
                  }`}
                />
                <span
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    currentDay >= 3 ? 'bg-[#2563eb]' : 'bg-muted'
                  }`}
                />
              </div>

              <div className="flex justify-between font-semibold text-[14px] text-foreground">
                <span>{t.day} {currentDay} / 3</span>
                <span className="text-muted-foreground">{endsOnFormatted}</span>
              </div>

              <div className="border-t border-border pt-3 text-[13px] leading-relaxed text-muted-foreground">
                {t.proTeaser}{' '}
                <button
                  onClick={() => navigate('/pricing')}
                  className="font-bold text-[#2563eb] dark:text-blue-400 hover:underline cursor-pointer inline-flex items-center gap-0.5 ml-1 bg-transparent border-0 p-0"
                >
                  {t.seePro} →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Kotalar / İlerleme Kutuları (3 Kart) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {quotas.map((q, idx) => (
            <div
              key={idx}
              onClick={() => navigate(q.route)}
              className="group bg-card border border-border hover:border-primary/40 rounded-2xl p-6 flex flex-col gap-3 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer w-full"
            >
              <div className="flex justify-between items-baseline">
                <span className="font-extrabold text-[15px] text-foreground group-hover:text-primary transition-colors">
                  {q.name}
                </span>
                <span className="font-extrabold text-[14px] text-[#2563eb] dark:text-blue-400">
                  {q.count}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2563eb] rounded-full transition-all duration-500"
                  style={{ width: q.w }}
                />
              </div>
              <div className="font-normal text-[13px] text-muted-foreground">
                {q.note}
              </div>
            </div>
          ))}
        </div>

        {/* Oyunlar Alanı (4 Kart) */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between">
            <h2 className="m-0 font-serif font-semibold text-2xl text-foreground">
              {t.games}
            </h2>
            <button
              onClick={() => navigate('/games')}
              className="text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              {isTr ? 'Tümünü Gör →' : 'View All →'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {t.modes.map((m, idx) => {
              const config = MODE_CONFIGS[idx];
              const isLocked = config.locked;

              return (
                <div
                  key={idx}
                  className={`bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 shadow-xs transition-all ${
                    isLocked ? 'opacity-85' : 'hover:shadow-md hover:border-primary/30'
                  }`}
                >
                  {/* Oyun İkonu & Pro Rozeti */}
                  <div className="flex justify-between items-start">
                    <div
                      className={`w-12 h-12 rounded-xl ${config.bg} grid place-items-center shadow-xs text-white flex-shrink-0`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={config.d} />
                      </svg>
                    </div>
                    {isLocked && (
                      <span className="inline-flex items-center gap-1 bg-muted border border-border text-muted-foreground font-extrabold text-[11px] py-1 px-2.5 rounded-md">
                        🔒 PRO
                      </span>
                    )}
                  </div>

                  {/* Oyun Başlığı */}
                  <div className="font-bold text-[18px] text-foreground mt-0.5">
                    {m.name}
                  </div>

                  {/* Oyun Açıklaması */}
                  <div className="font-normal text-[14px] leading-relaxed text-muted-foreground flex-1">
                    {m.desc}
                  </div>

                  {/* Buton */}
                  <button
                    onClick={() => navigate(config.route)}
                    className={`block w-full text-center font-bold text-[14px] py-2.5 px-3 rounded-xl mt-1.5 transition-all cursor-pointer ${
                      isLocked
                        ? 'bg-card hover:bg-muted text-muted-foreground hover:text-foreground border border-border'
                        : 'bg-gradient-to-r from-[#2b7fff] to-[#5aa9ff] hover:from-[#2563eb] hover:to-[#3b82f6] text-white shadow-xs hover:shadow border-0'
                    }`}
                  >
                    {isLocked ? `🔒 ${t.unlockPro}` : m.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialDashboardView;
