import React from 'react';
import { Market, Selection, Odds } from '../../types';
import OddsButton from '../core/OddsButton';
import { groupMarketsByCategory, formatMarketName, getOverUnderLabel } from '../../utils/betmasterStyleData';

interface BetmasterStyleLayoutProps {
  markets: Market[];
  onSelectionClick: (selection: Selection) => void;
  selectedSelections?: Selection[];
  className?: string;
}

// Componente para exibir mercados de totals em formato compacto
const TotalsMarketGroup: React.FC<{
  markets: Market[];
  onSelectionClick: (selection: Selection) => void;
  selectedSelections?: Selection[];
  title: string;
}> = ({ markets, onSelectionClick, selectedSelections, title }) => {
  // Ordenar mercados por valor (0.5, 1, 1.5, 2, 2.5, 3)
  const sortedMarkets = markets.sort((a, b) => {
    const aValue = parseFloat(a.name.match(/(\d+(?:\.\d+)?)/)?.[1] || '0');
    const bValue = parseFloat(b.name.match(/(\d+(?:\.\d+)?)/)?.[1] || '0');
    return aValue - bValue;
  });

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-800 px-2">{title}</h3>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 bg-gray-50 text-xs font-medium text-gray-600 py-2 px-1">
          <div className="text-center">Linha</div>
          <div className="text-center">Over</div>
          <div className="text-center">Under</div>
        </div>
        
        {/* Mercados */}
        <div className="divide-y divide-gray-100">
          {sortedMarkets.map((market) => {
            const value = market.name.match(/(\d+(?:\.\d+)?)/)?.[1];
            const overOdds = market.odds.find(o => o.id.includes('over'));
            const underOdds = market.odds.find(o => o.id.includes('under'));
            
            if (!overOdds || !underOdds) return null;

            const createSelection = (odds: Odds, type: 'over' | 'under'): Selection => ({
              id: odds.id,
              marketId: market.id,
              name: type === 'over' ? `Over ${value}` : `Under ${value}`,
              odds: odds,
              selected: selectedSelections?.some(s => s.id === odds.id) || false,
              eventId: market.eventId,
              eventName: 'Real Madrid vs Liverpool',
              sport: market.sport,
              marketType: market.type,
              marketName: market.name
            });

            return (
              <div key={market.id} className="grid grid-cols-3 py-1 px-1 hover:bg-gray-50 transition-colors">
                {/* Linha */}
                <div className="flex items-center justify-center text-xs font-medium text-gray-700">
                  {value}
                </div>
                
                {/* Over */}
                <div className="flex items-center justify-center px-1">
                  <OddsButton
                    odds={overOdds}
                    selection={createSelection(overOdds, 'over')}
                    onClick={onSelectionClick}
                    size="sm"
                    className="w-full text-xs h-6 min-h-6"
                  />
                </div>
                
                {/* Under */}
                <div className="flex items-center justify-center px-1">
                  <OddsButton
                    odds={underOdds}
                    selection={createSelection(underOdds, 'under')}
                    onClick={onSelectionClick}
                    size="sm"
                    className="w-full text-xs h-6 min-h-6"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Componente para mercados tradicionais (1x2, double chance, etc.)
const StandardMarketGroup: React.FC<{
  market: Market;
  onSelectionClick: (selection: Selection) => void;
  selectedSelections?: Selection[];
}> = ({ market, onSelectionClick, selectedSelections }) => {
  const createSelection = (odds: Odds): Selection => ({
    id: odds.id,
    marketId: market.id,
    name: getSelectionName(odds.id, market.type),
    odds: odds,
    selected: selectedSelections?.some(s => s.id === odds.id) || false,
    eventId: market.eventId,
    eventName: 'Real Madrid vs Liverpool',
    sport: market.sport,
    marketType: market.type,
    marketName: market.name
  });

  const getSelectionName = (oddsId: string, marketType: string): string => {
    const nameMap: Record<string, string> = {
      'home-win': 'Real Madrid',
      'draw': 'Empate',
      'away-win': 'Liverpool',
      '1x': '1X',
      '12': '12',
      'x2': 'X2',
      'yes': 'Sim',
      'no': 'Não'
    };
    return nameMap[oddsId] || oddsId;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-800 px-2">{market.name}</h3>
      <div className="bg-white rounded-lg border border-gray-200 p-2">
        <div className="grid grid-cols-3 gap-1">
          {market.odds.map((odds) => (
            <OddsButton
              key={odds.id}
              odds={odds}
              selection={createSelection(odds)}
              onClick={onSelectionClick}
              size="sm"
              className="w-full text-xs h-8"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const BetmasterStyleLayout: React.FC<BetmasterStyleLayoutProps> = ({
  markets,
  onSelectionClick,
  selectedSelections,
  className = ''
}) => {
  const groupedMarkets = groupMarketsByCategory(markets);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Mercados Principais */}
      {groupedMarkets.Main && (
        <div className="space-y-3">
          {groupedMarkets.Main.map((market) => (
            <StandardMarketGroup
              key={market.id}
              market={market}
              onSelectionClick={onSelectionClick}
              selectedSelections={selectedSelections}
            />
          ))}
        </div>
      )}

      {/* Mercados de Goals */}
      {groupedMarkets.Goals && (
        <div className="space-y-3">
          {groupedMarkets.Goals.map((market) => (
            <StandardMarketGroup
              key={market.id}
              market={market}
              onSelectionClick={onSelectionClick}
              selectedSelections={selectedSelections}
            />
          ))}
        </div>
      )}

      {/* Mercados de 1st Half Totals */}
      {groupedMarkets['1st Half Totals'] && (
        <TotalsMarketGroup
          markets={groupedMarkets['1st Half Totals']}
          onSelectionClick={onSelectionClick}
          selectedSelections={selectedSelections}
          title="1º Tempo - Total de Gols"
        />
      )}

      {/* Mercados de 2nd Half Totals */}
      {groupedMarkets['2nd Half Totals'] && (
        <TotalsMarketGroup
          markets={groupedMarkets['2nd Half Totals']}
          onSelectionClick={onSelectionClick}
          selectedSelections={selectedSelections}
          title="2º Tempo - Total de Gols"
        />
      )}

      {/* Outros mercados */}
      {Object.entries(groupedMarkets).map(([category, categoryMarkets]) => {
        if (['Main', 'Goals', '1st Half Totals', '2nd Half Totals'].includes(category)) {
          return null;
        }
        
        return (
          <div key={category} className="space-y-3">
            <h2 className="text-base font-semibold text-gray-900 px-2">{category}</h2>
            {categoryMarkets.map((market) => (
              <StandardMarketGroup
                key={market.id}
                market={market}
                onSelectionClick={onSelectionClick}
                selectedSelections={selectedSelections}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}; 