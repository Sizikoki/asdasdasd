// =============================================================================
// HealthLexMed — QuizGameFable  (SELF-CONTAINED · TEK DOSYA)
// Konum: src/components/games/QuizGameFable.jsx
// =============================================================================
// Fable 5 / Elmish (Model-Update-View) kapalı durum makinesi mimarisi.
// Site genel açık/koyu tema CSS değişkenlerine (bg-card, text-foreground,
// border-border, bg-muted, gradient-primary) %100 uyumludur.
// =============================================================================

import React, { useReducer, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, Trophy, Check, X, RotateCcw, Zap, Target, BookOpen,
} from 'lucide-react';
import { saveQuizScore, updateStreak } from '@/utils/storage';

// ── Ayarlar ──────────────────────────────────────────────────────────────────
const FEEDBACK_DELAY_MS = 5000; // Geri bildirim süresi (Doğru ve Yanlış için 5 sn)
const ROUND_SIZE = 10;          // Tur başına soru
const POINTS_CORRECT = 10;      // Doğru: +10
const POINTS_WRONG = 5;         // Yanlış: -5 (skor 0'ın altına inmez)

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

// =============================================================================
// GÖMÜLÜ ADAPTER — Soru & Çeldirici Üretimi (Elmish Cmd katmanının karşılığı)
// =============================================================================

const QUIZ_DIRECTIONS = Object.freeze({
  TERM_TO_MEANING: 'termToMeaning', // Soru: Latince terim  → Şıklar: anlam/tanım
  MEANING_TO_TERM: 'meaningToTerm', // Soru: anlam/tanım    → Şıklar: Latince terim
});

/** Fisher–Yates — tarafsız karıştırma. */
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Soru ve şıklar için tanım/anlam metni (soru ve cevaplar korunur). */
const getMeaningText = (term, language = 'tr') => {
  if (language === 'en') {
    return (term.english || term.turkish || term.englishDefinition || term.turkishShort || term.definition || '');
  }
  return (term.turkishShort || term.definition || term.turkishDefinition || '');
};

/** Metin karşılaştırması için normalizasyon (TR yereli ile). */
const norm = (s) => (s || '').trim().toLocaleLowerCase('tr');

/**
 * Ham terimlerden bir quiz turu üretir.
 *
 * @param {Array}  terms              medicalTerms.js term objeleri
 * @param {Object} opts
 * @param {'tr'|'en'} opts.language   Şık/anlam dili (varsayılan 'tr')
 * @param {number} opts.roundSize     Tur başına soru sayısı (varsayılan 10)
 * @returns {Array} QuizQuestion[] — havuz yetersizse boş dizi
 */
function adaptTermsToQuizQuestions(terms, { language = 'tr', roundSize = ROUND_SIZE } = {}) {
  const seenTerms = new Set();
  const pool = [];
  for (const t of terms || []) {
    const rawTerm = t.term || '';
    const cleanTerm = rawTerm.split(/[\/;]/)[0].trim().replace(/\s*\([A-Z0-9,\s\-]+\)$/i, '').trim();
    if (!cleanTerm) continue;
    const meaning = getMeaningText(t, language);
    if (!meaning) continue;
    const key = norm(cleanTerm);
    if (seenTerms.has(key)) continue;
    seenTerms.add(key);
    pool.push({ ...t, term: cleanTerm, __meaning: meaning });
  }

  if (pool.length < 2) return [];

  const selected = shuffle(pool).slice(0, Math.min(roundSize, pool.length));

  const questions = selected.map((target, qIndex) => {
    const direction =
      Math.random() < 0.5
        ? QUIZ_DIRECTIONS.TERM_TO_MEANING
        : QUIZ_DIRECTIONS.MEANING_TO_TERM;

    const optionTextOf = (t) =>
      direction === QUIZ_DIRECTIONS.TERM_TO_MEANING ? t.__meaning : t.term;

    const answerText = optionTextOf(target);

    const usedTexts = new Set([norm(answerText)]);
    const distractors = [];
    for (const t of shuffle(pool)) {
      if (t.id === target.id) continue;
      const text = optionTextOf(t);
      if (usedTexts.has(norm(text))) continue;
      usedTexts.add(norm(text));
      distractors.push({ id: `q${qIndex}-t${t.id}`, text, isCorrect: false });
      if (distractors.length === 3) break;
    }

    return {
      id: target.id ?? qIndex,
      direction,
      targetTerm: target.term,
      questionText:
        direction === QUIZ_DIRECTIONS.TERM_TO_MEANING
          ? target.term
          : (language === 'en' && target.englishDefinition ? target.englishDefinition : target.__meaning),
      options: shuffle([
        { id: `q${qIndex}-t${target.id}`, text: answerText, isCorrect: true },
        ...distractors,
      ]),
      explanation: language === 'en' && target.englishDefinition
        ? `${target.term} (${target.english || target.turkish}) — ${target.englishDefinition}`
        : (target.roots
            ? `${target.term} · ${target.roots}`
            : `${target.term} — ${target.__meaning}`),
    };
  });

  return questions.filter((q) => q.options.length >= 2);
}

