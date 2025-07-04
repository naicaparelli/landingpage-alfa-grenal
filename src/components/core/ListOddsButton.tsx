import React from 'react';
import { Odds } from '../../types';

interface ListOddsButtonProps {
  odds: Odds;
  label: string;
  onClick: () => void;
  isSelected?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}

const ListOddsButton: React.FC<ListOddsButtonProps> = ({ 
  odds, 
  label, 
  onClick, 
  isSelected = false,
  isFirst = false,
  isLast = false,
  className = ''
}) => {
  const baseStyles = {
    backgroundColor: isSelected ? 'var(--sportsbook-primary-base)' : 'var(--sportsbook-primary)',
    color: isSelected ? 'var(--sportsbook-primary)' : 'var(--sportsbook-text-primary)',
    border: `1px solid ${isSelected ? 'var(--sportsbook-primary-base)' : 'var(--sportsbook-border)'}`
  };

  const getBorderRadius = () => {
    if (isFirst && isLast) {
      return '0.5rem'; // Único elemento - bordas arredondadas completas
    } else if (isFirst) {
      return '0.5rem 0.5rem 0 0'; // Primeiro elemento - bordas arredondadas no topo
    } else if (isLast) {
      return '0 0 0.5rem 0.5rem'; // Último elemento - bordas arredondadas no bottom
    }
    return '0'; // Elementos do meio - sem bordas arredondadas
  };

  return (
    <button
      onClick={onClick}
      className={`sportsbook-list-odds-button flex items-center justify-between p-3 transition-all duration-200 w-full ${className}`}
      style={{
        ...baseStyles,
        borderRadius: getBorderRadius(),
        border: `1px solid ${isSelected ? 'var(--sportsbook-primary-base)' : 'var(--sportsbook-border)'}`
      }}
    >
      <div className="text-sm font-medium sportsbook-list-odds-label">
        {label}
      </div>
      <div className="text-base font-bold sportsbook-list-odds-value">
        {odds.display}
      </div>
    </button>
  );
};

export default ListOddsButton; 