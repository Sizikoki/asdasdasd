import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStats, getUser, getStreak, getProgress } from '@/utils/storage';
import { getAllTerms } from '@/data/medicalTerms';
import { formatMedicalTerm } from '@/utils/format';
import { useLanguage } from '@/context/LanguageContext';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const user = getUser();
  const stats = getStats();
  const streak = getStreak();
  const progress = getProgress();
  const [terms, setTerms] = useState(() => getAllTerms());

  const [inProp, setInProp] = useState(false);
  const [totdFlipped, setTotdFlipped] = useState(false);

  useEffect(() => {
    setInProp(true);

    const fetchLiveTerms = async () => {
      try {
        let timeoutId;
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Firestore timeout')), 3000);
        });

        const querySnapshot = await Promise.race([
          getDocs(collection(db, 'terms')),
          timeoutPromise
        ]);
        if (timeoutId) clearTimeout(timeoutId);

        let rawTerms = [];
        querySnapshot.forEach((doc) => {
          rawTerms.push(doc.data());
        });

        if (rawTerms.length > 0) {
          const normalized = rawTerms.map((termItem) => ({
            id: termItem.id,
            term: termItem.term,
            turkish: termItem.english || termItem.turkish || '',
            turkishShort: termItem.turkishShort || '',
            definition: termItem.turkishDefinition || termItem.definition || '',
            turkishDefinition: termItem.turkishDefinition || termItem.definition || '',
            english: termItem.english || termItem.turkish || '',
            englishDefinition: termItem.englishDefinition || termItem.english || '',
            roots: termItem.roots || '',
            category: termItem.category || '',
            system: termItem.system || '',
            subcategory: termItem.subcategory || '',
          }));
          setTerms(normalized);
        }
      } catch (error) {
        console.warn('Dashboard terms fetch error, using local fallback:', error);
      }
    };

    fetchLiveTerms();
  }, []);

  const formatName = (name) => {
    if (!name) return 'Kullanıcı';
    return name
      .split(' ')
      .map(word => {
        if (!word) return '';
        return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR');
      })
      .join(' ');
  };
  const userName = formatName(user?.name);

  // ----------------------------------------------------
  // Dynamic Category Progress Calculations
  // ----------------------------------------------------
  const catList = [
    { id: 'skull_bones', key: 'skullBones', name: 'Kafatası Kemikleri' },
    { id: 'face_bones', key: 'faceBones', name: 'Yüz Kemikleri' },
    { id: 'trunk_bones', key: 'trunkBones', name: 'Gövde Kemikleri' },
    { id: 'upper_extremity_bones', key: 'upperExtremityBones', name: 'Üst Ekstremite Kemikleri' },
    { id: 'upper_extremity_joints', key: 'upperExtremityJoints', name: 'Üst Ekstremite Eklemleri' },
    { id: 'lower_extremity_bones', key: 'lowerExtremityBones', name: 'Alt Ekstremite Kemikleri' },
    { id: 'lower_extremity_joints', key: 'lowerExtremityJoints', name: 'Alt Ekstremite Eklemleri' },
    { id: 'spine_joints', key: 'spineJoints', name: 'Omurga Eklemleri' },
    { id: 'head_and_neck_joints', key: 'headAndNeckJoints', name: 'Kafa ve Boyun Eklemleri' },
    { id: 'movement_terms', key: 'movementTerms', name: 'Hareket Terimleri' },
    { id: 'anatomic_direction', key: 'anatomicDirection', name: 'Anatomik Yön Terimleri' },
  ];

  const getCategoryProgress = (catId) => {
    const catTerms = terms.filter(t => t.category === catId || t.subcategory === catId);
    if (catTerms.length === 0) return 0;
    const learnedCatTerms = catTerms.filter(t => progress[t.id]?.learned);
    return Math.round((learnedCatTerms.length / catTerms.length) * 100);
  };

  let activeCategory = catList.find(c => {
    const p = getCategoryProgress(c.id);
    return p > 0 && p < 100;
  }) || catList[3];

  const activeProgress = getCategoryProgress(activeCategory.id);
  const activeCatTerms = terms.filter(t => t.category === activeCategory.id || t.subcategory === activeCategory.id);
  const activeLearnedCount = activeCatTerms.filter(t => progress[t.id]?.learned).length;
  const activeTotalCount = activeCatTerms.length;

  const termsOfTheDay = [
    { 
      term: 'Malleolus', 
      meaning: currentLanguage === 'en' 
        ? 'Medial and lateral bony prominences at the ankle joint; located at the lower ends of the tibia and fibula.' 
        : 'Ayak bileğinin iç ve dış çıkıntıları; tibia ve fibulanın alt uçlarında yer alır.' 
    },
    { 
      term: 'Sustentaculum Tali', 
      meaning: currentLanguage === 'en'
        ? 'Shelf-like projection on the calcaneus supporting the talus bone.'
        : 'Topuk kemiğinin aşık kemiğini destekleyen raf benzeri çıkıntısı.' 
    },
    { 
      term: 'Olecranon', 
      meaning: currentLanguage === 'en'
        ? 'Prominence at the elbow tip; located at the upper end of the ulna forming the point of the elbow.'
        : 'Dirsek ucu çıkıntısı; ulnanın üst ucunda yer alır ve dirseğin arkasını oluşturur.' 
    },
    { 
      term: 'Symphysis Pubica', 
      meaning: currentLanguage === 'en'
        ? 'Midline cartilaginous joint uniting the pubic bones anteriorly.'
        : 'Çatı kemiklerinin ön ortadaki birleşme yeri; kıkırdak eklem yapısı.' 
    },
    { 
      term: 'Acromion', 
      meaning: currentLanguage === 'en'
        ? 'Outermost bony process of the scapula forming the peak of the shoulder.'
        : 'Kürek kemiğinin omuz başını oluşturan en dış çıkıntısı.' 
    },
    { 
      term: 'Patella', 
      meaning: currentLanguage === 'en'
        ? 'Kneecap bone; flat sesamoid bone protecting the knee joint.'
        : 'Diz kapağı kemiği; diz eklemini koruyan yassı susamsı kemik.' 
    },
    { 
      term: 'Processus Styloideus', 
      meaning: currentLanguage === 'en'
        ? 'Slender, pointed pen-like bony projection beneath the temporal bone or radius.'
        : 'Şakak kemiğinin veya döner kemiğin altındaki kalem benzeri ince çıkıntı.' 
    }
  ];

  const todayIndex = new Date().getDate() % termsOfTheDay.length;
  const todayTerm = termsOfTheDay[todayIndex];

  return (
    <div className="dashboard-theme min-h-screen bg-[var(--paper)]">
      <main className="py-[40px] px-0">
        <div className="wrap">
          
          {/* WELCOME BLOCK */}
          <section className="mb-[52px]">
            <div className={`welcome p-[34px] md:p-[36px] rounded-[18px] transition-all duration-500 transform ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <div>
                <div className="eyebrow text-[#38BDF8] text-[0.78rem] tracking-[0.15em] uppercase font-bold mb-2">
                  {t('welcome')}
                </div>
                <h1 className="font-serif font-semibold text-[1.8rem] md:text-[2.2rem] leading-[1.2] mb-2 tracking-tight">
                  {t('hello')}, {userName} 👋
                </h1>
                <p className="text-[#D0E1F9] text-[0.98rem] max-w-[44ch] leading-[1.5]">
                  {terms.length - stats.learnedTerms > 10 ? 12 : Math.max(3, terms.length - stats.learnedTerms)} {t('dashboardTermsWaiting')}
                </p>
                <div className="welcome-pills flex gap-[16px] text-[0.82rem] text-[#D0E1F9] mt-6">
                  <span className="flex items-center gap-[6px]">
                    <span className="dot w-[5px] h-[5px] rounded-full bg-white opacity-60"></span>
                    {stats.learnedTerms} {t('dashboardLearnedTermsSub')}
                  </span>
                  <span className="flex items-center gap-[6px]">
                    <span className="dot w-[5px] h-[5px] rounded-full bg-white opacity-60"></span>
                    %{stats.averageQuizScore || 0} {t('dashboardAverageScoreSub')}
                  </span>
                </div>
              </div>
              <div className="welcome-cta flex flex-col items-end gap-[10px]">
                <button
                  onClick={() => navigate('/study')}
                  className="btn btn-primary bg-[var(--coral)] text-white font-semibold text-[0.94rem] px-[20px] py-[12px] rounded-[9px] hover:bg-[#a83a26] transition-all"
                >
                  {t('startTodayReview')} →
                </button>
                <button
                  onClick={() => document.getElementById('modes')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn bg-[#2563EB] text-white border border-blue-600/30 font-semibold text-[0.94rem] px-[20px] py-[12px] rounded-[9px] hover:bg-blue-700 transition-all"
                >
                  {t('selectGame')}
                </button>
              </div>
            </div>
          </section>

          {/* MODE TILES */}
          <section className="mb-[52px]" id="modes">
            <div className={`section-head flex justify-between items-end mb-[20px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <h2 className="font-serif font-semibold text-[1.45rem] tracking-tight text-[var(--ink)]">
                {t('whatToStudyToday')}
              </h2>
            </div>
            <div className={`tiles grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              {/* Quiz Tile */}
              <div 
                className="tile bg-white border border-[var(--line)] rounded-[var(--radius)] p-[26px] md:p-[24px] flex flex-col gap-[14px] cursor-pointer hover:border-[var(--teal)] hover:-translate-y-0.5 transition-all"
                onClick={() => navigate('/quiz')}
              >
                <div className="ic ic-teal w-[42px] h-[42px] rounded-[10px] bg-[#E0ECFD] color-[var(--teal-deep)] flex items-center justify-center">
                  <svg className="w-[21px] h-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9.5 9.5a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 1.9-2.4 3.7M12 17h.01" />
                  </svg>
                </div>
                <h3 className="text-[1.02rem] font-bold text-[var(--ink)] m-0">{t('quizMode')}</h3>
                <p className="text-[0.86rem] text-[var(--muted)] leading-[1.5] m-0">
                  {t('quizDesc')}
                </p>
                <span className="go mt-auto font-semibold text-[0.84rem] text-[var(--teal-deep)] flex items-center gap-[6px]">
                  {t('play')} →
                </span>
              </div>

              {/* Flashcard Tile */}
              <div 
                className="tile bg-white border border-[var(--line)] rounded-[var(--radius)] p-[26px] md:p-[24px] flex flex-col gap-[14px] cursor-pointer hover:border-[var(--teal)] hover:-translate-y-0.5 transition-all"
                onClick={() => navigate('/flashcards')}
              >
                <div className="ic ic-coral w-[42px] h-[42px] rounded-[10px] bg-[#F7E4DE] color-[var(--coral)] flex items-center justify-center">
                  <svg className="w-[21px] h-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="18" rx="2" />
                    <path d="M8 8h8M8 12h8M8 16h5" />
                  </svg>
                </div>
                <h3 className="text-[1.02rem] font-bold text-[var(--ink)] m-0">{t('flashcards')}</h3>
                <p className="text-[0.86rem] text-[var(--muted)] leading-[1.5] m-0">
                  {t('flashcardDesc')}
                </p>
                <span className="go mt-auto font-semibold text-[0.84rem] text-[var(--teal-deep)] flex items-center gap-[6px]">
                  {t('play')} →
                </span>
              </div>

              {/* Match Tile */}
              <div 
                className="tile bg-white border border-[var(--line)] rounded-[var(--radius)] p-[26px] md:p-[24px] flex flex-col gap-[14px] cursor-pointer hover:border-[var(--teal)] hover:-translate-y-0.5 transition-all"
                onClick={() => navigate('/match')}
              >
                <div className="ic ic-gold w-[42px] h-[42px] rounded-[10px] bg-[#FBEFE1] color-[var(--gold)] flex items-center justify-center">
                  <svg className="w-[21px] h-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3v18M18 3v18M3 8l3-3 3 3M21 16l-3 3-3-3" />
                  </svg>
                </div>
                <h3 className="text-[1.02rem] font-bold text-[var(--ink)] m-0">{t('matchingGame')}</h3>
                <p className="text-[0.86rem] text-[var(--muted)] leading-[1.5] m-0">
                  {t('matchDesc')}
                </p>
                <span className="go mt-auto font-semibold text-[0.84rem] text-[var(--teal-deep)] flex items-center gap-[6px]">
                  {t('play')} →
                </span>
              </div>

              {/* Morpheme Builder Tile */}
              <div 
                className="tile bg-white border border-[var(--line)] rounded-[var(--radius)] p-[26px] md:p-[24px] flex flex-col gap-[14px] cursor-pointer hover:border-[var(--teal)] hover:-translate-y-0.5 transition-all"
                onClick={() => navigate('/morpheme')}
              >
                <div className="ic ic-purple w-[42px] h-[42px] rounded-[10px] bg-[#F3E8FF] color-[#7E22CE] flex items-center justify-center">
                  <svg className="w-[21px] h-[21px] text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19.439 7.85c0-1.57.8-2.35 1.56-3.11A3.5 3.5 0 0 0 16 2a3.5 3.5 0 0 0-2.74 5.7" />
                    <path d="M4.56 16.15c0 1.57-.8 2.35-1.56 3.11A3.5 3.5 0 0 0 8 22a3.5 3.5 0 0 0 2.74-5.7" />
                    <path d="M7.85 4.56c-1.57 0-2.35-.8-3.11-1.56A3.5 3.5 0 0 0 2 8a3.5 3.5 0 0 0 5.7 2.74" />
                    <path d="M16.15 19.44c1.57 0 2.35.8 3.11 1.56A3.5 3.5 0 0 0 22 16a3.5 3.5 0 0 0-5.7-2.74" />
                  </svg>
                </div>
                <h3 className="text-[1.02rem] font-bold text-[var(--ink)] m-0">{t('morphemeBuilder')}</h3>
                <p className="text-[0.86rem] text-[var(--muted)] leading-[1.5] m-0">
                  {t('morphemeDesc')}
                </p>
                <span className="go mt-auto font-semibold text-[0.84rem] text-[var(--teal-deep)] flex items-center gap-[6px]">
                  {t('play')} →
                </span>
              </div>
            </div>
          </section>

          {/* TWO COLUMN: TERM OF THE DAY & RESUME */}
          <section className="mb-[52px]">
            <div className="two-col grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              
              {/* Term of Day Flippable Card */}
              <div className={`totd-card bg-white border border-[var(--line)] rounded-[var(--radius)] p-[28px] flex flex-col items-center text-center transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <div className="eyebrow text-[0.72rem] tracking-[0.12em] uppercase font-semibold text-[var(--teal)] mb-[8px]">
                  {t('termOfTheDay')}
                </div>
                <div 
                  className={`flip-card w-full max-w-[280px] h-[180px] cursor-pointer my-[14px] ${totdFlipped ? 'flipped' : ''}`}
                  onClick={() => setTotdFlipped(!totdFlipped)}
                >
                  <div className="flip-inner relative w-full h-full duration-500 transform-style-3d">
                    {/* Front Face */}
                    <div className="flip-face absolute inset-0 rounded-[12px] border border-[var(--line)] flex flex-col items-center justify-center p-[16px] bg-[var(--paper)] backface-hidden overflow-hidden">
                      <div className="lbl font-mono text-[0.68rem] tracking-[0.1em] text-[var(--teal)] uppercase mb-[8px]">
                        {t('latinTerm')}
                      </div>
                      <div className="term font-mono text-[1.2rem] sm:text-[1.4rem] font-bold text-[var(--ink)] text-center break-words px-1 max-w-full leading-snug">
                        {formatMedicalTerm(todayTerm.term)}
                      </div>
                    </div>
                    {/* Back Face */}
                    <div className="flip-face flip-back absolute inset-0 rounded-[12px] flex flex-col items-center justify-center p-[16px] bg-[var(--teal-deep)] text-white rotate-y-180 backface-hidden overflow-hidden">
                      <p className="text-[0.82rem] sm:text-[0.88rem] leading-[1.45] text-[#E0ECFD] m-0 overflow-y-auto max-h-full px-1 text-center break-words">
                        {todayTerm.meaning}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flip-hint text-[0.78rem] text-[var(--muted)]">
                  ↻ {t('tapToFlip')}
                </div>
              </div>

              {/* Resume Last Category Card */}
              <div className={`resume-card bg-white border border-[var(--line)] rounded-[var(--radius)] p-[28px] flex flex-col justify-between transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <div>
                  <div className="resume-top flex justify-between items-start gap-[14px]">
                    <div>
                      <div className="eyebrow text-[0.72rem] tracking-[0.12em] uppercase font-semibold text-[var(--teal)] mb-[8px]">
                        {t('continueLearning')}
                      </div>
                      <h3 className="text-[1.06rem] font-bold text-[var(--ink)] m-0 mt-[16px] mb-[6px]">
                        {t(activeCategory.key, activeCategory.name)}
                      </h3>
                    </div>
                    {/* Conic Gradient dynamic progress ring */}
                    <div 
                      className="ring w-[56px] h-[56px] rounded-full flex-shrink-0 flex items-center justify-center border border-[var(--line)]" 
                      style={{ 
                        background: `conic-gradient(var(--teal) 0% ${activeProgress}%, var(--line) ${activeProgress}% 100%)` 
                      }}
                    >
                      <div className="ring-inner w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center text-[0.72rem] font-bold text-[var(--teal-deep)]">
                        {activeProgress}%
                      </div>
                    </div>
                  </div>
                  <p className="text-[0.88rem] text-[var(--muted)] leading-[1.5] m-0 mt-4 mb-[20px]">
                    {t('currentPlace')} {activeLearnedCount} / {activeTotalCount} {t('terms')}. {activeTotalCount - activeLearnedCount > 0 ? `${activeTotalCount - activeLearnedCount} ${t('termsRemainingWaiting')}` : t('categoryCompleted')}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/study')}
                  className="btn btn-primary bg-[var(--coral)] text-white font-semibold text-[0.94rem] px-[20px] py-[12px] rounded-[9px] hover:bg-[#a83a26] transition-all self-start"
                >
                  {t('continueLearning')} →
                </button>
              </div>

            </div>
          </section>

          {/* PROGRESS LIST */}
          <section className="mb-[52px]">
            <div className={`section-head flex justify-between items-end mb-[20px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <h2 className="font-serif font-semibold text-[1.45rem] tracking-tight text-[var(--ink)]">
                {t('inProgress')}
              </h2>
              <span 
                onClick={() => navigate('/progress')}
                className="see-all text-[0.86rem] font-bold text-[var(--teal-deep)] cursor-pointer"
              >
                {t('allStats')} →
              </span>
            </div>

            {/* Statistics Quick Strip */}
            <div className={`stats-row grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[var(--line)] border border-[var(--line)] rounded-[14px] overflow-hidden mb-[20px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <div className="stat bg-white p-[24px] md:p-[22px]">
                <div className="num font-serif text-[1.9rem] font-bold text-[var(--teal-deep)]">
                  {stats.learnedTerms}
                </div>
                <div className="lbl text-[0.85rem] text-[var(--muted)] mt-1">
                  {t('termsMastered')}
                </div>
              </div>
              <div className="stat bg-white p-[24px] md:p-[22px]">
                <div className="num font-serif text-[1.9rem] font-bold text-[var(--teal-deep)]">
                  %{stats.averageQuizScore || 0}
                </div>
                <div className="lbl text-[0.85rem] text-[var(--muted)] mt-1">
                  {t('averageAccuracy')}
                </div>
              </div>
              <div className="stat bg-white p-[24px] md:p-[22px]">
                <div className="num font-serif text-[1.9rem] font-bold text-[var(--teal-deep)]">
                  {streak.currentStreak}
                </div>
                <div className="lbl text-[0.85rem] text-[var(--muted)] mt-1">
                  {t('dailyStreak')}
                </div>
              </div>
            </div>

            {/* Category Rows with Fill Animations */}
            <div className={`cat-list bg-white border border-[var(--line)] rounded-[var(--radius)] p-[8px] md:p-[8px_26px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              {catList.map((cat) => {
                const pct = getCategoryProgress(cat.id);
                return (
                  <div className="cat-row flex items-center gap-[18px] py-[18px] border-b border-[var(--line)] last:border-none" key={cat.id}>
                    <div className="cat-name w-[180px] flex-shrink-0 text-[0.92rem] font-bold text-[var(--ink)]">
                      {t(cat.key, cat.name)}
                    </div>
                    <div className="cat-bar-track flex-1 h-[8px] rounded-[6px] bg-[var(--paper-dim)] overflow-hidden">
                      <div 
                        className="cat-bar-fill h-full rounded-[6px] bg-[var(--teal)] transition-all duration-1000"
                        style={{ width: inProp ? `${pct}%` : '0%' }}
                      ></div>
                    </div>
                    <div className="cat-pct w-[44px] text-right font-mono text-[0.82rem] text-[var(--muted)] flex-shrink-0">
                      %{pct}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};
