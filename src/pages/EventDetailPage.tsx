import React from 'react';
import { betmasterEvent, groupMarketsByCategory } from '../utils/betmasterData';
import { useBetSlip } from '../context/BetSlipContext';
import { useMarketState } from '../hooks/useMarketState';
import MarketContainer from '../components/core/MarketContainer';
import LayoutSelector from '../components/core/LayoutSelector';

export const EventDetailPage: React.FC = () => {
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
      <div className="space-y-4 max-w-6xl mx-auto">
        {/* Header simples do Evento */}
        <div className="rounded-lg p-4 border" style={{ 
          backgroundColor: 'var(--sportsbook-section)',
          borderColor: 'var(--sportsbook-bg-extra)'
        }}>
          <div className="flex justify-center items-center gap-8 text-white">
            <div className="text-center">
              <div className="text-lg font-semibold">
                {betmasterEvent.homeTeam}
              </div>
              <div className="text-3xl font-bold mt-1">
                {betmasterEvent.score?.home || 0}
              </div>
            </div>
            <div className="text-2xl font-bold opacity-60">VS</div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {betmasterEvent.awayTeam}
              </div>
              <div className="text-3xl font-bold mt-1">
                {betmasterEvent.score?.away || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Seletor de Layout Global */}
        <LayoutSelector
          selectedLayout={globalLayout}
          onLayoutChange={setGlobalLayout}
          title="Layout Global para todos os mercados:"
        />

        {/* Mercados principais */}
        <div className="space-y-3">
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
                    showLayoutSelector={true}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Cupom simplificado */}
        {betSlip.selections.length > 0 && (
          <div className="rounded-lg p-4 border" style={{ 
            backgroundColor: 'var(--sportsbook-section)',
            borderColor: 'var(--sportsbook-bg-extra)'
          }}>
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--sportsbook-text-primary)' }}>
              Cupom ({betSlip.selections.length})
            </h3>
            <div className="space-y-2">
              {betSlip.selections.map((selection) => (
                <div key={selection.id} className="flex justify-between items-center text-sm">
                  <div>
                    <div className="font-medium" style={{ color: 'var(--sportsbook-text-primary)' }}>
                      {selection.name}
                    </div>
                    <div style={{ color: 'var(--sportsbook-text-secondary)' }}>
                      {selection.marketName}
                    </div>
                  </div>
                  <div className="font-bold" style={{ color: 'var(--sportsbook-accent)' }}>
                    {selection.odds.display}
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-opacity-20 border-white">
                <div className="flex justify-between items-center font-semibold">
                  <span style={{ color: 'var(--sportsbook-text-primary)' }}>Total:</span>
                  <span style={{ color: 'var(--sportsbook-accent)' }}>
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