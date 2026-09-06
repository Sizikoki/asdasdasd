import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStats, getQuizScores, getMatchScores, getMorphemeScores, getFlashcardSessions, getUser, getStreak, getProgress, isLoggedIn } from '@/utils/storage';
import { getAllTerms } from '@/data/medicalTerms';
import { useLanguage } from '@/context/LanguageContext';

export const ProgressPage = () => {
  const { currentLanguage, t } = useLanguage();
  const stats = getStats();
  const user = getUser();
  const streak = getStreak();
  const progress = getProgress();
  const terms = getAllTerms();
  const userIsLoggedIn = isLoggedIn();

  const quizScores = getQuizScores().slice(-10).reverse();
  const matchScores = getMatchScores().slice(-10).reverse();
  const morphemeScores = getMorphemeScores().slice(-10).reverse();
  const flashcardSessions = getFlashcardSessions().slice(-10).reverse();
  const totalTerms = terms.length;

  const progressPercentage = Math.round((stats.learnedTerms / totalTerms) * 100);

  const [activeTab, setActiveTab] = useState('quiz');
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
  }, []);

  const formatName = (name) => {
    if (!name) return currentLanguage === 'en' ? 'User' : 'Kullanıcı';
    return name
      .split(' ')
      .map(word => {
        if (!word) return '';
        return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR');
      })
      .join(' ');
  };
  const userName = userIsLoggedIn ? formatName(user?.name) : (currentLanguage === 'en' ? 'Guest' : 'Misafir');

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const quizGoalCount = 5;
  const isGoalCompleted = stats.quizzesTaken >= quizGoalCount;
  const quizGoalPct = Math.min(100, Math.round((stats.quizzesTaken / quizGoalCount) * 100));

  const heatCells = Array.from({ length: 28 }, (_, i) => {
    const isToday = i === 27;
    let isActive = false;
    if (isToday && streak.currentStreak > 0) isActive = true;
    else if (i === 26 && streak.currentStreak > 1) isActive = true;
    else if (i === 25 && streak.currentStreak > 2) isActive = true;
    else if (i === 20 && stats.quizzesTaken > 0) isActive = true;
    else if (i === 15 && stats.matchGamesPlayed > 0) isActive = true;
    else if (i === 10 && stats.learnedTerms > 20) isActive = true;
    else if (i === 5 && stats.learnedTerms > 5) isActive = true;
    return { isToday, isActive };
  });

  const catList = [
    { id: 'skull_bones', key: 'skullBones', name: 'Kafatası Kemikleri' },
    { id: 'trunk_bones', key: 'trunkBones', name: 'Gövde Kemikleri' },
    { id: 'face_bones', key: 'faceBones', name: 'Yüz Kemikleri' },
    { id: 'upper_extremity_bones', key: 'upperExtremityBones', name: 'Üst Ekstremite' },
    { id: 'upper_extremity_joints', key: 'upperExtremityJoints', name: 'Üst Ekstremite Eklemleri' },
    { id: 'lower_extremity_bones', key: 'lowerExtremityBones', name: 'Alt Ekstremite' },
    { id: 'lower_extremity_joints', key: 'lowerExtremityJoints', name: 'Alt Ekstremite Eklemleri' },
    { id: 'spine_joints', key: 'spineJoints', name: 'Omurga Eklemleri' },
    { id: 'head_and_neck_joints', key: 'headAndNeckJoints', name: 'Kafa ve Boyun Eklemleri' },
    { id: 'movement_terms', key: 'movementTerms', name: 'Hareket Terimleri' },
    { id: 'anatomic_direction', key: 'anatomicDirection', name: 'Anatomik Yön Terimleri' },
  ];

  const categoriesWithProgress = catList.map(cat => {
    const catTerms = terms.filter(t => t.category === cat.id || t.subcategory === cat.id);
    const learnedCatTerms = catTerms.filter(t => progress[t.id]?.learned);
    const pct = catTerms.length > 0 ? Math.round((learnedCatTerms.length / catTerms.length) * 100) : 0;
    return { ...cat, pct };
  });

  const achievements = [
    {
      id: 'first_step',
      title: t('achFirstStepTitle'),
      description: t('achFirstStepDesc'),
      unlocked: stats.learnedTerms >= 1,
      type: 'achievement'
    },
    {
      id: 'quick_start',
      title: t('achQuickStartTitle'),
      description: t('achQuickStartDesc'),
      unlocked: stats.learnedTerms >= 10,
      type: 'achievement'
    },
    {
      id: 'star_student',
      title: t('achStarStudentTitle'),
      description: t('achStarStudentDesc'),
      unlocked: stats.learnedTerms >= 50,
      type: 'achievement'
    },
    {
      id: 'quiz_master',
      title: t('achQuizMasterTitle'),
      description: t('achQuizMasterDesc'),
      unlocked: stats.quizzesTaken >= 5,
      type: 'fractional',
      pct: quizGoalPct,
      label: `${stats.quizzesTaken} / 5 ${t('completed')}`
    },
    {
      id: 'on_fire',
      title: t('achOnFireTitle'),
      description: t('achOnFireDesc'),
      unlocked: streak.currentStreak >= 7 || streak.longestStreak >= 7,
      type: 'fractional',
      pct: Math.min(100, Math.round((streak.currentStreak / 7) * 100)),
      label: `${Math.min(7, streak.currentStreak)} / 7 ${t('daysStreak')}`
    },
    {
      id: 'perfect_score',
      title: t('achPerfectTitle'),
      description: t('achPerfectDesc'),
      unlocked: quizScores.some(s => s.percentage === 100),
      type: 'fractional',
      pct: quizScores.some(s => s.percentage === 100) ? 100 : 0,
      label: `${quizScores.some(s => s.percentage === 100) ? 1 : 0} / 1 quiz`
    }
  ];

  return (
    <div className="progress-theme min-h-screen bg-[var(--paper)]">
      <main className="py-[36px] px-0">
        <div className="wrap">
          
          {/* GUEST BANNER */}
          {!userIsLoggedIn && (
            <div className="mb-6 p-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 text-amber-950">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-bold text-base">{t('guestModePreview')}</h3>
                  <p className="text-sm opacity-90 text-amber-900">
                    {t('guestProgressNotice')}
                  </p>
                </div>
              </div>
              <div className="flex gap-2.5 whitespace-nowrap">
                <Link to="/register" className="btn bg-[var(--teal)] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[var(--teal-deep)] transition-all">
                  {t('register')}
                </Link>
                <Link to="/login" className="btn bg-white border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-all">
                  {t('login')}
                </Link>
              </div>
            </div>
          )}

          {/* GREETING & NEXT GOAL */}
          <section className="mb-[40px]">
            <div className={`transition-all duration-500 transform ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <h1 className="font-serif font-semibold text-[1.7rem] md:text-[2.2rem] leading-[1.2] mb-1.5 tracking-tight text-[var(--ink)]">
                {t('hello')}, {userName} 👋
              </h1>
              <p className="lead text-[var(--muted)] text-[1rem] m-0">
                {t('progressSub')}
              </p>
            </div>

            <div className={`goal-card flex items-center justify-between gap-[24px] flex-wrap bg-white border-[1.5px] border-[var(--teal)] rounded-[var(--radius)] p-[20px_26px] mt-[22px] transition-all duration-500 transform ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <div className="goal-left flex items-center gap-[16px]">
                <div className="goal-ic w-[46px] h-[46px] rounded-[12px] bg-[var(--teal)] text-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="goal-title font-bold text-[0.98rem] text-[var(--ink)] mb-[3px]">
                    {t('nextGoal')} {t('quizMasterTitle')}
                  </div>
                  <div className="goal-sub text-[0.86rem] text-[var(--muted)]">
                    {isGoalCompleted 
                      ? t('quizGoalCompleted')
                      : `${t('quizGoalSub')} ${stats.quizzesTaken}/5, ${quizGoalCount - stats.quizzesTaken} ${t('quizzesLeft')}`}
                  </div>
                </div>
              </div>
              <div className="goal-progress flex items-center gap-[10px] min-width-[160px]">
                <div className="goal-bar-track flex-1 h-[7px] rounded-[5px] bg-[var(--paper-dim)] overflow-hidden">
                  <div 
                    className="goal-bar-fill h-full rounded-[5px] bg-[var(--teal)] transition-all duration-1000"
                    style={{ width: inProp ? `${quizGoalPct}%` : '0%' }}
                  ></div>
                </div>
                <span className="goal-pct font-mono text-[0.8rem] text-[var(--teal-deep)] font-semibold">
                  {stats.quizzesTaken}/5
                </span>
              </div>
            </div>
          </section>

          {/* REWEIGHTED METRICS GRID */}
          <section className="mb-[40px]">
            <div className={`metrics-grid grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-[18px] mt-[22px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              
              {/* Term Metrics Hero Card */}
              <div className="metric-hero bg-white border border-[var(--line)] rounded-[var(--radius)] p-[28px_30px] flex flex-col justify-center">
                <div className="num font-serif text-[3rem] font-bold text-[var(--teal-deep)] leading-[1]">
                  {stats.learnedTerms}
                </div>
                <div className="lbl text-[0.95rem] text-[var(--muted)] mt-2 mb-[14px]">
                  {t('termsMastered')}
                </div>
                <div className="bar-track h-[8px] rounded-[6px] bg-[var(--paper-dim)] overflow-hidden">
                  <div 
                    className="bar-fill h-full rounded-[6px] bg-[var(--teal)] transition-all duration-1000"
                    style={{ width: inProp ? `${progressPercentage}%` : '0%' }}
                  ></div>
                </div>
                <div className="note text-[0.82rem] text-[var(--muted)] mt-2">
                  %{progressPercentage} {t('completed')} — {t('wordPool')} {totalTerms - stats.learnedTerms} {t('remainingTerms')}
                </div>
              </div>

              {/* Activity Heatmap Card */}
              <div className="activity-card bg-white border border-[var(--line)] rounded-[var(--radius)] p-[22px_24px]">
                <div className="lbl text-[0.95rem] font-bold text-[var(--ink)] mb-[2px]">
                  {t('activity')}
                </div>
                <div className="sub text-[0.8rem] text-[var(--muted)] mb-[14px]">
                  {t('activeThisMonth')} {streak.currentStreak > 0 ? streak.currentStreak : 1} {t('daysActive')} · {t('longestStreak')} {streak.longestStreak} {t('daysStreak')}
                </div>
                <div className="heatmap grid grid-cols-14 gap-[4px]">
                  {heatCells.map((cell, idx) => (
                    <div 
                      key={idx} 
                      className={`heat-cell aspect-square rounded-[3px] bg-[var(--paper-dim)] ${
                        cell.isActive ? 'lvl2 bg-[var(--teal)]' : ''
                      } ${
                        cell.isToday ? 'today outline outline-[1.5px] outline-[var(--coral)] outline-offset-1' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className={`secondary-row grid grid-cols-1 md:grid-cols-2 gap-[18px] mt-[18px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              {/* Accuracy Card */}
              <div className="metric-soft bg-white border border-[var(--line)] rounded-[var(--radius)] p-[20px_22px] neutral bg-[var(--paper-dim)] border-dashed">
                <div className="top flex justify-between items-start">
                  <div>
                    <div className="num font-serif text-[1.5rem] font-bold text-[var(--ink)]">
                      %{stats.averageQuizScore || 0}
                    </div>
                    <div className="lbl text-[0.86rem] text-[var(--muted)] mt-1">
                      {t('averageScore')} · {stats.quizzesTaken < 5 ? t('earlyData') : t('steady')}
                    </div>
                  </div>
                </div>
                <p className="text-[0.82rem] text-[var(--muted)] mt-2 mb-0">
                  {stats.quizzesTaken < 5 
                    ? `${t('notEnoughData')} ${quizGoalCount - stats.quizzesTaken} ${t('quizzesToComplete')}` 
                    : t('dataCollected')}
                </p>
                <div className="dots flex gap-[5px] mt-[10px]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`dot w-[8px] h-[8px] rounded-full bg-[var(--line)] ${
                        idx < stats.quizzesTaken ? 'filled bg-[var(--gold)]' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Total Review Counts */}
              <div className="metric-soft bg-white border border-[var(--line)] rounded-[var(--radius)] p-[20px_22px]">
                <div className="top flex justify-between items-start">
                  <div>
                    <div className="num font-serif text-[1.5rem] font-bold text-[var(--ink)]">
                      {streak.longestStreak || 1}
                    </div>
                    <div className="lbl text-[0.86rem] text-[var(--muted)] mt-1">
                      {t('totalActiveDays')} · {stats.totalReviews} {t('termsReviewed')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CATEGORY BREAKDOWN */}
          <section className="mb-[40px]">
            <div className={`section-head flex justify-between items-end mb-[18px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <h2 className="font-serif font-semibold text-[1.32rem] tracking-tight text-[var(--ink)]">
                {t('progressByRegion')}
              </h2>
            </div>
            
            <div className={`cat-list bg-white border border-[var(--line)] rounded-[var(--radius)] p-[6px_26px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              {categoriesWithProgress.map((cat) => {
                return (
                  <div className="cat-row flex items-center gap-[18px] py-[16px] border-b border-[var(--line)] last:border-none" key={cat.id}>
                    <div className="cat-name w-[170px] flex-shrink-0 text-[0.92rem] font-bold text-[var(--ink)] flex items-center gap-[8px]">
                      {t(cat.key, cat.name)}
                    </div>
                    <div className="cat-bar-track flex-1 h-[8px] rounded-[6px] bg-[var(--paper-dim)] overflow-hidden">
                      <div 
                        className="cat-bar-fill h-full rounded-[6px] transition-all duration-1000 bg-[var(--teal)]"
                        style={{ width: inProp ? `${cat.pct}%` : '0%' }}
                      ></div>
                    </div>
                    <div className="cat-pct w-[44px] text-right font-mono text-[0.82rem] text-[var(--muted)] flex-shrink-0">
                      %{cat.pct}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`cat-cta mt-[16px] flex justify-end transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <Link 
                to="/study" 
                className="btn btn-primary bg-[var(--teal)] text-white font-semibold text-[0.9rem] p-[10px_18px] rounded-[9px] hover:bg-[var(--teal-deep)] transition-all"
              >
                {t('studyCardsBtn')} →
              </Link>
            </div>
          </section>

          {/* ACHIEVEMENTS GRID */}
          <section className="mb-[40px]">
            <div className={`section-head flex justify-between items-end mb-[18px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <h2 className="font-serif font-semibold text-[1.32rem] tracking-tight text-[var(--ink)]">
                {t('achievements')}
              </h2>
              <span className="see-all text-[0.85rem] font-medium text-[var(--muted)]">
                {t('unlockedAndLocked')}
              </span>
            </div>

            <div className={`ach-grid grid grid-cols-1 md:grid-cols-3 gap-[16px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              {achievements.map((ach) => (
                <div 
                  key={ach.id} 
                  className={`ach-card bg-white border border-[var(--line)] rounded-[var(--radius)] p-[22px] transition-all ${
                    !ach.unlocked ? 'locked opacity-[0.72]' : ''
                  }`}
                >
                  <div className={`ach-ic w-[44px] h-[44px] rounded-[11px] flex items-center justify-center mb-[14px] text-white ${
                    ach.unlocked 
                      ? 'bg-gradient-to-br from-[var(--blue)] to-[var(--teal)]' 
                      : 'locked-ic bg-[var(--paper-dim)] text-[var(--muted)]'
                  }`}>
                    <svg className="w-[21px] h-[21px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7"/>
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </div>
                  <h3 className="text-[0.98rem] font-bold text-[var(--ink)] m-0 mb-[4px]">{ach.title}</h3>
                  <p className="text-[0.84rem] text-[var(--muted)] m-0 mb-[10px]">{ach.description}</p>
                  
                  {ach.unlocked ? (
                    <span className="ach-check text-[0.78rem] text-[var(--teal-deep)] font-semibold">✓ {t('unlocked')}</span>
                  ) : (
                    <>
                      <div className="ach-bar-track h-[6px] rounded-[5px] bg-[var(--paper-dim)] overflow-hidden mt-1">
                        <div 
                          className="ach-bar-fill h-full rounded-[5px] bg-[var(--muted)] transition-all duration-1000"
                          style={{ width: inProp ? `${ach.pct}%` : '0%' }}
                        ></div>
                      </div>
                      <span className="ach-frac font-mono text-[0.74rem] text-[var(--muted)] mt-1.5 block">
                        {ach.label}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* HISTORY TABS */}
          <section className="mb-[40px]">
            <div className={`section-head flex justify-between items-end mb-[18px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <h2 className="font-serif font-semibold text-[1.32rem] tracking-tight text-[var(--ink)]">
                {t('history')}
              </h2>
            </div>

            <div className={`transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              {/* Tab Selection Row */}
              <div className="tabs flex gap-[4px] bg-[var(--paper-dim)] p-[4px] rounded-[11px] border border-[var(--line)] flex-wrap mb-[20px]">
                <button 
                  onClick={() => setActiveTab('quiz')}
                  className={`tab-btn border-none bg-none p-[9px_16px] rounded-[8px] font-bold text-[0.86rem] transition-all ${
                    activeTab === 'quiz' ? 'active bg-white text-[var(--ink)] shadow-sm' : 'text-[var(--muted)]'
                  }`}
                >
                  {t('quizHistory')}
                </button>
                <button 
                  onClick={() => setActiveTab('match')}
                  className={`tab-btn border-none bg-none p-[9px_16px] rounded-[8px] font-bold text-[0.86rem] transition-all ${
                    activeTab === 'match' ? 'active bg-white text-[var(--ink)] shadow-sm' : 'text-[var(--muted)]'
                  }`}
                >
                  {t('matchHistory')}
                </button>
                <button 
                  onClick={() => setActiveTab('morpheme')}
                  className={`tab-btn border-none bg-none p-[9px_16px] rounded-[8px] font-bold text-[0.86rem] transition-all ${
                    activeTab === 'morpheme' ? 'active bg-white text-[var(--ink)] shadow-sm' : 'text-[var(--muted)]'
                  }`}
                >
                  {t('morphemeHistory')}
                </button>
                <button 
                  onClick={() => setActiveTab('flashcard')}
                  className={`tab-btn border-none bg-none p-[9px_16px] rounded-[8px] font-bold text-[0.86rem] transition-all ${
                    activeTab === 'flashcard' ? 'active bg-white text-[var(--ink)] shadow-sm' : 'text-[var(--muted)]'
                  }`}
                >
                  {t('flashcardHistory')}
                </button>
              </div>

              {/* 1. QUIZ HISTORY PANEL */}
              <div className={`hist-panel bg-white border border-[var(--line)] rounded-[var(--radius)] p-[26px] ${activeTab === 'quiz' ? 'active block' : 'hidden'}`}>
                <div className="hist-head flex justify-between items-start gap-[20px] flex-wrap mb-[18px]">
                  <div>
                    <div className="hist-title font-bold text-[1rem] text-[var(--ink)] mb-[2px]">{t('recentQuizzes')}</div>
                    <div className="hist-sub text-[0.84rem] text-[var(--muted)]">{t('last10QuizPerf')}</div>
                  </div>
                </div>
                {quizScores.length > 0 ? (
                  quizScores.map((score, idx) => (
                    <div className="hist-item flex justify-between items-center bg-[var(--paper)] rounded-[9px] p-[14px_18px] mb-[10px] last:mb-0" key={idx}>
                      <div>
                        <div className="l1 font-semibold text-[0.92rem]">{score.score} / {score.total}</div>
                        <div className="l2 text-[0.78rem] text-[var(--muted)] mt-[2px]">{formatDate(score.date)}</div>
                      </div>
                      <div className={`score font-serif font-semibold text-[1.15rem] ${
                        score.percentage >= 70 ? 'score-good text-[var(--teal-deep)]' : 'score-mid text-[var(--gold)]'
                      }`}>
                        %{score.percentage}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state text-center py-[30px] px-[10px]">
                    <div className="hist-title font-bold text-[1rem]">{t('noQuizYet')}</div>
                    <p className="text-[var(--muted)] text-[0.92rem] mt-2 mb-[18px]">{t('noQuizSub')}</p>
                    <Link to="/quiz" className="btn btn-primary bg-[var(--teal)] text-white font-semibold text-[0.9rem] p-[10px_18px] rounded-[9px]">{t('solveQuiz')} →</Link>
                  </div>
                )}
              </div>

              {/* 2. MATCH HISTORY PANEL */}
              <div className={`hist-panel bg-white border border-[var(--line)] rounded-[var(--radius)] p-[26px] ${activeTab === 'match' ? 'active block' : 'hidden'}`}>
                <div className="hist-head flex justify-between items-start gap-[20px] flex-wrap mb-[18px]">
                  <div>
                    <div className="hist-title font-bold text-[1rem] text-[var(--ink)] mb-[2px]">{t('recentMatches')}</div>
                    <div className="hist-sub text-[0.84rem] text-[var(--muted)]">{t('last10MatchPerf')}</div>
                  </div>
                </div>
                {matchScores.length > 0 ? (
                  matchScores.map((score, idx) => (
                    <div className="hist-item flex justify-between items-center bg-[var(--paper)] rounded-[9px] p-[14px_18px] mb-[10px] last:mb-0" key={idx}>
                      <div>
                        <div className="l1 font-semibold text-[0.92rem]">{score.moves} moves</div>
                        <div className="l2 text-[0.78rem] text-[var(--muted)] mt-[2px]">{formatDate(score.date)}</div>
                      </div>
                      <div className="score font-serif font-semibold text-[1.15rem] score-good text-[var(--teal-deep)]">
                        {formatTime(score.time)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state text-center py-[30px] px-[10px]">
                    <div className="hist-title font-bold text-[1rem]">{t('noMatchYet')}</div>
                    <p className="text-[var(--muted)] text-[0.92rem] mt-2 mb-[18px]">{t('noMatchSub')}</p>
                    <Link to="/match" className="btn btn-primary bg-[var(--teal)] text-white font-semibold text-[0.9rem] p-[10px_18px] rounded-[9px]">{t('playMatch')} →</Link>
                  </div>
                )}
              </div>

              {/* 3. MORPHEME HISTORY PANEL */}
              <div className={`hist-panel bg-white border border-[var(--line)] rounded-[var(--radius)] p-[26px] ${activeTab === 'morpheme' ? 'active block' : 'hidden'}`}>
                <div className="hist-head flex justify-between items-start gap-[20px] flex-wrap mb-[18px]">
                  <div>
                    <div className="hist-title font-bold text-[1rem] text-[var(--ink)] mb-[2px]">{t('recentMorphemes')}</div>
                    <div className="hist-sub text-[0.84rem] text-[var(--muted)]">{t('last10MorphemePerf')}</div>
                  </div>
                </div>
                {morphemeScores.length > 0 ? (
                  morphemeScores.map((score, idx) => (
                    <div className="hist-item flex justify-between items-center bg-[var(--paper)] rounded-[9px] p-[14px_18px] mb-[10px] last:mb-0" key={idx}>
                      <div>
                        <div className="l1 font-semibold text-[0.92rem]">{score.score} / {score.total} pts</div>
                        <div className="l2 text-[0.78rem] text-[var(--muted)] mt-[2px]">{formatDate(score.date)}</div>
                      </div>
                      <div className="score font-serif font-semibold text-[1.15rem] score-good text-[var(--teal-deep)]">
                        %{score.percentage}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state text-center py-[30px] px-[10px]">
                    <div className="hist-title font-bold text-[1rem]">{t('noMorphemeYet')}</div>
                    <p className="text-[var(--muted)] text-[0.92rem] mt-2 mb-[18px]">{t('noMorphemeSub')}</p>
                    <Link to="/games" className="btn btn-primary bg-[var(--teal)] text-white font-semibold text-[0.9rem] p-[10px_18px] rounded-[9px]">{t('playMorpheme')} →</Link>
                  </div>
                )}
              </div>

              {/* 4. FLASHCARD HISTORY PANEL */}
              <div className={`hist-panel bg-white border border-[var(--line)] rounded-[var(--radius)] p-[26px] ${activeTab === 'flashcard' ? 'active block' : 'hidden'}`}>
                <div className="hist-head flex justify-between items-start gap-[20px] flex-wrap mb-[18px]">
                  <div>
                    <div className="hist-title font-bold text-[1rem] text-[var(--ink)] mb-[2px]">{t('recentFlashcards', 'Son Flashcard Çalışmaları')}</div>
                    <div className="hist-sub text-[0.84rem] text-[var(--muted)]">{t('last10FlashcardPerf', 'Son 10 flashcard oturumu performansı')}</div>
                  </div>
                </div>
                {flashcardSessions.length > 0 ? (
                  flashcardSessions.map((session, idx) => {
                    const pct = session.totalCount > 0 ? Math.round((session.completedCount / session.totalCount) * 100) : 0;
                    const catObj = catList.find(c => c.id === session.categoryId);
                    const catName = catObj ? t(catObj.key, catObj.name) : (session.categoryId === 'all' ? t('allCategories', 'Tüm Kategoriler') : (session.categoryId || t('allCategories', 'Tüm Kategoriler')));

                    return (
                      <div className="hist-item flex justify-between items-center bg-[var(--paper)] rounded-[9px] p-[14px_18px] mb-[10px] last:mb-0" key={idx}>
                        <div>
                          <div className="l1 font-semibold text-[0.92rem]">
                            {session.completedCount} / {session.totalCount} {t('termsLearnedCount', 'terim öğrenildi')}
                            <span className="text-xs text-[var(--muted)] font-normal ml-2">({catName})</span>
                          </div>
                          <div className="l2 text-[0.78rem] text-[var(--muted)] mt-[2px]">{formatDate(session.date)}</div>
                        </div>
                        <div className={`score font-serif font-semibold text-[1.15rem] ${
                          pct >= 70 ? 'score-good text-[var(--teal-deep)]' : 'score-mid text-[var(--gold)]'
                        }`}>
                          %{pct}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="empty-state text-center py-[30px] px-[10px]">
                    <div className="hist-title font-bold text-[1rem]">{t('noFlashcardYet')}</div>
                    <p className="text-[var(--muted)] text-[0.92rem] mt-2 mb-[18px]">{t('noFlashcardSub')}</p>
                    <Link to="/flashcards" className="btn btn-primary bg-[var(--teal)] text-white font-semibold text-[0.9rem] p-[10px_18px] rounded-[9px]">{t('startFlashcards')} →</Link>
                  </div>
                )}
              </div>
            </div>
          </section>


        </div>
      </main>
    </div>
  );
};