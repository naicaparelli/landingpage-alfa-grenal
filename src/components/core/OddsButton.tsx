import React from 'react';
import { Odds, Selection } from '../../types';

interface OddsButtonProps {
  odds: Odds;
  label: string;
  onClick: () => void;
  isSelected?: boolean;
  className?: string;
}

const OddsButton: React.FC<OddsButtonProps> = ({ 
  odds, 
  label, 
  onClick, 
  isSelected = false,
  className = ''
}) => {
  const baseStyles = {
    backgroundColor: isSelected ? 'var(--sportsbook-primary-base)' : 'var(--sportsbook-primary)',
    color: isSelected ? 'var(--sportsbook-primary)' : 'var(--sportsbook-text-primary)',
    border: `1px solid ${isSelected ? 'var(--sportsbook-primary-base)' : 'var(--sportsbook-border)'}`
  };

  return (
    <button
      onClick={onClick}
      className={`sportsbook-odds-button rounded p-3 transition-all duration-200 text-center ${className}`}
      style={baseStyles}
    >
      <div className="text-xs font-medium mb-1 sportsbook-odds-label">
        {label}
      </div>
      <div className="text-base font-bold sportsbook-odds-value">
        {odds.display}
      </div>
    </button>
  );
};

export default OddsButton; 