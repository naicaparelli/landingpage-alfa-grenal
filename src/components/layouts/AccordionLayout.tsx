import React, { useState } from 'react';
import { LayoutProps } from '../../types';
import { MarketGroup } from '../core';
import { getMarketTypeDisplayName, getSportColor } from '../../utils';

const AccordionLayout: React.FC<LayoutProps> = ({
  markets,
  onSelectionClick,
  selectedSelections = [],
  className = ''
}) => {
  const [expandedMarkets, setExpandedMarkets] = useState<Set<string>>(new Set());

  const toggleMarket = (marketId: string) => {
    const newExpanded = new Set(expandedMarkets);
    if (newExpanded.has(marketId)) {
      newExpanded.delete(marketId);
    } else {
      newExpanded.add(marketId);
    }
    setExpandedMarkets(newExpanded);
  };

  return (
    <div
      className={`accordion-layout space-y-2 ${className}`}
      data-testid="accordion-layout"
    >
      {markets.map((market) => {
        const isExpanded = expandedMarkets.has(market.id);
        const sportColorClass = getSportColor(market.sport);
        const mainOdds = market.odds.slice(0, 3); // Principais odds para preview
        
        return (
          <div
            key={market.id}
            className="accordion-item border border-border-primary rounded-lg overflow-hidden bg-market-bg"
          >
            {/* Header compacto */}
            <button
              onClick={() => toggleMarket(market.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-market-hover transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full bg-${sportColorClass}`} />
                <span className="font-montserrat font-medium text-body-sm text-text-primary">
                  {getMarketTypeDisplayName(market.type)}
                </span>
                {market.featured && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Destaque
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {/* Preview das principais odds */}
                {!isExpanded && (
                  <div className="flex items-center gap-1">
                    {mainOdds.map((odds, index) => (
                      <span
                        key={odds.id}
                        className="text-body-sm font-medium text-text-primary bg-odds-bg px-2 py-1 rounded text-center min-w-[3rem]"
                      >
                        {odds.display}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Seta */}
                <span className={`transform transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </div>
            </button>
            
            {/* Conteúdo expandido */}
            {isExpanded && (
              <div className="border-t border-border-primary">
                <MarketGroup
                  market={market}
                  layout="accordion"
                  onSelectionClick={onSelectionClick}
                  selectedSelections={selectedSelections}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AccordionLayout; 