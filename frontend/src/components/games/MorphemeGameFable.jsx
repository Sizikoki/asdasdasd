/**
 * =====================================================================
 *  HealthLexMed — Morfem Yapıcı (Morpheme Builder)
 *  MorphemeGameFable.jsx
 * =====================================================================
 *  Fable/Elmish kapalı durum makinesi mimarisi.
 *  Site genel açık/koyu tema CSS değişkenlerine (bg-card, text-foreground,
 *  border-border, bg-muted, gradient-primary) %100 uyumludur.
 * =====================================================================
 */
import React, { useState, useReducer, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Check,
  X,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Puzzle,
  Volume2,
  VolumeX,
} from "lucide-react";
import { saveMorphemeScore, updateStreak } from "@/utils/storage";
import {
  playCorrectSound,
  playWrongSound,
  playTapSound,
  playVictorySound,
  isSoundEnabled,
  setSoundEnabled,
} from "@/utils/soundEffects";

const STRINGS = {
  tr: {
    gameTitle: "Morfem Yapıcı",
    gameSubtitle: "Terimi parçalarından inşa et",
    back: "Geri",
    score: "Puan",
    question: "Soru",
    targetTerm: "Hedef Terim",
    builtTerm: "Oluşturulan Terim",
    emptyHint: "Havuzdan parçaları sırayla seç: Ön Ek → Kök → Son Ek",
    pool: "Parça Havuzu",
    confirm: "Kombinasyonu Onayla",
    correctMsg: "Doğru! Harika dizilim.",
    wrongMsg: "Yanlış kombinasyon. Dizilim sıfırlanıyor, tekrar dene!",
    prefix: "Ön Ek",
    root: "Kök",
    suffix: "Son Ek",
    finishedTitle: "Oyun Bitti!",
    finalScore: "Toplam Puan",
    playAgain: "Yeniden Oyna",
    noQuestions: "Bu kategori için soru bulunamadı.",
    analysis: "Morfem Analizi",
  },
  en: {
    gameTitle: "Morpheme Builder",
    gameSubtitle: "Build the term from its parts",
    back: "Back",
    score: "Score",
    question: "Question",
    targetTerm: "Target Term",
    builtTerm: "Constructed Term",
    emptyHint: "Select parts from the pool in order: Prefix, Root, Suffix",
    pool: "Part Pool",
    confirm: "Confirm Combination",
    correctMsg: "Correct! Great sequence.",
    wrongMsg: "Wrong combination. Sequence reset — try again!",
    prefix: "Prefix",
    root: "Root",
    suffix: "Suffix",
    finishedTitle: "Game Over!",
    finalScore: "Final Score",
    playAgain: "Play Again",
    noQuestions: "No questions found for this category.",
    analysis: "Morpheme Analysis",
  },
};

const PART_META = {
  prefix: {
    chip: "border-indigo-500/50 bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 hover:border-indigo-600 dark:hover:border-indigo-400 hover:bg-indigo-500/15",
    dot: "bg-indigo-600 dark:bg-indigo-400",
  },
  root: {
    chip: "border-violet-500/50 bg-violet-500/10 text-violet-900 dark:text-violet-300 hover:border-violet-600 dark:hover:border-violet-400 hover:bg-violet-500/15",
    dot: "bg-violet-600 dark:bg-violet-400",
  },
  suffix: {
    chip: "border-amber-500/50 bg-amber-500/10 text-amber-900 dark:text-amber-300 hover:border-amber-600 dark:hover:border-amber-400 hover:bg-amber-500/15",
    dot: "bg-amber-600 dark:bg-amber-400",
  },
};

const P = (id, text, meaningTr, meaningEn, partType) => ({
  id,
  text,
  meaning: { tr: meaningTr, en: meaningEn },
  partType,
});

