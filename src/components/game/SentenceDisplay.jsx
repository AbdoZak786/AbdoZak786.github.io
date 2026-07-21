import React from "react";

/**
 * Renders the current sentence with character-level colouring:
 *  - typed correctly → success
 *  - typo (typed[i] !== target[i]) → danger with red background
 *  - current cursor position → underlined block, amber
 *  - upcoming → muted
 */
export const SentenceDisplay = ({ target, typed, testId }) => {
  const chars = [];
  const len = Math.max(target.length, typed.length);
  for (let i = 0; i < len; i++) {
    const t = target[i];
    const u = typed[i];
    let cls = "sd__char sd__upcoming";
    let content = t || "";

    if (i < typed.length) {
      if (u === t) cls = "sd__char sd__typed";
      else {
        cls = "sd__char sd__error";
        // Show what the user typed if it was a wrong char and target has a space or newline
        content = t === " " ? "␣" : (t || u);
      }
    } else if (i === typed.length) {
      cls = "sd__char sd__cursor";
    }

    if (content === " ") {
      chars.push(
        <span key={i} className={cls} data-idx={i}>
          {/* Non-breaking space to keep width visible */}
          {"\u00A0"}
        </span>,
      );
    } else {
      chars.push(
        <span key={i} className={cls} data-idx={i}>
          {content}
        </span>,
      );
    }
  }

  return (
    <div className="sentence-display" data-testid={testId}>
      <div className="sentence-display__inner">{chars}</div>
    </div>
  );
};

export default SentenceDisplay;
