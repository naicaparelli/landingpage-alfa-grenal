import React from 'react';
import { LayoutProps } from '../../types';
import { formatCurrency, formatOdds, getMarketTypeDisplayName } from '../../utils';
import { OddsButton } from '../core';

const LadderLayout: React.FC<LayoutProps> = ({
  markets,
  onSelectionClick,
  selectedSelections = [],
  className = ''
}) => {
  const isSelectionSelected = (marketId: string, oddsId: string) => {
    return selectedSelections.some(s => s.marketId === marketId && s.odds.id === oddsId);
  };

  return (
    <div
      className={`ladder-layout space-y-6 ${className}`}
      data-testid="ladder-layout"
    >
      {markets.map((market) => (
        <div
          key={market.id}
          className="ladder-market bg-market-bg border border-market-border rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-market-header px-4 py-3 border-b border-market-border">
            <h3 className="font-montserrat font-medium text-heading-sm text-text-primary">
              {getMarketTypeDisplayName(market.type)}
            </h3>
            {market.description && (
              <p className="text-body-sm text-text-secondary mt-1">
                {market.description}
              </p>
            )}
          </div>
          
          {/* Ladder Grid */}
          <div className="ladder-grid p-4">
            {/* Header do Ladder */}
            <div className="grid grid-cols-7 gap-2 mb-4 text-center">
              <div className="text-caption font-medium text-text-secondary">
                Seleção
              </div>
              <div className="text-caption font-medium text-text-secondary bg-error/10 rounded p-1">
                Lay 3
              </div>
              <div className="text-caption font-medium text-text-secondary bg-error/10 rounded p-1">
                Lay 2
              </div>
              <div className="text-caption font-medium text-text-secondary bg-error/10 rounded p-1">
                Lay 1
              </div>
              <div className="text-caption font-medium text-text-secondary bg-success/10 rounded p-1">
                Back 1
              </div>
              <div className="text-caption font-medium text-text-secondary bg-success/10 rounded p-1">
                Back 2
              </div>
              <div className="text-caption font-medium text-text-secondary bg-success/10 rounded p-1">
                Back 3
              </div>
            </div>
            
            {/* Linhas do Ladder */}
            {market.odds.map((odds, index) => {
              const selectionName = getSelectionName(market.type, index);
              
              return (
                <div key={odds.id} className="ladder-row grid grid-cols-7 gap-2 mb-2">
                  {/* Nome da seleção */}
                  <div className="flex items-center text-body-sm font-medium text-text-primary truncate">
                    {selectionName}
                  </div>
                  
                  {/* Lay odds (3 níveis) */}
                  {[0, 1, 2].map((level) => (
                    <div key={`lay-${level}`} className="ladder-cell">
                      <button
                        className="w-full h-10 bg-error/10 hover:bg-error/20 border border-error/20 rounded text-body-sm font-medium text-text-primary transition-colors"
                        onClick={() => onSelectionClick({
                          id: `${market.id}-${odds.id}-lay-${level}`,
                          marketId: market.id,
                          name: `${selectionName} (Lay)`,
                          odds: { ...odds, value: odds.value + (level * 0.1) },
                          selected: false,
                          eventId: market.eventId,
                          eventName: `Market ${market.name}`,
                          sport: market.sport,
                          marketType: market.type,
                          marketName: market.name
                        })}
                      >
                        <div className="text-center">
                          <div className="text-body-sm font-medium">
                            {formatOdds(odds.value + (level * 0.1))}
                          </div>
                          <div className="text-xs text-text-tertiary">
                            {formatCurrency((market.liquidityLay || 1000) - (level * 200))}
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                  
                  {/* Back odds (3 níveis) */}
                  {[0, 1, 2].map((level) => (
                    <div key={`back-${level}`} className="ladder-cell">
                      <button
                        className="w-full h-10 bg-success/10 hover:bg-success/20 border border-success/20 rounded text-body-sm font-medium text-text-primary transition-colors"
                        onClick={() => onSelectionClick({
                          id: `${market.id}-${odds.id}-back-${level}`,
                          marketId: market.id,
                          name: `${selectionName} (Back)`,
                          odds: { ...odds, value: odds.value - (level * 0.1) },
                          selected: false,
                          eventId: market.eventId,
                          eventName: `Market ${market.name}`,
                          sport: market.sport,
                          marketType: market.type,
                          marketName: market.name
                        })}
                      >
                        <div className="text-center">
                          <div className="text-body-sm font-medium">
                            {formatOdds(Math.max(1.01, odds.value - (level * 0.1)))}
                          </div>
                          <div className="text-xs text-text-tertiary">
                            {formatCurrency((market.liquidityBack || 1000) - (level * 200))}
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          
          {/* Informações de liquidez */}
          <div className="ladder-info bg-bg-secondary px-4 py-3 border-t border-border-primary">
            <div className="flex items-center justify-between text-caption text-text-tertiary">
              <span>Total disponível para Back: {formatCurrency(market.liquidityBack || 0)}</span>
              <span>Total disponível para Lay: {formatCurrency(market.liquidityLay || 0)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Função auxiliar para obter nome da seleção
const getSelectionName = (marketType: string, index: number): string => {
  switch (marketType) {
    case 'moneyline':
      return ['Casa', 'Empate', 'Fora'][index] || `Opção ${index + 1}`;
    case 'totals':
      return ['Over', 'Under'][index] || `Opção ${index + 1}`;
    case 'both_teams_score':
      return ['Sim', 'Não'][index] || `Opção ${index + 1}`;
    default:
      return `Opção ${index + 1}`;
  }
};

export default LadderLayout; 