import React, { useEffect, useState } from "react";
import DifficultySelect from "./DifficultySelect";
import GameScreen from "./GameScreen";
import ResultScreen from "./ResultScreen";
import PortfolioLink from "./PortfolioLink";
import { useTypeFighter } from "../../game/useTypeFighter";
import { unlockAudio } from "../../game/audio";

const TouchWarning = ({ onDismiss }) => (
  <div className="touch-warning" data-testid="touch-warning">
    <div className="touch-warning__card">
      <h2 className="touch-warning__title">Best on desktop</h2>
      <p className="touch-warning__body mono">
        Type Fighter is a keyboard game. You can still poke around, but
        combat needs a real keyboard.
      </p>
      <button
        className="cta-btn"
        onClick={onDismiss}
        data-testid="touch-warning-dismiss"
      >
        GOT IT
      </button>
    </div>
  </div>
);

export default function TypeFighter({ onClose }) {
  const {
    state,
    stats,
    cfg,
    maxHp,
    startMatch,
    restart,
    backToSelect,
    togglePause,
    toggleMute,
  } = useTypeFighter();

  const [touchDismissed, setTouchDismissed] = useState(false);
  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
    window.innerWidth < 900;

  // Disable paste on the game screen (in case user still tries via input somewhere)
  useEffect(() => {
    const onPaste = (e) => {
      if (state.screen === "match") {
        e.preventDefault();
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [state.screen]);

  const handleSelect = (diff) => {
    unlockAudio();
    startMatch(diff);
  };

  return (
    <div className="tf-root" data-testid="type-fighter-root">
      <div className="tf-scanlines" aria-hidden />
      <div className="tf-grain" aria-hidden />

      {/* Portfolio-exit link — visible on every screen, positioned via CSS fixed.
          onNavigate closes the modal (this is embedded on the same page,
          not a separate route), falling back to default anchor nav if
          onClose wasn't passed for some reason. */}
      <PortfolioLink href="/" onNavigate={onClose} />

      {state.screen === "select" && (
        <DifficultySelect
          onSelect={handleSelect}
          muted={state.muted}
          onToggleMute={toggleMute}
        />
      )}

      {state.screen === "match" && (
        <GameScreen
          state={state}
          stats={stats}
          cfg={cfg}
          maxHp={maxHp}
          onTogglePause={togglePause}
          onRestart={restart}
          onBack={backToSelect}
          onToggleMute={toggleMute}
        />
      )}

      {state.screen === "result" && (
        <ResultScreen
          state={state}
          stats={stats}
          onPlayAgain={restart}
          onChangeDifficulty={backToSelect}
        />
      )}

      {isTouch && !touchDismissed && (
        <TouchWarning onDismiss={() => setTouchDismissed(true)} />
      )}
    </div>
  );
}
