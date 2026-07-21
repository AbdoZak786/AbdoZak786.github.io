import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import React from "react";
import { DIFFICULTY_CONFIG, buildQueue } from "./sentences";
import { sfx } from "./audio";

// --------- constants & helpers ---------
const MAX_HP = 100;
const BASE_WORD_DAMAGE = 5;

const nowMs = () => performance.now();

const initState = () => ({
  screen: "select", // 'select' | 'match' | 'result'
  difficulty: null,
  queue: [],
  currentIdx: 0,
  currentSentence: "",
  typed: "", // full typed string of current sentence
  wordsCompletedInSentence: 0,
  totalWordsCompleted: 0,
  correctKeystrokes: 0,
  totalKeystrokes: 0,
  playerHp: MAX_HP,
  computerHp: MAX_HP,
  playerAnim: "idle", // 'idle' | 'attack' | 'hit'
  computerAnim: "idle",
  combo: 0,
  bestCombo: 0,
  paused: false,
  muted: true,
  startedAt: null,
  endedAt: null,
  result: null, // 'win' | 'lose'
  lastHitTs: 0,
  shakeToken: 0, // increment triggers screen-shake CSS animation restart
  hitFlashPlayer: 0,
  hitFlashComputer: 0,
  lastComboToast: null,
});

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MUTE":
      return { ...state, muted: !state.muted };

    case "START_MATCH": {
      const queue = buildQueue(action.difficulty, DIFFICULTY_CONFIG[action.difficulty].sentenceCount);
      return {
        ...initState(),
        muted: state.muted,
        screen: "match",
        difficulty: action.difficulty,
        queue,
        currentIdx: 0,
        currentSentence: queue[0] || "",
        startedAt: nowMs(),
      };
    }

    case "RESTART":
      return reducer(state, { type: "START_MATCH", difficulty: state.difficulty });

    case "BACK_TO_SELECT":
      return { ...initState(), muted: state.muted };

    case "SET_PAUSED":
      return { ...state, paused: action.value };

    case "SET_ANIM":
      return { ...state, [action.who + "Anim"]: action.anim };

    case "PLAYER_TYPE_CHAR": {
      if (state.paused || state.screen !== "match") return state;
      const { char } = action;
      const target = state.currentSentence;
      const next = state.typed + char;
      const expected = target[state.typed.length];
      const isCorrect = char === expected;

      let newState = {
        ...state,
        typed: next,
        totalKeystrokes: state.totalKeystrokes + 1,
        correctKeystrokes: state.correctKeystrokes + (isCorrect ? 1 : 0),
      };

      // If a mistake was made, break combo & don't count this as advancing.
      if (!isCorrect) {
        newState.combo = 0;
      }

      // Check if a word just completed. A word is completed when we correctly
      // type either a space (word boundary) OR the final character of the sentence.
      const typedLen = next.length;
      const atEnd = typedLen === target.length;
      const typedMatches = target.startsWith(next);
      const wordJustCompleted =
        typedMatches && (char === " " || atEnd) && isCorrect;

      if (wordJustCompleted) {
        // Compute WPM at this moment for damage scaling.
        const elapsedMin = Math.max((nowMs() - state.startedAt) / 60000, 0.01);
        const wordsSoFar = state.totalWordsCompleted + 1;
        const liveWpm = wordsSoFar / elapsedMin;
        const speedBonus = Math.min(liveWpm / 20, 4);
        const combo = state.combo + 1;
        const comboMult = Math.min(1 + combo * 0.08, 2);
        const damage = Math.round((BASE_WORD_DAMAGE + speedBonus) * comboMult);

        newState.combo = combo;
        newState.bestCombo = Math.max(state.bestCombo, combo);
        newState.totalWordsCompleted = wordsSoFar;
        newState.wordsCompletedInSentence = state.wordsCompletedInSentence + 1;
        newState.playerAnim = "attack";
        newState.computerHp = Math.max(0, state.computerHp - damage);
        newState.hitFlashComputer = state.hitFlashComputer + 1;
        newState.lastComboToast = combo >= 3 ? { combo, ts: nowMs() } : state.lastComboToast;
      }

      // Sentence fully typed correctly?
      if (atEnd && typedMatches) {
        const nextIdx = state.currentIdx + 1;
        if (nextIdx >= state.queue.length) {
          // Player cleared the queue. Match may end (win) but only if computer isn't already at 0.
          // We resolve win/lose in the effect layer based on hp; here we just clear sentence.
          newState.currentIdx = nextIdx;
          newState.currentSentence = "";
          newState.typed = "";
          newState.wordsCompletedInSentence = 0;
        } else {
          newState.currentIdx = nextIdx;
          newState.currentSentence = state.queue[nextIdx];
          newState.typed = "";
          newState.wordsCompletedInSentence = 0;
        }
      }

      return newState;
    }

    case "PLAYER_BACKSPACE": {
      if (state.paused || state.screen !== "match" || state.typed.length === 0) return state;
      return { ...state, typed: state.typed.slice(0, -1) };
    }

    case "COMPUTER_ATTACK": {
      if (state.paused || state.screen !== "match") return state;
      const cfg = DIFFICULTY_CONFIG[state.difficulty];
      const dmg = cfg.computerDamage;
      const newHp = Math.max(0, state.playerHp - dmg);
      return {
        ...state,
        playerHp: newHp,
        computerAnim: "attack",
        playerAnim: "hit",
        shakeToken: state.shakeToken + 1,
        hitFlashPlayer: state.hitFlashPlayer + 1,
        // combo is tied to typing streak, not to taking hits — leave unchanged.
      };
    }

    case "END_MATCH":
      return {
        ...state,
        screen: "result",
        result: action.result,
        endedAt: nowMs(),
        paused: false,
      };

    default:
      return state;
  }
}

