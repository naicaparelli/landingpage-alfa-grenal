import React from 'react';
import { LayoutProps } from '../../types';
import { MarketGroup } from '../core';

const GridLayout: React.FC<LayoutProps> = ({
  markets,
  onSelectionClick,
  selectedSelections = [],
  className = ''
}) => {
  return (
    <div
      className={`grid-layout space-y-6 ${className}`}
      data-testid="grid-layout"
    >
      {markets.map((market) => (
        <MarketGroup
          key={market.id}
          market={market}
          layout="grid"
          onSelectionClick={onSelectionClick}
          selectedSelections={selectedSelections}
        />
      ))}
    </div>
  );
};

export default GridLayout; 