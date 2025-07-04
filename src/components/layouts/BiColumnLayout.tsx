import React from 'react';
import { LayoutProps } from '../../types';
import { MarketGroup } from '../core';

const BiColumnLayout: React.FC<LayoutProps> = ({
  markets,
  onSelectionClick,
  selectedSelections = [],
  className = ''
}) => {
  return (
    <div
      className={`bi-column-layout space-y-4 ${className}`}
      data-testid="bi-column-layout"
    >
      {markets.map((market) => (
        <MarketGroup
          key={market.id}
          market={market}
          layout="bi_column"
          onSelectionClick={onSelectionClick}
          selectedSelections={selectedSelections}
        />
      ))}
    </div>
  );
};

export default BiColumnLayout; 