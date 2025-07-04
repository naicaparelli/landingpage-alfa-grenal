import React from 'react';
import { betmasterEvent, groupMarketsByCategory } from '../utils/betmasterData';
import { useBetSlip } from '../context/BetSlipContext';
import { useMarketState } from '../hooks/useMarketState';
import MarketContainer from '../components/core/MarketContainer';
import LayoutSelector from '../components/core/LayoutSelector';

const MainMarkets: React.FC = () => {
  const { betSlip } = useBetSlip();
  const {
    globalLayout,
    setGlobalLayout,
    collapsedMarkets,
    favoriteMarkets,
    getLayoutForMarket,
    handleLayoutChange,
    toggleMarketCollapse,
    toggleMarketFavorite
  } = useMarketState();

  const groupedMarkets = groupMarketsByCategory(betmasterEvent.markets);

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--sportsbook-background)' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Mercados Principais
          </h1>
          <p className="text-lg text-gray-300">
            {betmasterEvent.name} - Showcase de Layouts
          </p>
        </div>

        {/* Layout Selector Global */}
        <LayoutSelector
          selectedLayout={globalLayout}
          onLayoutChange={setGlobalLayout}
          title="Layout Global para todos os mercados:"
        />

        {/* Markets */}
        <div className="space-y-6">
          {Object.entries(groupedMarkets).map(([category, markets]) => (
            <div key={category}>
              {markets.map((market) => (
                <div key={market.id} className="mb-3">
                  <MarketContainer
                    market={market}
                    layout={getLayoutForMarket(market.id)}
                    collapsedMarkets={collapsedMarkets}
                    favoriteMarkets={favoriteMarkets}
                    onToggleCollapse={toggleMarketCollapse}
                    onToggleFavorite={toggleMarketFavorite}
                    onLayoutChange={handleLayoutChange}
                    showLayoutSelector={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Cupom de Apostas */}
        {betSlip.selections.length > 0 && (
          <div className="rounded-lg p-4 border" style={{ 
            backgroundColor: 'var(--sportsbook-section)',
            borderColor: 'var(--sportsbook-bg-extra)'
          }}>
            <h3 className="text-xl font-bold text-white mb-4">
              Cupom de Apostas ({betSlip.selections.length})
            </h3>
            <div className="space-y-3">
              {betSlip.selections.map((selection) => (
                <div key={selection.id} className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--sportsbook-primary)' }}>
                  <div>
                    <div className="font-medium text-white">{selection.name}</div>
                    <div className="text-sm text-gray-300">{selection.marketName}</div>
                  </div>
                  <div className="text-lg font-bold" style={{ color: 'var(--sportsbook-accent)' }}>
                    {selection.odds.display}
                  </div>
                </div>
              ))}
              <div className="pt-3 border-t border-opacity-20 border-white">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total das Odds:</span>
                  <span className="text-xl font-bold" style={{ color: 'var(--sportsbook-accent)' }}>
                    {betSlip.totalOdds.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainMarkets; 