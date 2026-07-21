import React from "react";

/**
 * Stickman renders as SVG with three poses controlled by `pose` prop.
 * Strokes use `currentColor` so parent can theme via CSS variable / color prop.
 * `facing = 'right' | 'left'` mirrors the figure horizontally.
 */
export const Stickman = ({ pose = "idle", facing = "right", color, testId, size = 220 }) => {
  const mirror = facing === "left" ? -1 : 1;
  const style = { color };

  return (
    <div
      data-testid={testId}
      data-pose={pose}
      className={`stickman stickman--${pose}`}
      style={style}
    >
      <svg
        viewBox="0 0 120 200"
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid meet"
        style={{ transform: `scaleX(${mirror})`, overflow: "visible" }}
      >
        <StickmanFigure pose={pose} />
      </svg>
    </div>
  );
};

const StickmanFigure = ({ pose }) => {
  // Common attributes
  const stroke = "currentColor";
  const strokeWidth = 4;
  const props = {
    stroke,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  };

  // Shared: head + torso
  const head = (
    <circle cx="60" cy="30" r="14" {...props} fill="none" />
  );
  const torso = <line x1="60" y1="44" x2="60" y2="110" {...props} />;

  if (pose === "attack") {
    // Punch forward (right-facing figure — arm extended to the right).
    return (
      <g>
        {head}
        {torso}
        {/* Front arm — extended punch */}
        <polyline points="60,60 92,58 112,52" {...props} />
        {/* Rear arm — pulled back */}
        <polyline points="60,60 44,70 34,84" {...props} />
        {/* Legs — split stance */}
        <polyline points="60,110 44,150 40,178" {...props} />
        <polyline points="60,110 82,148 92,178" {...props} />
        {/* Impact spark */}
        <g stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" fill="none">
          <line x1="112" y1="52" x2="122" y2="46" />
          <line x1="112" y1="52" x2="124" y2="54" />
          <line x1="112" y1="52" x2="120" y2="62" />
        </g>
      </g>
    );
  }

  if (pose === "hit") {
    // Recoiling backward — leaning back, arms up.
    return (
      <g transform="translate(-6,0) rotate(-8, 60, 100)">
        {head}
        {torso}
        {/* Both arms flung up/back */}
        <polyline points="60,60 40,42 26,28" {...props} />
        <polyline points="60,60 78,44 92,32" {...props} />
        {/* Legs — buckled */}
        <polyline points="60,110 46,142 38,176" {...props} />
        <polyline points="60,110 78,146 90,176" {...props} />
        {/* Pain marks near head */}
        <g stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" fill="none" opacity="0.85">
          <line x1="34" y1="10" x2="26" y2="4" />
          <line x1="38" y1="6" x2="34" y2="-2" />
        </g>
      </g>
    );
  }

  // idle
  return (
    <g className="stickman-idle-breath">
      {head}
      {torso}
      {/* Arms — relaxed, slight guard */}
      <polyline points="60,60 78,88 74,116" {...props} />
      <polyline points="60,60 42,86 48,114" {...props} />
      {/* Legs */}
      <polyline points="60,110 48,150 46,178" {...props} />
      <polyline points="60,110 74,150 76,178" {...props} />
    </g>
  );
};

export default Stickman;