// ── i18n ────────────────────────────────────────────────────────────────────
const TEXT = {
  tr: {
    title: 'Terim Quiz',
    question: 'Soru',
    promptTermToMeaning: 'Bu terimin anlamı nedir?',
    promptMeaningToTerm: 'Bu tanımı karşılayan terim hangisidir?',
    correct: 'Doğru!',
    wrong: 'Yanlış!',
    finishedTitle: 'Quiz Tamamlandı!',
    totalScore: 'Toplam Puan',
    correctLabel: 'Doğru',
    wrongLabel: 'Yanlış',
    accuracy: 'Başarı',
    playAgain: 'Yeniden Oyna',
    back: 'Geri Dön',
    nextQuestion: 'Sıradaki Soru',
    notEnoughTerms: 'Bu kategoride quiz oluşturmak için yeterli terim bulunmuyor.',
    msgPerfect: 'Mükemmel! Terimlere hakimsin. 🏆',
    msgGreat: 'Çok iyi! Az kaldı, ustalaşıyorsun. 💪',
    msgGood: 'İyi gidiyorsun, tekrarla pekiştir. 📚',
    msgKeepGoing: 'Her tekrar seni ileri taşır, pes etme! 🌱',
  },
  en: {
    title: 'Term Quiz',
    question: 'Question',
    promptTermToMeaning: 'What does this term mean?',
    promptMeaningToTerm: 'Which term matches this definition?',
    correct: 'Correct!',
    wrong: 'Wrong!',
    finishedTitle: 'Quiz Completed!',
    totalScore: 'Total Score',
    correctLabel: 'Correct',
    wrongLabel: 'Wrong',
    accuracy: 'Accuracy',
    playAgain: 'Play Again',
    back: 'Go Back',
    nextQuestion: 'Next Question',
    notEnoughTerms: 'Not enough terms in this category to build a quiz.',
    msgPerfect: 'Perfect! You have mastered these terms. 🏆',
    msgGreat: 'Great job! Mastery is within reach. 💪',
    msgGood: 'Good progress — repetition will lock it in. 📚',
    msgKeepGoing: 'Every attempt moves you forward. Keep going! 🌱',
  },
};

// ── MVU: durum ve mesaj etiketleri ──────────────────────────────────────────
const S = Object.freeze({
  Playing: 'Playing',
  AnswerChecked: 'AnswerChecked',
  Finished: 'Finished',
});

const M = Object.freeze({
  SetQuestions: 'SET_QUESTIONS',
  SelectOption: 'SELECT_OPTION',
  NextQuestion: 'NEXT_QUESTION',
  ResetGame: 'RESET_GAME',
});

const initialModel = {
  questions: null,
  currentIndex: 0,
  score: 0,
  correctCount: 0,
  wrongCount: 0,
  state: { tag: S.Playing },
};

function update(model, msg) {
  switch (msg.type) {
    case M.SetQuestions:
      return { ...initialModel, questions: msg.questions };

    case M.SelectOption: {
      if (model.state.tag !== S.Playing) return model;

      const q = model.questions?.[model.currentIndex];
      if (!q) return model;
      const opt = q.options.find((o) => o.id === msg.optionId);
      if (!opt) return model;

      const isCorrect = opt.isCorrect;
      return {
        ...model,
        score: isCorrect
          ? model.score + POINTS_CORRECT
          : Math.max(0, model.score - POINTS_WRONG),
        correctCount: model.correctCount + (isCorrect ? 1 : 0),
        wrongCount: model.wrongCount + (isCorrect ? 0 : 1),
        state: { tag: S.AnswerChecked, selectedId: msg.optionId, isCorrect },
      };
    }

    case M.NextQuestion: {
      if (model.state.tag !== S.AnswerChecked) return model;

      const nextIndex = model.currentIndex + 1;
      if (!model.questions || nextIndex >= model.questions.length) {
        return { ...model, state: { tag: S.Finished } };
      }
      return { ...model, currentIndex: nextIndex, state: { tag: S.Playing } };
    }

    case M.ResetGame:
      return { ...initialModel, questions: model.questions };

    default:
      return model;
  }
}

