import React, { useEffect, useRef } from "react";
import Stickman from "./Stickman";
import HealthBar from "./HealthBar";
import SentenceDisplay from "./SentenceDisplay";
import HUD from "./HUD";

export const GameScreen = ({
  state,
  stats,
  cfg,
  maxHp,
  onTogglePause,
  onRestart,
  onBack,
  onToggleMute,
}) => {
  const arenaRef = useRef(null);
  const prevShakeRef = useRef(0);
  const prevPlayerFlashRef = useRef(0);
  const prevComputerFlashRef = useRef(0);

  // Trigger screen-shake class toggling by re-adding it on shakeToken change.
  useEffect(() => {
    if (state.shakeToken === prevShakeRef.current) return;
    prevShakeRef.current = state.shakeToken;
    const el = arenaRef.current;
    if (!el) return;
    el.classList.remove("arena--shake");
    // Force reflow so animation restarts
    // eslint-disable-next-line no-unused-expressions
    void el.offsetWidth;
    el.classList.add("arena--shake");
    const t = setTimeout(() => el.classList.remove("arena--shake"), 320);
    return () => clearTimeout(t);
  }, [state.shakeToken]);

  const totalSentences = state.queue.length;
  const currentSentenceNumber = Math.min(state.currentIdx + 1, totalSentences);

  return (
    <div className="screen screen--match" data-testid="game-screen">
      <div className="match__topbar">
        <HealthBar
          value={state.playerHp}
          max={maxHp}
          label="PLAYER"
          side="left"
          testId="player-health-bar"
        />
        <div className="match__vs">
          <div className="match__vs-title mono">
            {cfg?.label?.toUpperCase()} · {currentSentenceNumber}/{totalSentences}
          </div>
          <div className="match__vs-sub mono muted">— VS —</div>
        </div>
        <HealthBar
          value={state.computerHp}
          max={maxHp}
          label="CPU"
          side="right"
          testId="computer-health-bar"
        />
      </div>

      <div className="arena" ref={arenaRef} data-testid="arena">
        <div
          className={`arena__hit-flash arena__hit-flash--player ${state.playerAnim === "hit" ? "is-on" : ""}`}
          aria-hidden
        />
        <div
          className={`arena__hit-flash arena__hit-flash--computer ${state.computerAnim === "hit" ? "is-on" : ""}`}
          aria-hidden
        />

        <div className="arena__side arena__side--left">
          <div className="arena__bubble" data-testid="sentence-bubble">
            {state.currentSentence ? (
              <SentenceDisplay
                target={state.currentSentence}
                typed={state.typed}
                testId="sentence-display"
              />
            ) : (
              <div className="sentence-display sentence-display--finished mono">
                &gt; queue cleared. finishing them off...
              </div>
            )}
            {state.combo >= 3 && (
              <div className="combo-flag mono" data-testid="combo-flag">
                ×{state.combo} COMBO
              </div>
            )}
          </div>
          <div className="arena__stage arena__stage--player">
            <Stickman
              pose={state.playerAnim}
              facing="right"
              color="var(--accent)"
              testId="player-stickman"
              size={320}
            />
            <div className="arena__ground" />
          </div>
        </div>

        <div className="arena__side arena__side--right">
          <div className="arena__bubble arena__bubble--cpu mono muted">
            <span className="cpu-label">CPU_v{cfg?.computerWpm || "??"}</span>
            <span className="cpu-tick">tick {(cfg?.computerAttackMs / 1000).toFixed(1)}s</span>
          </div>
          <div className="arena__stage arena__stage--computer">
            <Stickman
              pose={state.computerAnim}
              facing="left"
              color="var(--danger)"
              testId="computer-stickman"
              size={320}
            />
            <div className="arena__ground" />
          </div>
        </div>

        {state.paused && (
          <div className="arena__paused" data-testid="paused-overlay">
            <div className="arena__paused-inner">
              <div className="arena__paused-title">PAUSED</div>
              <button
                className="ghost-btn"
                onClick={onTogglePause}
                data-testid="paused-resume-button"
              >
                RESUME · ⌨
              </button>
            </div>
          </div>
        )}
      </div>

      <HUD
        wpm={stats.wpm}
        accuracy={stats.accuracy}
        combo={state.combo}
        elapsedLabel={stats.elapsedLabel}
        paused={state.paused}
        muted={state.muted}
        onTogglePause={onTogglePause}
        onRestart={onRestart}
        onBack={onBack}
        onToggleMute={onToggleMute}
      />
    </div>
  );
};

export default GameScreen;
