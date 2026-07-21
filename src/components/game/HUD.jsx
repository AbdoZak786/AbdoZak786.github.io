import React from "react";
import { Pause, Play, RotateCcw, Volume2, VolumeX, ArrowLeft } from "lucide-react";

export const HUD = ({
  wpm,
  accuracy,
  combo,
  elapsedLabel,
  paused,
  muted,
  onTogglePause,
  onRestart,
  onToggleMute,
  onBack,
}) => {
  const comboActive = combo >= 3;
  return (
    <div className="hud" data-testid="hud">
      <div className="hud__stats">
        <Stat label="WPM" value={wpm} testId="hud-wpm" />
        <Stat label="ACC" value={`${accuracy}%`} testId="hud-accuracy" />
        <Stat
          label="COMBO"
          value={`x${combo}`}
          testId="hud-combo"
          highlight={comboActive}
        />
        <Stat label="TIME" value={elapsedLabel} testId="hud-time" mono />
      </div>
      <div className="hud__controls">
        <button
          className="hud__btn"
          onClick={onBack}
          data-testid="hud-back-button"
          title="Back to difficulty select (Esc)"
        >
          <ArrowLeft size={16} />
          <span>Exit</span>
        </button>
        <button
          className="hud__btn"
          onClick={onTogglePause}
          data-testid="hud-pause-button"
          aria-pressed={paused}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
          <span>{paused ? "Resume" : "Pause"}</span>
        </button>
        <button
          className="hud__btn"
          onClick={onRestart}
          data-testid="hud-restart-button"
          title="Restart match"
        >
          <RotateCcw size={16} />
          <span>Restart</span>
        </button>
        <button
          className="hud__btn"
          onClick={onToggleMute}
          data-testid="hud-mute-button"
          aria-pressed={muted}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>{muted ? "Muted" : "Sound"}</span>
        </button>
      </div>
    </div>
  );
};

const Stat = ({ label, value, testId, highlight, mono }) => (
  <div
    className={`stat ${highlight ? "stat--hot" : ""} ${mono ? "stat--mono" : ""}`}
    data-testid={testId}
  >
    <div className="stat__label">{label}</div>
    <div className="stat__value">{value}</div>
  </div>
);

export default HUD;