export const DEFAULT_QUESTIONS = [
  {
    id: 1,
    targetLatinTerm: "Dysphagia",
    englishTerm: "Dysphagia",
    definition: { tr: "Yutma güçlüğü", en: "Difficulty swallowing" },
    correctSequence: [
      P("dys", "dys-", "güçlük, bozukluk", "difficult, impaired", "prefix"),
      P("phag", "phag", "yutma, yeme", "swallowing, eating", "root"),
      P("ia1", "-ia", "durum", "condition", "suffix"),
    ],
    distractors: [
      P("a1", "a-", "yokluk", "absence of", "prefix"),
      P("gastr", "gastr", "mide", "stomach", "root"),
      P("itis1", "-itis", "iltihap", "inflammation", "suffix"),
    ],
  },
  {
    id: 2,
    targetLatinTerm: "Sublingualis",
    englishTerm: "Sublingual",
    definition: { tr: "Dil altı ile ilgili", en: "Under the tongue" },
    correctSequence: [
      P("sub", "sub-", "altında", "under, below", "prefix"),
      P("lingu", "lingu", "dil", "tongue", "root"),
      P("alis1", "-alis", "ait, ilgili", "pertaining to", "suffix"),
    ],
    distractors: [
      P("supra", "supra-", "üstünde", "above", "prefix"),
      P("gloss", "gloss", "dil (Yunanca)", "tongue (Greek)", "root"),
      P("icus1", "-icus", "ait, ilgili", "pertaining to", "suffix"),
    ],
  },
  {
    id: 3,
    targetLatinTerm: "Gastroenteritis",
    englishTerm: "Gastroenteritis",
    definition: {
      tr: "Mide ve bağırsak iltihabı",
      en: "Inflammation of stomach and intestines",
    },
    correctSequence: [
      P("gastr2", "gastr", "mide", "stomach", "root"),
      P("enter", "enter", "bağırsak", "intestine", "root"),
      P("itis2", "-itis", "iltihap", "inflammation", "suffix"),
    ],
    distractors: [
      P("hepat", "hepat", "karaciğer", "liver", "root"),
      P("osis1", "-osis", "hastalık durumu", "condition", "suffix"),
      P("peri", "peri-", "çevresinde", "around", "prefix"),
    ],
  },
  {
    id: 4,
    targetLatinTerm: "Intervertebralis",
    englishTerm: "Intervertebral",
    definition: { tr: "Omurlar arasında yer alan", en: "Located between vertebrae" },
    correctSequence: [
      P("inter", "inter-", "arasında", "between", "prefix"),
      P("vertebr", "vertebr", "omur", "vertebra", "root"),
      P("alis2", "-alis", "ait, ilgili", "pertaining to", "suffix"),
    ],
    distractors: [
      P("intra", "intra-", "içinde", "within", "prefix"),
      P("spondyl", "spondyl", "omur (Yunanca)", "vertebra (Greek)", "root"),
      P("aris1", "-aris", "ait, ilgili", "pertaining to", "suffix"),
    ],
  },
  {
    id: 5,
    targetLatinTerm: "Bradycardia",
    englishTerm: "Bradycardia",
    definition: {
      tr: "Kalp atım hızının yavaşlaması",
      en: "Abnormally slow heart rate",
    },
    correctSequence: [
      P("brady", "brady-", "yavaş", "slow", "prefix"),
      P("card", "card", "kalp", "heart", "root"),
      P("ia2", "-ia", "durum", "condition", "suffix"),
    ],
    distractors: [
      P("tachy", "tachy-", "hızlı", "fast", "prefix"),
      P("angi", "angi", "damar", "vessel", "root"),
      P("itis3", "-itis", "iltihap", "inflammation", "suffix"),
    ],
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function assembledPreview(parts) {
  if (!parts || parts.length === 0) return "";

  let result = "";
  for (let i = 0; i < parts.length; i++) {
    const currentRaw = parts[i].text.trim();
    const cleanCurrent = currentRaw.replace(/^-+|-+$/g, "");
    if (!cleanCurrent) continue;

    if (i === 0) {
      result = cleanCurrent.charAt(0).toLocaleUpperCase("tr-TR") + cleanCurrent.slice(1);
    } else {
      const prevRaw = parts[i - 1].text.trim();
      const prevEndsWithHyphen = prevRaw.endsWith("-");
      const currentStartsWithHyphen = currentRaw.startsWith("-");

      if (prevEndsWithHyphen || currentStartsWithHyphen) {
        result += cleanCurrent.toLocaleLowerCase("tr-TR");
      } else {
        result += " " + cleanCurrent.charAt(0).toLocaleUpperCase("tr-TR") + cleanCurrent.slice(1);
      }
    }
  }

  return result;
}

function assembledMeaningPreview(parts, language) {
  if (!parts || parts.length === 0) return "";
  return parts
    .map((p) => {
      const m =
        typeof p.meaning === "string"
          ? p.meaning
          : (language === "en" ? (p.meaning?.en || p.meaning?.tr) : (p.meaning?.tr || p.meaning?.en));
      return m ? m.trim() : "";
    })
    .filter(Boolean)
    .join(" + ");
}

function checkSequence(selected, correct) {
  if (!selected || !correct || selected.length !== correct.length) {
    return { isSuccess: false, isEnglishOrder: false };
  }

  // 1. Standart tam eşleşme (Latince söz dizimi)
  if (correct.every((p, i) => p.text.toLowerCase() === selected[i].text.toLowerCase())) {
    return { isSuccess: true, isEnglishOrder: false };
  }

  // 2. Çok kelimeli terimlerde kelime gruplarının yer değişimi (İngilizce söz dizimi: örn. Frontal + Bone)
  const wordMap = new Map();
  correct.forEach((p) => {
    let wIdx = p.wordIndex;
    if (wIdx === undefined && typeof p.id === 'string') {
      const match = p.id.match(/_w(\d+)_/);
      if (match) wIdx = parseInt(match[1], 10);
    }
    if (wIdx === undefined) wIdx = 0;

    if (!wordMap.has(wIdx)) wordMap.set(wIdx, []);
    wordMap.get(wIdx).push(p);
  });

  const wordGroups = Array.from(wordMap.values());
  if (wordGroups.length > 1) {
    if (wordGroups.length === 2) {
      const reversed = [...wordGroups[1], ...wordGroups[0]];
      if (reversed.every((p, i) => p.text.toLowerCase() === selected[i].text.toLowerCase())) {
        return { isSuccess: true, isEnglishOrder: true };
      }
    } else {
      const reversed = [...wordGroups].reverse().flat();
      if (reversed.every((p, i) => p.text.toLowerCase() === selected[i].text.toLowerCase())) {
        return { isSuccess: true, isEnglishOrder: true };
      }
    }
  }

  return { isSuccess: false, isEnglishOrder: false };
}

function isCorrectSequence(selected, correct) {
  return checkSequence(selected, correct).isSuccess;
}

function normalizeQuestions(terms, roundSize = 10) {
  if (!Array.isArray(terms) || terms.length === 0) return DEFAULT_QUESTIONS.slice(0, roundSize);
  const valid = terms
    .map((q) => {
      if (!q || typeof q.targetLatinTerm !== "string") return q;
      const cleanTarget = q.targetLatinTerm
        .split(/[\/;]/)[0]
        .trim()
        .replace(/\s*\([A-Z0-9,\s\-]+\)$/i, "")
        .trim();
      return {
        ...q,
        targetLatinTerm: cleanTarget || q.targetLatinTerm,
      };
    })
    .filter(
      (q) =>
        q &&
        typeof q.targetLatinTerm === "string" &&
        Array.isArray(q.correctSequence) &&
        q.correctSequence.length > 0
    );
  if (valid.length === 0) return DEFAULT_QUESTIONS.slice(0, roundSize);
  return shuffle(valid).slice(0, Math.min(roundSize, valid.length));
}

function loadQuestion(model, index) {
  const q = model.questions[index];
  if (!q) return { ...model, state: { tag: "Finished" } };
  const pool = [...q.correctSequence, ...(q.distractors ?? q.poolOptions ?? [])];
  return {
    ...model,
    currentIndex: index,
    selectedSequence: [],
    availablePool: shuffle(pool),
    state: { tag: "Playing" },
  };
}

function init(questions) {
  return loadQuestion(
    {
      questions,
      currentIndex: 0,
      selectedSequence: [],
      availablePool: [],
      score: 0,
      state: { tag: "Playing" },
    },
    0
  );
}

function update(model, msg) {
  const tag = model.state.tag;

  switch (msg.type) {
    case "SelectPart": {
      if (tag !== "Playing") return model;
      if (!model.availablePool.some((p) => p.id === msg.part.id)) return model;
      return {
        ...model,
        selectedSequence: [...model.selectedSequence, msg.part],
        availablePool: model.availablePool.filter((p) => p.id !== msg.part.id),
      };
    }
    case "DeselectPart": {
      if (tag !== "Playing") return model;
      if (!model.selectedSequence.some((p) => p.id === msg.part.id)) return model;
      return {
        ...model,
        selectedSequence: model.selectedSequence.filter((p) => p.id !== msg.part.id),
        availablePool: [...model.availablePool, msg.part],
      };
    }
    case "SubmitAnswer": {
      if (tag !== "Playing" || model.selectedSequence.length === 0) return model;
      const q = model.questions[model.currentIndex];
      const checkRes = checkSequence(model.selectedSequence, q.correctSequence);
      const isSuccess = checkRes.isSuccess;
      return {
        ...model,
        score: model.score + (isSuccess ? 1 : -1),
        state: { tag: "AnswerChecked", isSuccess, isEnglishOrder: checkRes.isEnglishOrder },
      };
    }
    case "NextQuestion": {
      if (tag !== "AnswerChecked" || !model.state.isSuccess) return model;
      const next = model.currentIndex + 1;
      if (next >= model.questions.length)
        return { ...model, state: { tag: "Finished" } };
      return loadQuestion(model, next);
    }
    case "RetryQuestion": {
      if (tag !== "AnswerChecked" || model.state.isSuccess) return model;
      return loadQuestion(model, model.currentIndex);
    }
    case "ResetGame": {
      const reshuffled = shuffle(model.questions);
      return init(reshuffled);
    }
    case "SetQuestions":
      return init(msg.questions);
    default:
      return model;
  }
}

function MorphemeChip({ part, onClick, tr, language, dimmed = false }) {
  const meta = PART_META[part.partType] ?? PART_META.root;
  const rawMeaning =
    typeof part.meaning === "string"
      ? part.meaning
      : (language === "en" ? (part.meaning?.en || part.meaning?.tr) : (part.meaning?.tr || part.meaning?.en)) ?? "";

  const meaning = rawMeaning
    ? rawMeaning.charAt(0).toLocaleUpperCase(language === "tr" ? "tr-TR" : "en-US") + rawMeaning.slice(1)
    : "";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${part.text} — ${meaning}`}
      className={`group flex flex-col items-start gap-1 rounded-xl border px-3.5 py-2 text-left
        transition-all duration-150 hover:scale-[1.03] active:scale-95 shadow-sm
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
        ${meta.chip} ${dimmed ? "opacity-60" : ""}`}
    >
      <div className="flex items-center justify-between w-full gap-2.5">
        <span className="font-mono text-base font-bold tracking-tight">
          {part.text}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-background/50 border border-current/15">
          <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
          {tr(part.partType)}
        </span>
      </div>
      <span className="text-xs font-semibold text-foreground/90 group-hover:text-foreground line-clamp-1">
        {meaning}
      </span>
    </button>
  );
}

export default function MorphemeGameFable({
  terms,
  onBack,
  language = "tr",
  t: tProp,
}) {
  const questions = useMemo(() => normalizeQuestions(terms), [terms]);

  const tr = useCallback(
    (key) => {
      if (typeof tProp === "function") {
        const v = tProp(`morphemeGame.${key}`);
        if (v && v !== `morphemeGame.${key}`) return v;
      }
      return STRINGS[language]?.[key] ?? STRINGS.tr[key] ?? key;
    },
    [tProp, language]
  );

  const loc = useCallback(
    (field) =>
      typeof field === "string" ? field : field?.[language] ?? field?.tr ?? "",
    [language]
  );

  const [model, dispatch] = useReducer(update, questions, init);
  const hasSavedRef = useRef(false);
  const [soundActive, setSoundActive] = useState(() => isSoundEnabled());

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
  };

  useEffect(() => {
    hasSavedRef.current = false;
    dispatch({ type: "SetQuestions", questions });
  }, [questions]);

  useEffect(() => {
    if (model.state.tag !== "AnswerChecked") return;
    if (model.state.isSuccess) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
    const timer = setTimeout(
      () =>
        dispatch(
          model.state.isSuccess
            ? { type: "NextQuestion" }
            : { type: "RetryQuestion" }
        ),
      model.state.isSuccess ? 1500 : 1400
    );
    return () => clearTimeout(timer);
  }, [model.state]);

  const q = model.questions[model.currentIndex];
  const total = model.questions.length;
  const isPlaying = model.state.tag === "Playing";
  const checked = model.state.tag === "AnswerChecked";
  const finished = model.state.tag === "Finished";
  const success = checked && model.state.isSuccess;
  const failure = checked && !model.state.isSuccess;

  // Save morpheme score upon completion
  useEffect(() => {
    if (finished && total > 0 && !hasSavedRef.current) {
      hasSavedRef.current = true;
      playVictorySound();
      const pct = Math.max(0, Math.min(100, Math.round((Math.max(0, model.score) / total) * 100)));
      saveMorphemeScore(model.score, total, pct);
      updateStreak();
    }
  }, [finished, total, model.score]);

  if (finished) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-3xl border border-border bg-card px-6 py-14 text-center text-card-foreground shadow-xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-primary/20">
          <Trophy aria-hidden="true" className="h-8 w-8 text-white"/>
        </div>
        <h2 className="text-2xl font-bold text-foreground">{tr("finishedTitle")}</h2>
        <p className="mt-2 text-muted-foreground">
          {tr("finalScore")}:{" "}
          <span
            className={`font-mono text-xl font-semibold ${
              model.score >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {model.score > 0 ? `+${model.score}` : model.score}
          </span>{" "}
          / {total}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              hasSavedRef.current = false;
              dispatch({ type: "SetQuestions", questions: normalizeQuestions(terms) });
            }}
            className="flex items-center gap-2 rounded-xl gradient-primary px-5 py-2.5 font-semibold text-primary-foreground transition hover:opacity-90 shadow-md shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4"/>
            {tr("playAgain")}
          </button>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-5 py-2.5 text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4"/>
              {tr("back")}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!q) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-3xl border border-border bg-card p-8 text-center text-muted-foreground shadow-xl">
        {tr("noQuestions")}
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl border border-border bg-card px-4 py-6 text-card-foreground sm:px-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-muted-foreground transition hover:text-foreground hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4"/>
            {tr("back")}
          </button>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-2">
          <Puzzle aria-hidden="true" className="h-4 w-4 text-primary"/>
          <span className="text-sm font-semibold text-foreground">{tr("gameTitle")}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundActive ? (language === "en" ? "Mute sound" : "Sesi kapat") : (language === "en" ? "Enable sound" : "Sesi aç")}
            className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            title={soundActive ? (language === "en" ? "Sound: ON" : "Ses Efektleri: Açık") : (language === "en" ? "Sound: OFF" : "Ses Efektleri: Kapalı")}
          >
            {soundActive ? (
              <Volume2 aria-hidden="true" className="h-4 w-4 text-primary" />
            ) : (
              <VolumeX aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          <div
            className={`rounded-full border px-3 py-1 font-mono text-sm font-medium ${
              model.score >= 0
                ? "border-border bg-muted text-foreground"
                : "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-300"
            }`}
            aria-live="polite"
          >
            {tr("score")}: {model.score > 0 ? `+${model.score}` : model.score}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
          <span>
            {tr("question")} {model.currentIndex + 1} / {total}
          </span>
          <span>{tr("gameSubtitle")}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full gradient-primary transition-all duration-500"
            style={{ width: `${((model.currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-border bg-muted/40 p-5">
        <p className="mb-1 text-[11px] uppercase tracking-widest text-primary font-semibold">
          {tr("targetTerm")}
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-1.5">
          <h2 className="font-serif text-3xl italic tracking-tight text-foreground">
            {q.targetLatinTerm}
          </h2>
          {q.englishTerm && q.englishTerm.toLowerCase() !== q.targetLatinTerm.toLowerCase() && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-sm font-semibold text-primary shadow-xs">
              <span className="text-xs">🇬🇧</span>
              <span>{q.englishTerm}</span>
            </div>
          )}
        </div>
        <p className="text-xs font-medium text-primary/80 mb-2">
          {language === "en"
            ? `Assemble the medical term: ${q.targetLatinTerm} (${q.englishTerm || q.targetLatinTerm})`
            : `Aşağıdaki morfem parçalarını birleştirerek ${q.targetLatinTerm} terimini oluşturun.`}
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">{loc(q.definition)}</p>
      </div>

      <div
        className={`mb-5 min-h-[96px] rounded-2xl border-2 border-dashed p-4 transition-colors duration-300 ${
          success
            ? "border-emerald-500/60 bg-emerald-500/5"
            : failure
            ? "border-rose-500/60 bg-rose-500/5"
            : "border-border bg-muted/20"
        }`}
      >
        <p className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
          {tr("builtTerm")}
        </p>

        {model.selectedSequence.length === 0 ? (
          <p className="text-sm text-muted-foreground">{tr("emptyHint")}</p>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            {model.selectedSequence.map((part, i) => (
              <React.Fragment key={part.id}>
                {i > 0 && (
                  <span className="text-muted-foreground/60" aria-hidden="true">
                    +
                  </span>
                )}
                <MorphemeChip
                  part={part}
                  tr={tr}
                  language={language}
                  dimmed={!isPlaying}
                  onClick={() => {
                    playTapSound();
                    dispatch({ type: "DeselectPart", part });
                  }}
                />
              </React.Fragment>
            ))}
            <ArrowRight aria-hidden="true" className="ml-1 h-4 w-4 text-muted-foreground flex-shrink-0"/>
            <div className="flex flex-col">
              <span className="font-mono text-lg font-semibold text-primary">
                {assembledPreview(model.selectedSequence)}
              </span>
              {assembledMeaningPreview(model.selectedSequence, language) && (
                <span className="text-xs text-muted-foreground font-medium">
                  ({assembledMeaningPreview(model.selectedSequence, language)})
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {success && (
        <div
          role="status"
          className="mb-5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3"
        >
          <p className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-300">
            <Check aria-hidden="true" className="h-5 w-5 text-emerald-500"/>
            {model.state?.isEnglishOrder
              ? (language === "en"
                  ? "Correct! Great sequence (English word order accepted). (+1)"
                  : "Doğru! Harika dizilim (İngilizce kelime sırası kabul edildi). (+1)")
              : `${tr("correctMsg")} (+1)`}
          </p>
          <p className="mt-1.5 text-sm text-emerald-900/80 dark:text-emerald-200/80">
            <span className="uppercase tracking-wide text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              {tr("analysis")}:{" "}
            </span>
            {q.correctSequence
              .map((p) => `${p.text} (${loc(p.meaning)})`)
              .join(" + ")}
          </p>
        </div>
      )}
      {failure && (
        <div
          role="alert"
          className="mb-5 flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 font-semibold text-rose-700 dark:text-rose-300"
        >
          <X aria-hidden="true" className="h-5 w-5 text-rose-500"/>
          {tr("wrongMsg")} (−1)
        </div>
      )}

      <div className="mb-6">
        <p className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
          {tr("pool")}
        </p>
        <div className="flex flex-wrap gap-2">
          {model.availablePool.map((part) => (
            <MorphemeChip
              key={part.id}
              part={part}
              tr={tr}
              language={language}
              dimmed={!isPlaying}
              onClick={() => {
                playTapSound();
                dispatch({ type: "SelectPart", part });
              }}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => dispatch({ type: "SubmitAnswer" })}
        disabled={!isPlaying || model.selectedSequence.length === 0}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
          ${
            isPlaying && model.selectedSequence.length > 0
              ? "gradient-primary text-primary-foreground hover:opacity-90 active:scale-[0.99] shadow-md shadow-primary/20"
              : "cursor-not-allowed bg-muted text-muted-foreground/60 border border-border"
          }`}
      >
        <Check aria-hidden="true" className="h-5 w-5"/>
        {tr("confirm")}
      </button>
    </div>
  );
}
