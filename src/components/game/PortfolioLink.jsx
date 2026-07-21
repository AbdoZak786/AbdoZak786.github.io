import React from "react";

/**
 * PortfolioLink — leaves the game entirely and returns to the parent
 * portfolio site. Visually distinct from the in-game Exit button
 * (dashed pill, top-left, smaller, muted). Positioned via CSS fixed.
 *
 * TODO: wire `href` to the actual portfolio route when embedding.
 */
export const PortfolioLink = ({ href = "/", onNavigate }) => {
  const handleClick = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate();
    }
    // otherwise: default anchor navigation runs
  };
  return (
    <a
      className="portfolio-link"
      href={href}
      onClick={handleClick}
      data-testid="portfolio-link"
      aria-label="Return to portfolio"
    >
      <span className="portfolio-link__arrow" aria-hidden>
        ←
      </span>
      <span>Portfolio</span>
    </a>
  );
};

export default PortfolioLink;
