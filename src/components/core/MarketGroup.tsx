import React from 'react';
import { MarketGroupProps, Selection } from '../../types';
import { getMarketTypeDisplayName, getSportColor } from '../../utils';
import OddsButton from './OddsButton';

const MarketGroup: React.FC<MarketGroupProps> = ({
  market,
  layout = 'tri_column',
  onSelectionClick,
  selectedSelections = [],
  className = ''
}) => {
  const handleSelectionClick = (selection: Selection) => {
    onSelectionClick(selection);
  };

  const isSelectionSelected = (oddsId: string) => {
    return selectedSelections.some(s => s.odds.id === oddsId);
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'bi_column':
        return 'grid grid-cols-2 gap-1';
      case 'tri_column':
        return 'grid grid-cols-3 gap-1';
      case 'grid':
        return 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1';
      case 'list':
        return 'flex flex-col gap-1';
      case 'accordion':
        return 'space-y-0.5';
      case 'ladder':
        return 'space-y-1';
      case 'carousel':
        return 'grid grid-cols-2 sm:grid-cols-3 gap-1';
      default:
        return 'grid grid-cols-3 gap-1';
    }
  };

  const getSelectionName = (index: number) => {
    switch (market.type) {
      case 'moneyline':
        return ['Casa', 'Empate', 'Fora'][index] || `Opção ${index + 1}`;
      case 'spread':
        return [`Casa ${index === 0 ? '+' : '-'}1.5`, `Fora ${index === 0 ? '-' : '+'}1.5`][index];
      case 'totals':
        return ['Over 2.5', 'Under 2.5'][index];
      case 'both_teams_score':
        return ['Sim', 'Não'][index];
      case 'double_chance':
        return ['1X', '12', 'X2'][index];
      case 'correct_score':
        return ['1-0', '2-0', '2-1', '0-1', '0-2', '1-2'][index] || `${index + 1}-0`;
      case 'first_goalscorer':
        return `Jogador ${index + 1}`;
      case 'corners':
        return ['Over 9.5', 'Under 9.5'][index];
      case 'cards':
        return ['Over 3.5', 'Under 3.5'][index];
      default:
        return `Opção ${index + 1}`;
    }
  };

  const sportColorClass = getSportColor(market.sport);

  return (
    <div
      className={`market-group bg-market-bg border border-market-border rounded-lg overflow-hidden shadow-sm ${className}`}
      data-testid="market-group"
      data-market-id={market.id}
      data-market-type={market.type}
      data-sport={market.sport}
    >
      {/* Header do Mercado */}
      <div className={`market-header bg-market-header px-2 py-1.5 border-b border-market-border`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {/* Indicador de cor do esporte */}
            <div className={`w-1.5 h-1.5 rounded-full bg-${sportColorClass}`} />
            
            <h3 className="font-montserrat font-medium text-sm text-text-primary">
              {getMarketTypeDisplayName(market.type)}
            </h3>
            
            {/* Badge de destaque */}
            {market.featured && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Destaque
              </span>
            )}
          </div>
          
          {/* Indicador de suspensão */}
          {market.suspended && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">
              Suspenso
            </span>
          )}
        </div>
        
        {/* Descrição do mercado */}
        {market.description && (
          <p className="text-xs text-text-secondary mt-0.5">
            {market.description}
          </p>
        )}
      </div>
      
      {/* Odds do Mercado */}
      <div className="market-odds p-2">
        <div className={getLayoutClasses()}>
          {market.odds.map((odds, index) => (
            <OddsButton
              key={odds.id}
              odds={odds}
              selection={{
                id: `${market.id}-${odds.id}`,
                marketId: market.id,
                name: getSelectionName(index),
                selected: isSelectionSelected(odds.id),
                eventId: market.eventId,
                eventName: `Market ${market.name}`,
                sport: market.sport,
                marketType: market.type,
                marketName: market.name
              }}
              onClick={handleSelectionClick}
              disabled={market.suspended}
              size="sm"
              variant="primary"
              showTrend={true}
            />
          ))}
        </div>
        
        {/* Informações adicionais */}
        {(market.minStake || market.maxStake) && (
          <div className="mt-2 pt-2 border-t border-market-border">
            <div className="flex items-center justify-between text-xs text-text-tertiary">
              {market.minStake && (
                <span>Min: R$ {market.minStake.toFixed(2)}</span>
              )}
              {market.maxStake && (
                <span>Max: R$ {market.maxStake.toFixed(2)}</span>
              )}
            </div>
          </div>
        )}
        
        {/* Liquidez para mercados especiais */}
        {(market.liquidityBack || market.liquidityLay) && (
          <div className="mt-1.5 flex items-center gap-3 text-xs text-text-tertiary">
            {market.liquidityBack && (
              <span>Back: R$ {market.liquidityBack.toLocaleString()}</span>
            )}
            {market.liquidityLay && (
              <span>Lay: R$ {market.liquidityLay.toLocaleString()}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketGroup; 