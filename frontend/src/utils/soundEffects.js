/**
 * HealthLexMed — Web Audio Synthesizer for Gamified Learning
 * Pure Web Audio API: 0 KB network assets, 0ms latency, zero dependencies.
 */

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

const STORAGE_KEY = 'healthlex_sound_enabled';

export function isSoundEnabled() {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === null ? true : stored === 'true';
}

export function setSoundEnabled(enabled) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
}

/**
 * Plays a pleasant, ascending harmonic chord (Duolingo / Apple style) for correct answer.
 */
export function playCorrectSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 523.25, time: 0.0, dur: 0.18 }, // C5
    { freq: 659.25, time: 0.1, dur: 0.22 }, // E5
    { freq: 783.99, time: 0.2, dur: 0.35 }, // G5
  ];

  const now = ctx.currentTime;

  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + time);

    // Subtle vibrato/sweetening
    gain.gain.setValueAtTime(0.0001, now + time);
    gain.gain.exponentialRampToValueAtTime(0.22, now + time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + dur);
  });
}

/**
 * Plays a soft, low double tone for wrong answer (gentle, not jarring).
 */
export function playWrongSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 240, time: 0.0, dur: 0.12 },
    { freq: 190, time: 0.13, dur: 0.22 }
  ];

  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(0.0001, now + time);
    gain.gain.exponentialRampToValueAtTime(0.18, now + time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + dur);
  });
}

/**
 * Plays a crisp, subtle mechanical tap when selecting or removing a morpheme chip.
 */
export function playTapSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(750, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
}

/**
 * Plays a joyful victory fanfare upon completing the round.
 */
export function playVictorySound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 523.25, time: 0.0, dur: 0.15 }, // C5
    { freq: 659.25, time: 0.12, dur: 0.15 }, // E5
    { freq: 783.99, time: 0.24, dur: 0.18 }, // G5
    { freq: 1046.5, time: 0.40, dur: 0.50 }  // C6 (bright finish)
  ];

  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(0.0001, now + time);
    gain.gain.exponentialRampToValueAtTime(0.25, now + time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + dur);
  });
}