// ── Yardımcılar ──────────────────────────────────────────────────────────────
const cx = (...cls) => cls.filter(Boolean).join(' ');

const toTitleCase = (s) =>
  (s || '').replace(
    /\S+/g,
    (w) => w.charAt(0).toLocaleUpperCase('en') + w.slice(1).toLocaleLowerCase('en'),
  );

const vibrate = (pattern) => {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  } catch {
    /* titreşim yutulur */
  }
};

const KEYFRAMES = `
@keyframes hlxFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes hlxPop { 0% { transform: scale(0.8); } 60% { transform: scale(1.08); } 100% { transform: scale(1); } }
@keyframes hlxShake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
@keyframes hlxCountdown { from { width: 100%; } to { width: 0%; } }
@media (prefers-reduced-motion: reduce) {
  .hlx-quiz *, .hlx-quiz { animation: none !important; transition: none !important; }
}
`;

// =============================================================================
// Bileşen
// =============================================================================
export default function QuizGameFable({ terms, language = 'tr', onBack, t, categoryId = 'all' }) {
  const [model, dispatch] = useReducer(update, initialModel);
  const hasSavedRef = useRef(false);

  const L = TEXT[language] || TEXT.tr;
  const tx = useCallback(
    (key, fallback) => {
      if (typeof t === 'function') {
        try {
          const v = t(key, fallback);
          if (typeof v === 'string' && v && v !== key) return v;
        } catch {
          /* fallback */
        }
      }
      return fallback;
    },
    [t],
  );

  const startRound = useCallback(() => {
    hasSavedRef.current = false;
    dispatch({
      type: M.SetQuestions,
      questions: adaptTermsToQuizQuestions(terms, { language, roundSize: ROUND_SIZE }),
    });
  }, [terms, language]);

  useEffect(() => {
    startRound();
  }, [startRound]);

  // Save quiz score upon completion
  useEffect(() => {
    const totalCount = model.questions?.length ?? 0;
    if (model.state.tag === S.Finished && totalCount > 0 && !hasSavedRef.current) {
      hasSavedRef.current = true;
      saveQuizScore(categoryId || 'all', model.correctCount, totalCount);
      updateStreak();
    }
  }, [model.state.tag, categoryId, model.correctCount, model.questions]);

  // ── Sub: 5 sn geri bildirim zamanlayıcısı ──────────────────────────────────
  useEffect(() => {
    if (model.state.tag !== S.AnswerChecked) return undefined;
    const timerId = setTimeout(() => {
      dispatch({ type: M.NextQuestion });
    }, FEEDBACK_DELAY_MS);
    return () => clearTimeout(timerId);
  }, [model.state]);

  const currentQuestion = model.questions?.[model.currentIndex] ?? null;
  const totalQuestions = model.questions?.length ?? 0;
  const locked = model.state.tag !== S.Playing;

  const handleSelect = (optionId) => {
    if (model.state.tag !== S.Playing || !currentQuestion) return;
    const opt = currentQuestion.options.find((o) => o.id === optionId);
    vibrate(opt?.isCorrect ? 14 : [28, 40, 28]);
    dispatch({ type: M.SelectOption, optionId });
  };

  const answeredCount =
    model.currentIndex + (model.state.tag === S.AnswerChecked ? 1 : 0);
  const progressPct = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  const answeredTotal = model.correctCount + model.wrongCount;
  const accuracy = answeredTotal > 0
    ? Math.round((model.correctCount / answeredTotal) * 100)
    : 0;

  const finishMessage = useMemo(() => {
    if (accuracy >= 90) return tx('quizMsgPerfect', L.msgPerfect);
    if (accuracy >= 70) return tx('quizMsgGreat', L.msgGreat);
    if (accuracy >= 50) return tx('quizMsgGood', L.msgGood);
    return tx('quizMsgKeepGoing', L.msgKeepGoing);
  }, [accuracy, tx, L]);

  // ── Şık stilleri (Tema Uyumlu) ─────────────────────────────────────────────
  const optionClasses = (opt) => {
    const base =
      'w-full min-h-[56px] rounded-xl border-2 px-4 py-3 flex items-center gap-3 ' +
      'text-left transition-all duration-150 touch-manipulation select-none';

    if (!locked) {
      return cx(
        base,
        'border-border bg-muted/30 text-foreground',
        'hover:bg-muted/80 hover:border-primary/50',
        'active:scale-[0.98] cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      );
    }

    // AnswerChecked / Finished
    if (opt.isCorrect) {
      return cx(base, 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium');
    }
    if (model.state.tag === S.AnswerChecked && opt.id === model.state.selectedId) {
      return cx(
        base,
        'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-medium',
        'animate-[hlxShake_0.3s_ease-in-out]',
      );
    }
    return cx(base, 'border-border/60 bg-muted/20 text-muted-foreground opacity-60');
  };

  const badgeClasses = (opt) => {
    const base =
      'w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-sm font-bold transition-colors';
    if (!locked) return cx(base, 'bg-muted text-muted-foreground border border-border/50');
    if (opt.isCorrect) return cx(base, 'bg-emerald-500 text-white shadow-sm');
    if (model.state.tag === S.AnswerChecked && opt.id === model.state.selectedId) {
      return cx(base, 'bg-rose-500 text-white shadow-sm');
    }
    return cx(base, 'bg-muted/50 text-muted-foreground/60');
  };

  return (
    <div
      className="hlx-quiz w-full max-w-2xl mx-auto"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <style>{KEYFRAMES}</style>

      <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden text-card-foreground">
        {/* ── Üst çubuk ── */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-5">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              className={cx(
                'flex items-center gap-1.5 min-h-[44px] px-3 -ml-3 rounded-xl',
                'text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60',
                'active:scale-[0.98] transition-all touch-manipulation select-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              {tx('back', L.back)}
            </button>

            <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-foreground">
              <BookOpen className="w-4 h-4 text-primary" />
              {tx('quizTitle', L.title)}
            </div>

            {/* Skor rozeti */}
            <div
              key={model.score}
              className="flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3.5 py-1.5 text-sm font-bold text-foreground animate-[hlxPop_0.25s_ease-out]"
            >
              <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              {model.score}
            </div>
          </div>

          {/* İlerleme */}
          {model.state.tag !== S.Finished && totalQuestions > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-1.5">
                <span>
                  {tx('question', L.question)}{' '}
                  <span className="text-foreground font-bold">
                    {Math.min(model.currentIndex + 1, totalQuestions)}
                  </span>
                  {' / '}{totalQuestions}
                </span>
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-semibold text-foreground">{model.correctCount}</span>
                  <X className="w-3.5 h-3.5 text-rose-500 ml-1.5" />
                  <span className="font-semibold text-foreground">{model.wrongCount}</span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full gradient-primary transition-all duration-500 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Gövde ── */}
        <div className="px-4 sm:px-6 py-5 sm:py-6">
          {model.questions === null && (
            <div className="py-16 flex justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-muted border-t-primary animate-spin" />
            </div>
          )}

          {model.questions !== null && totalQuestions === 0 && (
            <div className="py-12 text-center animate-[hlxFadeUp_0.3s_ease-out]">
              <p className="text-muted-foreground mb-6">
                {tx('quizNotEnoughTerms', L.notEnoughTerms)}
              </p>
              <button
                type="button"
                onClick={onBack}
                className="min-h-[56px] px-6 rounded-xl border border-border bg-muted/50 font-semibold text-foreground hover:bg-muted active:scale-[0.98] transition-all touch-manipulation select-none"
              >
                {tx('back', L.back)}
              </button>
            </div>
          )}

          {model.state.tag !== S.Finished && currentQuestion && (
            <div
              key={currentQuestion.id}
              className="animate-[hlxFadeUp_0.3s_ease-out]"
            >
              {/* Soru kartı */}
              <div className="rounded-2xl border border-border bg-muted/40 px-4 py-5 sm:px-6 sm:py-8 text-center mb-5 overflow-hidden">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2.5 sm:mb-3">
                  {currentQuestion.direction === QUIZ_DIRECTIONS.TERM_TO_MEANING
                    ? tx('quizPromptTerm', L.promptTermToMeaning)
                    : tx('quizPromptMeaning', L.promptMeaningToTerm)}
                </p>
                {currentQuestion.direction === QUIZ_DIRECTIONS.TERM_TO_MEANING ? (
                  <h2 className="font-serif italic text-xl sm:text-2xl md:text-3xl font-bold text-foreground break-words hyphens-auto">
                    {toTitleCase(currentQuestion.questionText)}
                  </h2>
                ) : (
                  <h2 className="text-base sm:text-xl font-semibold leading-relaxed text-foreground break-words">
                    {currentQuestion.questionText}
                  </h2>
                )}
              </div>

              {/* Şıklar */}
              <div className="flex flex-col gap-3" role="group">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected =
                    model.state.tag === S.AnswerChecked &&
                    opt.id === model.state.selectedId;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect(opt.id)}
                      disabled={locked}
                      aria-pressed={isSelected}
                      className={cx(optionClasses(opt), 'disabled:cursor-default')}
                    >
                      <span className={badgeClasses(opt)}>
                        {locked && opt.isCorrect ? (
                          <Check className="w-4 h-4" />
                        ) : locked && isSelected ? (
                          <X className="w-4 h-4" />
                        ) : (
                          OPTION_LETTERS[i] ?? i + 1
                        )}
                      </span>
                      <span
                        className={cx(
                          'flex-1 text-[15px] sm:text-base leading-snug break-words',
                          currentQuestion.direction === QUIZ_DIRECTIONS.MEANING_TO_TERM &&
                            'font-serif italic',
                        )}
                      >
                        {currentQuestion.direction === QUIZ_DIRECTIONS.MEANING_TO_TERM
                          ? toTitleCase(opt.text)
                          : opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Geri bildirim şeridi */}
              <div className="min-h-[72px] mt-4" aria-live="polite">
                {model.state.tag === S.AnswerChecked && (
                  <div
                    className={cx(
                      'rounded-2xl border px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-[hlxFadeUp_0.2s_ease-out] relative overflow-hidden',
                      model.state.isCorrect
                        ? 'border-emerald-500/40 bg-emerald-500/10'
                        : 'border-rose-500/40 bg-rose-500/10',
                    )}
                  >
                    <div className="flex items-start gap-2.5 flex-1 z-10">
                      {model.state.isCorrect ? (
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      )}
                      <div className="text-sm leading-snug">
                        <span
                          className={cx(
                            'font-bold',
                            model.state.isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300',
                          )}
                        >
                          {model.state.isCorrect
                            ? `${tx('quizCorrect', L.correct)} +${POINTS_CORRECT}`
                            : `${tx('quizWrong', L.wrong)} −${POINTS_WRONG}`}
                        </span>
                        <span className="block text-foreground/90 mt-1 font-medium">
                          {currentQuestion.explanation}
                        </span>
                      </div>
                    </div>

                    {/* Doğrudan geçiş butonu */}
                    <button
                      type="button"
                      onClick={() => dispatch({ type: M.NextQuestion })}
                      className={cx(
                        'w-full sm:w-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shrink-0 transition-all select-none touch-manipulation z-10',
                        model.state.isCorrect
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 active:scale-95'
                          : 'bg-rose-500/15 text-rose-700 dark:text-rose-200 hover:bg-rose-500/25 border border-rose-500/40 active:scale-95 shadow-sm'
                      )}
                    >
                      <span>{tx('quizNextQuestion', L.nextQuestion)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Görsel süre çubuğu */}
                    <div
                      className={cx(
                        'absolute bottom-0 left-0 right-0 h-1',
                        model.state.isCorrect ? 'bg-emerald-500/20' : 'bg-rose-500/20'
                      )}
                    >
                      <div
                        className={cx(
                          'h-full',
                          model.state.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                        )}
                        style={{
                          animation: `hlxCountdown ${FEEDBACK_DELAY_MS}ms linear forwards`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bitiş ekranı */}
          {model.state.tag === S.Finished && (
            <div className="text-center py-4 animate-[hlxFadeUp_0.35s_ease-out]">
              <div className="w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20 mb-5 animate-[hlxPop_0.4s_ease-out]">
                <Trophy className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-1.5 text-foreground">
                {tx('quizFinishedTitle', L.finishedTitle)}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">{finishMessage}</p>

              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {tx('quizTotalScore', L.totalScore)}
              </p>
              <p className="text-5xl font-black text-primary mb-7">
                {model.score}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="rounded-2xl border border-border bg-muted/40 py-4">
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {model.correctCount}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {tx('quizCorrectLabel', L.correctLabel)}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 py-4">
                  <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                    {model.wrongCount}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {tx('quizWrongLabel', L.wrongLabel)}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 py-4">
                  <p className="text-2xl font-bold text-primary">%{accuracy}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {tx('quizAccuracy', L.accuracy)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={startRound}
                  className={cx(
                    'flex-1 min-h-[56px] rounded-xl font-bold text-white gradient-primary',
                    'hover:opacity-90 active:scale-[0.98] transition-all touch-manipulation select-none',
                    'flex items-center justify-center gap-2 shadow-lg shadow-primary/20',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  )}
                >
                  <RotateCcw className="w-5 h-5" />
                  {tx('quizPlayAgain', L.playAgain)}
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  className={cx(
                    'flex-1 min-h-[56px] rounded-xl font-semibold text-foreground',
                    'border border-border bg-muted/50 hover:bg-muted',
                    'active:scale-[0.98] transition-all touch-manipulation select-none',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  )}
                >
                  {tx('back', L.back)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
