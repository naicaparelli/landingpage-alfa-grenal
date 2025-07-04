import React from 'react';
import { LayoutProps, LayoutType } from '../../types';
import { MarketGroup } from '../core';

const ListLayout: React.FC<LayoutProps> = ({
  markets,
  onSelectionClick,
  selectedSelections = [],
  className = ''
}) => {
  return (
    <div
      className={`list-layout space-y-4 ${className}`}
      data-testid="list-layout"
    >
      {markets.map((market) => (
        <MarketGroup
          key={market.id}
          market={market}
          layout={LayoutType.LIST}
          onSelectionClick={onSelectionClick}
          selectedSelections={selectedSelections}
        />
      ))}
    </div>
  );
};

export default ListLayout; 