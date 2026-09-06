// Browser localStorage utilities for user progress tracking
// All user-specific data is namespaced by user email to ensure data isolation
import { db } from '@/firebase/config';
import { doc, setDoc, deleteDoc, collection, query, where, getDocs, writeBatch } from 'firebase/firestore';

const STORAGE_KEYS = {
  USER: 'medterm_user',
  PROGRESS: 'medterm_progress',
  FLASHCARD_PROGRESS: 'medterm_flashcard',
  QUIZ_SCORES: 'medterm_quiz_scores',
  MATCH_SCORES: 'medterm_match_scores',
  MORPHEME_SCORES: 'medterm_morpheme_scores',
  STUDY_STREAK: 'medterm_streak'
};

// Helper function to generate user-specific storage keys
const getUserStorageKey = (baseKey) => {
  const user = getUser();
  if (!user || !user.email) {
    return `${baseKey}_guest`;
  }
  return `${baseKey}_${user.email}`;
};

// Guest 3-Day Trial Limit Utilities (Her iki paket için de 3 günlük misafir deneme süresi)
export const GUEST_TRIAL_DAYS = 3;
export const GUEST_TRIAL_MS = GUEST_TRIAL_DAYS * 24 * 60 * 60 * 1000;

export const getGuestTrialInfo = () => {
  let startTime = localStorage.getItem('medterm_guest_trial_start');
  if (!startTime) {
    startTime = Date.now().toString();
    localStorage.setItem('medterm_guest_trial_start', startTime);
  }

  const startMs = parseInt(startTime, 10) || Date.now();
  const elapsedMs = Math.max(0, Date.now() - startMs);
  const remainingMs = Math.max(0, GUEST_TRIAL_MS - elapsedMs);
  const isExpired = remainingMs <= 0;

  const daysLeft = Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
  const hoursLeft = Math.ceil(remainingMs / (60 * 60 * 1000));

  return {
    startMs,
    remainingMs,
    isExpired,
    daysLeft,
    hoursLeft
  };
};

export const canGuestPlay = () => {
  if (isLoggedIn()) return true;
  const trial = getGuestTrialInfo();
  return !trial.isExpired;
};

export const getGuestRemainingPlays = () => {
  if (isLoggedIn()) return Infinity;
  const trial = getGuestTrialInfo();
  return trial.daysLeft;
};

export const incrementGuestPlay = () => {
  return canGuestPlay();
};

// User management
export const saveUser = (userData) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
};

export const getUser = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
};

export const isLoggedIn = () => {
  return getUser() !== null;
};

export const logout = () => {
  // Clear local progress cache for the logged out user
  const progressKey = getUserStorageKey(STORAGE_KEYS.PROGRESS);
  if (progressKey) {
    localStorage.removeItem(progressKey);
  }
  
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Permanently delete all user progress and scores from Firestore and LocalStorage
export const clearAllUserData = async (currentUser) => {
  const user = currentUser || getUser();
  const uid = user?.uid;
  const email = user?.email;

  // 1. Delete all user_progress documents in Firestore for both UID and Email identifiers
  const identifiers = Array.from(new Set([uid, email].filter(Boolean)));
  for (const identifier of identifiers) {
    try {
      const progressRef = collection(db, 'user_progress');
      const q = query(progressRef, where('userId', '==', identifier));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        let batch = writeBatch(db);
        let opCount = 0;
        for (const docSnap of snapshot.docs) {
          batch.delete(docSnap.ref);
          opCount++;
          if (opCount % 400 === 0) {
            await batch.commit();
            batch = writeBatch(db);
          }
        }
        await batch.commit();
        console.log(`[Firestore] Deleted ${snapshot.size} user_progress documents for identifier: ${identifier}`);
      }
    } catch (err) {
      console.error('[Firestore] Error deleting user progress for:', identifier, err);
    }
  }

  // 2. Clear all user namespaced keys from localStorage
  if (email) {
    Object.values(STORAGE_KEYS).forEach((baseKey) => {
      localStorage.removeItem(`${baseKey}_${email}`);
    });
  }
  if (uid) {
    Object.values(STORAGE_KEYS).forEach((baseKey) => {
      localStorage.removeItem(`${baseKey}_${uid}`);
    });
  }
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem('user_preferences');

  // Also remove guest keys if any
  Object.values(STORAGE_KEYS).forEach((baseKey) => {
    localStorage.removeItem(`${baseKey}_guest`);
  });
};

// Progress tracking
export const saveProgress = async (termId, isLearned) => {
  const key = getUserStorageKey(STORAGE_KEYS.PROGRESS);
  if (!key) return; // Fallback

  const user = getUser();
  const userIdentifier = user ? (user.uid || user.email) : null;

  // 1. Update local storage cache immediately for fast UI feedback
  const progress = getProgress();
  progress[termId] = {
    learned: isLearned,
    lastReviewed: new Date().toISOString(),
    reviewCount: (progress[termId]?.reviewCount || 0) + 1
  };
  localStorage.setItem(key, JSON.stringify(progress));

  // 2. Synchronize to Firestore in the background (only if user logged in)
  if (userIdentifier) {
    try {
      const docId = `${userIdentifier}_${termId}`;
      const progressDocRef = doc(db, 'user_progress', docId);

      if (isLearned) {
        await setDoc(progressDocRef, {
          userId: userIdentifier,
          termId: termId,
          status: 'learned',
          lastReviewed: new Date().toISOString(),
          reviewCount: progress[termId].reviewCount
        });
      } else {
        await deleteDoc(progressDocRef);
      }
    } catch (error) {
      console.error('Error syncing progress to Firestore:', error);
    }
  }
};

