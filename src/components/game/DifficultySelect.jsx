import React, { useEffect, useRef, useState } from "react";
import { DIFFICULTY_CONFIG } from "../../game/sentences";

const ORDER = ["easy", "medium", "hard"];

export const DifficultySelect = ({ onSelect, muted, onToggleMute }) => {
  const [focusIdx, setFocusIdx] = useState(1); // start on medium
  const btnRefs = useRef({});

  useEffect(() => {
    const el = btnRefs.current[ORDER[focusIdx]];
    if (el) el.focus();
  }, [focusIdx]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setFocusIdx((i) => (i + 1) % ORDER.length);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusIdx((i) => (i - 1 + ORDER.length) % ORDER.length);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(ORDER[focusIdx]);
      } else if (["1", "2", "3"].includes(e.key)) {
        onSelect(ORDER[Number(e.key) - 1]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusIdx, onSelect]);

  return (
    <div className="screen screen--select" data-testid="difficulty-select-screen">
      <div className="screen__topbar">
        <div className="brand">
          <span className="brand__mark">▲</span>
          <span className="brand__name">TYPE FIGHTER</span>
        </div>
        <button
          className="ghost-btn"
          onClick={onToggleMute}
          data-testid="select-mute-button"
          aria-pressed={muted}
        >
          {muted ? "SOUND: OFF" : "SOUND: ON"}
        </button>
      </div>

      <div className="select__hero">
        <div className="select__eyebrow">
          <span className="pill">v1.0 // stickman duel</span>
        </div>
        <h1 className="select__title">
          <span className="glow">Type</span> to <span className="danger">strike.</span>
          <br />
          Type <span className="danger">faster</span> to survive.
        </h1>
        <p className="select__lede">
          A keyboard combat game. Every correctly typed word lands a punch.
          Every second you hesitate, the machine lands one back.
          <br />
          <span className="mono muted">
            [ ↑ / ↓ to browse — Enter to fight — Esc to exit mid-match ]
          </span>
        </p>
      </div>

      <ul className="difficulty-list" role="listbox" aria-label="Select difficulty">
        {ORDER.map((key, i) => {
          const cfg = DIFFICULTY_CONFIG[key];
          const active = focusIdx === i;
          return (
            <li key={key}>
              <button
                ref={(el) => (btnRefs.current[key] = el)}
                className={`diff-btn ${active ? "diff-btn--active" : ""} diff-btn--${key}`}
                onClick={() => onSelect(key)}
                onFocus={() => setFocusIdx(i)}
                data-testid={`difficulty-${key}-button`}
              >
                <div className="diff-btn__index">0{i + 1}</div>
                <div className="diff-btn__body">
                  <div className="diff-btn__label">{cfg.label}</div>
                  <div className="diff-btn__sub">{cfg.subtitle}</div>
                </div>
                <div className="diff-btn__meta">
                  <div><span className="muted">CPU-WPM</span> {cfg.computerWpm}</div>
                  <div><span className="muted">TICK</span> {(cfg.computerAttackMs / 1000).toFixed(1)}s</div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="select__footer">
        <span className="mono muted">
          &gt; best played on a physical keyboard. paste is disabled during matches.
        </span>
      </div>
    </div>
  );
};

export default DifficultySelect;
