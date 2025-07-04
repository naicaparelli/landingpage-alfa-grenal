import React from 'react';
import { LayoutProps } from '../../types';
import { MarketGroup } from '../core';

const TriColumnLayout: React.FC<LayoutProps> = ({
  markets,
  onSelectionClick,
  selectedSelections = [],
  className = ''
}) => {
  return (
    <div
      className={`tri-column-layout space-y-4 ${className}`}
      data-testid="tri-column-layout"
    >
      {markets.map((market) => (
        <MarketGroup
          key={market.id}
          market={market}
          layout="tri_column"
          onSelectionClick={onSelectionClick}
          selectedSelections={selectedSelections}
        />
      ))}
    </div>
  );
};

export default TriColumnLayout; 