import React, { useEffect } from "react";
import { DIFFICULTY_CONFIG } from "../../game/sentences";

export const ResultScreen = ({ state, stats, onPlayAgain, onChangeDifficulty }) => {
  const won = state.result === "win";
  const cfg = state.difficulty ? DIFFICULTY_CONFIG[state.difficulty] : null;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPlayAgain();
      } else if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        onChangeDifficulty();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onPlayAgain, onChangeDifficulty]);

  return (
    <div
      className={`screen screen--result screen--result-${won ? "win" : "lose"}`}
      data-testid="result-screen"
    >
      <div className="result__eyebrow mono">
        &gt; match complete · difficulty: {cfg?.label || "—"}
      </div>
      <h1 className={`result__title ${won ? "glow" : "danger"}`} data-testid="result-title">
        {won ? "VICTORY" : "DEFEATED"}
      </h1>
      <p className="result__sub mono muted">
        {won
          ? "the machine yielded. your fingers wrote the last word."
          : "the machine wrote faster. try to hit back harder."}
      </p>

      <div className="result__stats">
        <ResultStat label="WPM" value={stats.wpm} testId="result-wpm" />
        <ResultStat label="ACCURACY" value={`${stats.accuracy}%`} testId="result-accuracy" />
        <ResultStat label="TIME" value={stats.elapsedLabel} testId="result-time" />
        <ResultStat label="BEST COMBO" value={`×${state.bestCombo}`} testId="result-combo" />
      </div>

      <div className="result__actions">
        <button
          className="cta-btn cta-btn--primary"
          onClick={onPlayAgain}
          data-testid="result-play-again-button"
        >
          PLAY AGAIN · <span className="mono muted">↵</span>
        </button>
        <button
          className="cta-btn"
          onClick={onChangeDifficulty}
          data-testid="result-change-difficulty-button"
        >
          CHANGE DIFFICULTY · <span className="mono muted">C · Esc</span>
        </button>
      </div>
    </div>
  );
};

const ResultStat = ({ label, value, testId }) => (
  <div className="result-stat" data-testid={testId}>
    <div className="result-stat__value">{value}</div>
    <div className="result-stat__label mono muted">{label}</div>
  </div>
);

export default ResultScreen;
