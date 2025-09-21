import React from "react";

interface HamburgerButtonProps {
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Abrir menú de filtros"
    className="p-2 focus:outline-none"
    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
  >
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  </button>
);

export default HamburgerButton;