// Correction: combo should NOT reset when player takes a hit — combo is about
// typing streak. Fix by not touching combo in COMPUTER_ATTACK.
// (Left the field in state for clarity but we don't reset it.)

export function useTypeFighter() {
  const [state, dispatch] = useReducer(reducer, undefined, initState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const cfg = state.difficulty ? DIFFICULTY_CONFIG[state.difficulty] : null;

  // ---------- Actions ----------
  const startMatch = useCallback((difficulty) => {
    dispatch({ type: "START_MATCH", difficulty });
  }, []);

  const restart = useCallback(() => dispatch({ type: "RESTART" }), []);
  const backToSelect = useCallback(() => dispatch({ type: "BACK_TO_SELECT" }), []);
  const togglePause = useCallback(() => {
    dispatch({ type: "SET_PAUSED", value: !stateRef.current.paused });
  }, []);
  const setPaused = useCallback((v) => dispatch({ type: "SET_PAUSED", value: v }), []);
  const toggleMute = useCallback(() => dispatch({ type: "TOGGLE_MUTE" }), []);

  // ---------- Keyboard input ----------
  useEffect(() => {
    const onKey = (e) => {
      const s = stateRef.current;
      // Global keys
      if (e.key === "Escape") {
        if (s.screen === "match" || s.screen === "result") {
          e.preventDefault();
          dispatch({ type: "BACK_TO_SELECT" });
        }
        return;
      }

      if (s.screen === "select") {
        // Space/Enter — do nothing at this level (buttons handle their own focus).
        return;
      }

      if (s.screen !== "match") return;

      // Ignore modifier combos (Ctrl/Cmd/Alt+X), but allow shift for capitals.
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        dispatch({ type: "PLAYER_BACKSPACE" });
        return;
      }

      // Space needs preventDefault to avoid page scroll.
      if (e.key === " ") e.preventDefault();

      // Only accept single printable characters.
      if (e.key.length === 1) {
        if (s.paused) return;
        // Dev-mode logging so testers can verify each keystroke's judgement.
        if (process.env.NODE_ENV !== "production") {
          const expected = s.currentSentence[s.typed.length];
          const correct = e.key === expected;
          // eslint-disable-next-line no-console
          console.log(
            `[TypeFighter] key='${e.key}' expected='${expected ?? "∅"}' → ${correct ? "OK" : "TYPO"} | pos=${s.typed.length} combo=${correct ? s.combo : 0}`,
          );
        }
        dispatch({ type: "PLAYER_TYPE_CHAR", char: e.key });
        // sfx keystroke is handled in a side effect below by watching typed length
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ---------- Sound effects ----------
  const prevTypedRef = useRef("");
  const prevWordsRef = useRef(0);
  const prevPlayerHpRef = useRef(MAX_HP);
  const prevComputerHpRef = useRef(MAX_HP);
  const prevComboRef = useRef(0);
  useEffect(() => {
    // Detect keystroke vs typo by comparing typed length delta.
    if (state.screen !== "match") {
      prevTypedRef.current = "";
      prevWordsRef.current = 0;
      prevPlayerHpRef.current = MAX_HP;
      prevComputerHpRef.current = MAX_HP;
      prevComboRef.current = 0;
      return;
    }

    // Keystroke sound whenever typed grew by one (correct or typo — differentiate by mismatch)
    if (state.typed.length > prevTypedRef.current.length) {
      const idx = state.typed.length - 1;
      const expected = state.currentSentence[idx];
      const typed = state.typed[idx];
      if (typed && expected && typed === expected) {
        sfx.keystroke(state.muted);
      } else if (typed && expected && typed !== expected) {
        sfx.typo(state.muted);
      } else if (typed && !expected) {
        // Typed past the sentence — treat as typo.
        sfx.typo(state.muted);
      }
    }

    if (state.totalWordsCompleted > prevWordsRef.current) {
      sfx.playerHit(state.muted);
      if (state.combo >= 3 && state.combo > prevComboRef.current) {
        sfx.combo(state.muted, state.combo);
      }
    }

    if (state.playerHp < prevPlayerHpRef.current) {
      sfx.computerHit(state.muted);
    }

    prevTypedRef.current = state.typed;
    prevWordsRef.current = state.totalWordsCompleted;
    prevPlayerHpRef.current = state.playerHp;
    prevComputerHpRef.current = state.computerHp;
    prevComboRef.current = state.combo;
  }, [state.typed, state.totalWordsCompleted, state.playerHp, state.computerHp, state.combo, state.currentSentence, state.muted, state.screen]);

  // ---------- Animation resets ----------
  useEffect(() => {
    if (state.playerAnim === "attack" || state.playerAnim === "hit") {
      const t = setTimeout(() => dispatch({ type: "SET_ANIM", who: "player", anim: "idle" }), 260);
      return () => clearTimeout(t);
    }
  }, [state.playerAnim, state.hitFlashPlayer, state.totalWordsCompleted]);

  useEffect(() => {
    if (state.computerAnim === "attack" || state.computerAnim === "hit") {
      const t = setTimeout(() => dispatch({ type: "SET_ANIM", who: "computer", anim: "idle" }), 260);
      return () => clearTimeout(t);
    }
  }, [state.computerAnim, state.hitFlashComputer]);

  // ---------- Computer attack timer ----------
  useEffect(() => {
    if (state.screen !== "match" || state.paused || !cfg) return;
    if (state.playerHp <= 0 || state.computerHp <= 0) return;
    if (state.currentIdx >= state.queue.length) return; // player finished all sentences — no more incoming
    const interval = setInterval(() => {
      dispatch({ type: "COMPUTER_ATTACK" });
    }, cfg.computerAttackMs);
    return () => clearInterval(interval);
  }, [state.screen, state.paused, state.playerHp, state.computerHp, state.currentIdx, state.queue.length, cfg]);

  // Trigger computer 'hit' pose when hp drops.
  useEffect(() => {
    if (state.computerHp < MAX_HP && state.computerHp > 0) {
      dispatch({ type: "SET_ANIM", who: "computer", anim: "hit" });
    }
  }, [state.hitFlashComputer, state.computerHp]);

  // ---------- End-of-match detection ----------
  useEffect(() => {
    if (state.screen !== "match") return;
    if (state.playerHp <= 0) {
      sfx.lose(state.muted);
      dispatch({ type: "END_MATCH", result: "lose" });
    } else if (state.computerHp <= 0) {
      sfx.win(state.muted);
      dispatch({ type: "END_MATCH", result: "win" });
    } else if (state.currentIdx >= state.queue.length && state.queue.length > 0) {
      // Player cleared queue while still alive → win.
      sfx.win(state.muted);
      dispatch({ type: "END_MATCH", result: "win" });
    }
  }, [state.playerHp, state.computerHp, state.currentIdx, state.queue.length, state.screen, state.muted]);

  // ---------- Live tick (drives HUD time & WPM even when idle) ----------
  const [tick, setTick] = React.useState(0);
  useEffect(() => {
    if (state.screen !== "match" || state.paused) return;
    const id = setInterval(() => setTick((t) => t + 1), 250);
    return () => clearInterval(id);
  }, [state.screen, state.paused]);

  // ---------- Derived stats ----------
  const stats = useMemo(() => {
    const now = state.endedAt || nowMs();
    const elapsedMs = state.startedAt ? now - state.startedAt : 0;
    const elapsedMin = Math.max(elapsedMs / 60000, 0.0001);
    const wpm = state.totalWordsCompleted / elapsedMin;
    const accuracy = state.totalKeystrokes > 0
      ? (state.correctKeystrokes / state.totalKeystrokes) * 100
      : 100;
    return {
      wpm: Math.round(wpm) || 0,
      accuracy: Math.round(accuracy),
      elapsedMs,
      elapsedLabel: formatTime(elapsedMs),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.totalWordsCompleted, state.totalKeystrokes, state.correctKeystrokes, state.startedAt, state.endedAt, tick]);

  return {
    state,
    stats,
    cfg,
    maxHp: MAX_HP,
    startMatch,
    restart,
    backToSelect,
    togglePause,
    setPaused,
    toggleMute,
  };
}

function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
