// Lightweight Web Audio API synth for game sounds. No external assets.
// All sounds are short procedural bleeps/thuds so we stay portable.

let ctx = null;

const getCtx = () => {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
};

const tone = (
  { freq = 440, type = "square", dur = 0.08, gain = 0.08, sweepTo = null, delay = 0 } = {},
) => {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (sweepTo != null) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(sweepTo, 1), t0 + dur);
  }
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
};

const noise = ({ dur = 0.12, gain = 0.08, delay = 0 } = {}) => {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const bufferSize = Math.max(1, Math.floor(c.sampleRate * dur));
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  const src = c.createBufferSource();
  src.buffer = buffer;
  const g = c.createGain();
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(g).connect(c.destination);
  src.start(t0);
  src.stop(t0 + dur + 0.02);
};

export const sfx = {
  keystroke: (muted) => {
    if (muted) return;
    tone({ freq: 1200, type: "square", dur: 0.02, gain: 0.02 });
  },
  typo: (muted) => {
    if (muted) return;
    tone({ freq: 180, type: "sawtooth", dur: 0.08, gain: 0.05, sweepTo: 90 });
  },
  playerHit: (muted) => {
    if (muted) return;
    tone({ freq: 520, type: "square", dur: 0.06, gain: 0.07, sweepTo: 220 });
    noise({ dur: 0.08, gain: 0.05, delay: 0.02 });
  },
  computerHit: (muted) => {
    if (muted) return;
    tone({ freq: 120, type: "sawtooth", dur: 0.12, gain: 0.09, sweepTo: 60 });
    noise({ dur: 0.14, gain: 0.06 });
  },
  combo: (muted, streak) => {
    if (muted) return;
    const base = 660 + Math.min(streak, 12) * 40;
    tone({ freq: base, type: "triangle", dur: 0.09, gain: 0.06 });
    tone({ freq: base * 1.5, type: "triangle", dur: 0.09, gain: 0.04, delay: 0.03 });
  },
  win: (muted) => {
    if (muted) return;
    [523, 659, 784, 1046].forEach((f, i) =>
      tone({ freq: f, type: "triangle", dur: 0.14, gain: 0.09, delay: i * 0.09 }),
    );
  },
  lose: (muted) => {
    if (muted) return;
    [392, 330, 262, 196].forEach((f, i) =>
      tone({ freq: f, type: "sawtooth", dur: 0.2, gain: 0.09, delay: i * 0.12 }),
    );
  },
};

// Called from a user gesture to unlock audio context on browsers that require it.
export const unlockAudio = () => {
  getCtx();
};
