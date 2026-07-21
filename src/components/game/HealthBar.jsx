import React, { useEffect, useState } from "react";

/**
 * Two-layer health bar:
 *  - Front bar drops instantly to current value.
 *  - Trailing "damage chunk" bar delays 300ms then catches up, showing damage taken.
 */
export const HealthBar = ({ value, max = 100, label, side = "left", testId }) => {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const [trail, setTrail] = useState(pct);

  useEffect(() => {
    if (pct < trail) {
      const t = setTimeout(() => setTrail(pct), 320);
      return () => clearTimeout(t);
    }
    // Instant catch-up on heal / restart
    setTrail(pct);
  }, [pct]); // eslint-disable-line react-hooks/exhaustive-deps

  const lowHealth = pct < 30;

  return (
    <div
      className={`healthbar healthbar--${side} ${lowHealth ? "healthbar--low" : ""}`}
      data-testid={testId}
    >
      <div className="healthbar__label">
        <span className="healthbar__name">{label}</span>
        <span className="healthbar__value" data-testid={`${testId}-value`}>
          {Math.ceil(value)}/{max}
        </span>
      </div>
      <div className="healthbar__track">
        <div
          className="healthbar__trail"
          style={{ width: `${trail}%` }}
          aria-hidden
        />
        <div
          className="healthbar__fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default HealthBar;