// Synchronize progress from Firestore back into localStorage
export const syncProgressFromFirestore = async () => {
  const user = getUser();
  if (!user) return;
  const userIdentifier = user.uid || user.email;

  try {
    const progressRef = collection(db, 'user_progress');
    const q = query(progressRef, where('userId', '==', userIdentifier));
    const querySnapshot = await getDocs(q);

    const progress = {};
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.status === 'learned') {
        progress[data.termId] = {
          learned: true,
          lastReviewed: data.lastReviewed || new Date().toISOString(),
          reviewCount: data.reviewCount || 1
        };
      }
    });

    const key = getUserStorageKey(STORAGE_KEYS.PROGRESS);
    if (key) {
      localStorage.setItem(key, JSON.stringify(progress));
    }
    console.log('User progress successfully synchronized from Firestore.');
  } catch (error) {
    console.error('Error syncing progress from Firestore:', error);
  }
};

export const getProgress = () => {
  const key = getUserStorageKey(STORAGE_KEYS.PROGRESS);
  if (!key) return {}; // No user logged in

  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};

export const getTermProgress = (termId) => {
  const progress = getProgress();
  return progress[termId] || { learned: false, reviewCount: 0 };
};

export const getLearnedCount = () => {
  const progress = getProgress();
  return Object.values(progress).filter(p => p.learned).length;
};

// Flashcard progress
export const saveFlashcardSession = (categoryId, completedCount, totalCount) => {
  const key = getUserStorageKey(STORAGE_KEYS.FLASHCARD_PROGRESS);
  if (!key) return; // No user logged in

  const sessions = getFlashcardSessions();
  sessions.push({
    categoryId,
    completedCount,
    totalCount,
    date: new Date().toISOString()
  });
  localStorage.setItem(key, JSON.stringify(sessions));
};

export const getFlashcardSessions = () => {
  const key = getUserStorageKey(STORAGE_KEYS.FLASHCARD_PROGRESS);
  if (!key) return []; // No user logged in

  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Quiz scores
export const saveQuizScore = (categoryId, score, total) => {
  const key = getUserStorageKey(STORAGE_KEYS.QUIZ_SCORES);
  if (!key) return; // No user logged in

  const scores = getQuizScores();
  scores.push({
    categoryId,
    score,
    total,
    percentage: Math.round((score / total) * 100),
    date: new Date().toISOString()
  });
  localStorage.setItem(key, JSON.stringify(scores));
};

export const getQuizScores = () => {
  const key = getUserStorageKey(STORAGE_KEYS.QUIZ_SCORES);
  if (!key) return []; // No user logged in

  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const getAverageQuizScore = () => {
  const scores = getQuizScores();
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, s) => acc + s.percentage, 0);
  return Math.round(sum / scores.length);
};

// Match game scores
export const saveMatchScore = (categoryId, time, moves) => {
  const key = getUserStorageKey(STORAGE_KEYS.MATCH_SCORES);
  if (!key) return; // No user logged in

  const scores = getMatchScores();
  scores.push({
    categoryId,
    time,
    moves,
    date: new Date().toISOString()
  });
  localStorage.setItem(key, JSON.stringify(scores));
};

export const getMatchScores = () => {
  const key = getUserStorageKey(STORAGE_KEYS.MATCH_SCORES);
  if (!key) return []; // No user logged in

  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Morpheme game scores
export const saveMorphemeScore = (score, total, percentage) => {
  const key = getUserStorageKey(STORAGE_KEYS.MORPHEME_SCORES);
  if (!key) return;

  const scores = getMorphemeScores();
  scores.push({
    score,
    total,
    percentage,
    date: new Date().toISOString()
  });
  localStorage.setItem(key, JSON.stringify(scores));
};

export const getMorphemeScores = () => {
  const key = getUserStorageKey(STORAGE_KEYS.MORPHEME_SCORES);
  if (!key) return [];

  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Study streak
export const updateStreak = () => {
  const key = getUserStorageKey(STORAGE_KEYS.STUDY_STREAK);
  if (!key) return getStreak(); // No user logged in, return default

  const streak = getStreak();
  const today = new Date().toDateString();
  const lastStudy = streak.lastStudyDate ? new Date(streak.lastStudyDate).toDateString() : null;

  if (lastStudy === today) {
    // Already studied today
    return streak;
  }

  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastStudy === yesterday) {
    // Continuing streak
    streak.currentStreak += 1;
    streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
  } else {
    // Streak broken, start new
    streak.currentStreak = 1;
  }

  streak.lastStudyDate = new Date().toISOString();
  streak.totalDays += 1;

  localStorage.setItem(key, JSON.stringify(streak));
  return streak;
};

export const getStreak = () => {
  const key = getUserStorageKey(STORAGE_KEYS.STUDY_STREAK);
  if (!key) return { currentStreak: 0, longestStreak: 0, totalDays: 0, lastStudyDate: null };

  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0,
    lastStudyDate: null
  };
};

// Stats summary
export const getStats = () => {
  const progress = getProgress();
  const learnedCount = Object.values(progress).filter(p => p.learned).length;
  const totalReviews = Object.values(progress).reduce((acc, p) => acc + p.reviewCount, 0);
  const streak = getStreak();
  const quizAvg = getAverageQuizScore();
  const quizCount = getQuizScores().length;
  const matchCount = getMatchScores().length;

  return {
    learnedTerms: learnedCount,
    totalReviews,
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    averageQuizScore: quizAvg,
    quizzesTaken: quizCount,
    matchGamesPlayed: matchCount
  };
};