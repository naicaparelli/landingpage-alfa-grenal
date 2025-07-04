import React, { useState } from 'react';
import { betmasterEvent, getSelectionName } from '../../utils/betmasterData';
import { useBetSlip } from '../../context/BetSlipContext';
import { Selection, Market, Odds, LayoutType } from '../../types';
import OddsButton from './OddsButton';
import ListOddsButton from './ListOddsButton';

interface MarketContainerProps {
  market: Market;
  layout: LayoutType;
  collapsedMarkets: Record<string, boolean>;
  favoriteMarkets: Set<string>;
  onToggleCollapse: (marketId: string) => void;
  onToggleFavorite: (marketId: string, event: React.MouseEvent) => void;
  onLayoutChange?: (marketId: string, layout: LayoutType) => void;
  showLayoutSelector?: boolean;
  className?: string;
}

export const MarketContainer: React.FC<MarketContainerProps> = ({
  market,
  layout,
  collapsedMarkets,
  favoriteMarkets,
  onToggleCollapse,
  onToggleFavorite,
  onLayoutChange,
  showLayoutSelector = false,
  className = ''
}) => {
  const { addSelection, betSlip } = useBetSlip();

  const handleSelectionClick = (selection: Selection) => {
    addSelection(selection);
  };

  const createSelection = (odds: Odds, market: Market): Selection => ({
    id: `${odds.id}-${market.id}`,
    marketId: market.id,
    name: getSelectionName(odds.id, market.type),
    marketName: market.name,
    odds: odds,
    selected: false,
    eventId: market.eventId,
    eventName: betmasterEvent.name,
    sport: market.sport,
    marketType: market.type
  });

  const getDetailedLabel = (odds: Odds, market: Market): string => {
    const labelMap: Record<string, Record<string, string>> = {
      'match-result': {
        'home-win': 'Real Madrid vence',
        'draw': 'Empate',
        'away-win': 'Liverpool vence'
      },
      'double-chance': {
        '1x': 'Real Madrid ou Empate',
        '12': 'Real Madrid ou Liverpool', 
        'x2': 'Empate ou Liverpool'
      },
      'both-teams-score': {
        'yes': 'Ambas marcam',
        'no': 'Nem ambas marcam'
      },
      'over-under-goals': {
        'over-2.5': 'Mais de 2.5',
        'under-2.5': 'Menos de 2.5',
        'over-1.5': 'Mais de 1.5',
        'under-1.5': 'Menos de 1.5',
        'over-3.5': 'Mais de 3.5',
        'under-3.5': 'Menos de 3.5'
      },
      'total-goals-2.5': {
        'over-2.5': 'Mais de 2.5',
        'under-2.5': 'Menos de 2.5'
      },
      'total-goals-1.5': {
        'over-1.5': 'Mais de 1.5',
        'under-1.5': 'Menos de 1.5'
      },
      'total-goals-3.5': {
        'over-3.5': 'Mais de 3.5',
        'under-3.5': 'Menos de 3.5'
      },
      'correct-score': {
        'score-1-0': 'Real Madrid 1-0',
        'score-2-0': 'Real Madrid 2-0',
        'score-2-1': 'Real Madrid 2-1',
        'score-1-1': 'Empate 1-1',
        'score-0-1': 'Liverpool 0-1',
        'score-0-2': 'Liverpool 0-2',
        'score-1-2': 'Liverpool 1-2',
        'score-0-0': 'Empate 0-0'
      },
      'corners-total-9.5': {
        'corners-over-9.5': 'Mais de 9.5 escanteios',
        'corners-under-9.5': 'Menos de 9.5 escanteios'
      },
      'cards-total-3.5': {
        'cards-over-3.5': 'Mais de 3.5 cartões',
        'cards-under-3.5': 'Menos de 3.5 cartões'
      }
    };
    
    return labelMap[market.id]?.[odds.id] || getSelectionName(odds.id, market.type);
  };

  const getGridCols = (layout: LayoutType) => {
    switch (layout) {
      case LayoutType.BI_COLUMN:
        return 'grid-cols-2';
      case LayoutType.TRI_COLUMN:
        return 'grid-cols-3';
      case LayoutType.GRID:
        return market.odds.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3 md:grid-cols-6';
      case LayoutType.LIST:
        return 'grid-cols-1';
      default:
        return 'grid-cols-2';
    }
  };

  const isCollapsed = collapsedMarkets[market.id];

  return (
    <div className={`rounded-lg overflow-hidden border ${className}`}
         style={{ 
           backgroundColor: 'var(--sportsbook-section)',
           borderColor: 'var(--sportsbook-bg-extra)'
         }}>
      
      {/* Header do Mercado com Favorito e Collapse */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => onToggleFavorite(market.id, e)}
            className="flex items-center justify-center w-5 h-5 rounded transition-colors duration-200 hover:scale-110"
            style={{ 
              color: favoriteMarkets.has(market.id) ? '#ff4757' : 'var(--sportsbook-text-secondary)' 
            }}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M8 14.25l-.9-.82C3.4 10.36 1 8.28 1 5.5 1 3.42 2.42 2 4.5 2c1.04 0 2.04.52 2.57 1.36h.86C8.46 2.52 9.46 2 10.5 2 12.58 2 14 3.42 14 5.5c0 2.78-2.4 4.86-6.1 7.93L8 14.25z"
                fill={favoriteMarkets.has(market.id) ? '#ff4757' : 'none'}
                stroke={favoriteMarkets.has(market.id) ? '#ff4757' : 'var(--sportsbook-text-secondary)'}
                strokeWidth="1"
              />
            </svg>
          </button>
          
          <div>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--sportsbook-text-primary)' }}>
              {market.name}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleCollapse(market.id)}
            className="flex items-center justify-center w-5 h-5 rounded transition-transform duration-200"
            style={{ color: 'var(--sportsbook-text-secondary)' }}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`transform transition-transform duration-200 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
            >
              <path 
                d="M12 6l-4 4-4-4" 
                stroke="var(--sportsbook-text-secondary)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          {showLayoutSelector && onLayoutChange && (
            <CompactLayoutSelector 
              selectedLayout={layout}
              onLayoutChange={(newLayout) => onLayoutChange(market.id, newLayout)}
            />
          )}
        </div>
      </div>

      {/* Conteúdo do Mercado */}
      {!isCollapsed && (
        <div className="px-4 pb-4 pt-2">
          {layout === LayoutType.LIST ? (
            <div className="flex flex-col gap-1">
              {market.odds.map((odds, index) => {
                const selection = createSelection(odds, market);
                const isSelected = betSlip.selections.some(s => s.id === selection.id);
                
                return (
                  <ListOddsButton
                    key={odds.id}
                    odds={odds}
                    label={getDetailedLabel(odds, market)}
                    onClick={() => handleSelectionClick(selection)}
                    isSelected={isSelected}
                    isFirst={index === 0}
                    isLast={index === market.odds.length - 1}
                    className={isSelected ? 'selected' : ''}
                  />
                );
              })}
            </div>
          ) : layout === LayoutType.ACCORDION ? (
            <div className="space-y-2">
              {market.odds.map((odds) => {
                const selection = createSelection(odds, market);
                const isSelected = betSlip.selections.some(s => s.id === selection.id);
                
                return (
                  <details key={odds.id} className="border rounded-lg">
                    <summary className="cursor-pointer p-3 hover:bg-gray-50" style={{ backgroundColor: 'var(--sportsbook-primary)' }}>
                      <span className="font-medium" style={{ color: 'var(--sportsbook-text-primary)' }}>
                        {getDetailedLabel(odds, market)}
                      </span>
                    </summary>
                    <div className="p-3 border-t">
                      <OddsButton
                        odds={odds}
                        label={getDetailedLabel(odds, market)}
                        onClick={() => handleSelectionClick(selection)}
                        isSelected={isSelected}
                        className={isSelected ? 'selected' : ''}
                      />
                    </div>
                  </details>
                );
              })}
            </div>
          ) : layout === LayoutType.CAROUSEL ? (
            <div className="carousel-container overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {market.odds.map((odds) => {
                  const selection = createSelection(odds, market);
                  const isSelected = betSlip.selections.some(s => s.id === selection.id);
                  
                  return (
                    <div key={odds.id} className="flex-shrink-0 w-24">
                      <OddsButton
                        odds={odds}
                        label={getDetailedLabel(odds, market)}
                        onClick={() => handleSelectionClick(selection)}
                        isSelected={isSelected}
                        className={isSelected ? 'selected' : ''}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : layout === LayoutType.LADDER ? (
            <div className="ladder-container">
              <div className="grid grid-cols-4 gap-2 mb-2 text-xs font-medium" style={{ color: 'var(--sportsbook-text-secondary)' }}>
                <div className="text-center">Opção</div>
                <div className="text-center bg-red-100 p-1 rounded">Lay</div>
                <div className="text-center bg-green-100 p-1 rounded">Back</div>
                <div className="text-center">Odds</div>
              </div>
              {market.odds.map((odds) => {
                const selection = createSelection(odds, market);
                const isSelected = betSlip.selections.some(s => s.id === selection.id);
                
                return (
                  <div key={odds.id} className="grid grid-cols-4 gap-2 mb-2">
                    <div className="text-sm font-medium" style={{ color: 'var(--sportsbook-text-primary)' }}>
                      {getDetailedLabel(odds, market)}
                    </div>
                    <button className="p-2 bg-red-100 hover:bg-red-200 rounded text-sm">
                      {(odds.value + 0.1).toFixed(2)}
                    </button>
                    <button className="p-2 bg-green-100 hover:bg-green-200 rounded text-sm">
                      {(odds.value - 0.1).toFixed(2)}
                    </button>
                    <div>
                      <OddsButton
                        odds={odds}
                        label={odds.display}
                        onClick={() => handleSelectionClick(selection)}
                        isSelected={isSelected}
                        className={isSelected ? 'selected' : ''}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : layout === LayoutType.TABS ? (
            <div className="tabs-container">
              <div className="overflow-x-auto scrollbar-hide mb-4" style={{ borderBottom: '1px solid var(--sportsbook-bg-extra)' }}>
                <div className="flex gap-1 min-w-max pb-2">
                  {market.odds.map((odds, index) => (
                    <button
                      key={odds.id}
                      className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-t-lg transition-all border-b-2 ${
                        index === 0 
                          ? 'border-b-2' 
                          : 'border-transparent hover:border-b-2'
                      }`}
                      style={{
                        backgroundColor: index === 0 ? 'var(--sportsbook-primary)' : 'transparent',
                        color: index === 0 ? 'var(--sportsbook-text-primary)' : 'var(--sportsbook-text-secondary)',
                        borderBottomColor: index === 0 ? 'var(--sportsbook-accent)' : 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        if (index !== 0) {
                          e.currentTarget.style.borderBottomColor = 'var(--sportsbook-accent)';
                          e.currentTarget.style.color = 'var(--sportsbook-text-primary)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (index !== 0) {
                          e.currentTarget.style.borderBottomColor = 'transparent';
                          e.currentTarget.style.color = 'var(--sportsbook-text-secondary)';
                        }
                      }}
                    >
                      {getDetailedLabel(odds, market)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {market.odds.map((odds) => {
                  const selection = createSelection(odds, market);
                  const isSelected = betSlip.selections.some(s => s.id === selection.id);
                  
                  return (
                    <OddsButton
                      key={odds.id}
                      odds={odds}
                      label={getDetailedLabel(odds, market)}
                      onClick={() => handleSelectionClick(selection)}
                      isSelected={isSelected}
                      className={isSelected ? 'selected' : ''}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={`grid ${getGridCols(layout)} gap-2`}>
              {market.odds.map((odds) => {
                const selection = createSelection(odds, market);
                const isSelected = betSlip.selections.some(s => s.id === selection.id);
                
                return (
                  <OddsButton
                    key={odds.id}
                    odds={odds}
                    label={getDetailedLabel(odds, market)}
                    onClick={() => handleSelectionClick(selection)}
                    isSelected={isSelected}
                    className={isSelected ? 'selected' : ''}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Componente compacto para seletor de layout
const CompactLayoutSelector: React.FC<{
  selectedLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
}> = ({ selectedLayout, onLayoutChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const layouts = [
    { value: LayoutType.BI_COLUMN, label: 'Bi-Coluna' },
    { value: LayoutType.TRI_COLUMN, label: 'Tri-Coluna' },
    { value: LayoutType.GRID, label: 'Grid' },
    { value: LayoutType.LIST, label: 'Lista' },
    { value: LayoutType.ACCORDION, label: 'Acordeão' },
    { value: LayoutType.LADDER, label: 'Escada' },
    { value: LayoutType.CAROUSEL, label: 'Carrossel' },
    { value: LayoutType.TABS, label: 'Abas' }
  ];

  const currentLayoutInfo = layouts.find(l => l.value === selectedLayout);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-2 py-1 text-xs rounded transition-all"
        style={{ 
          backgroundColor: 'var(--sportsbook-primary)',
          color: 'var(--sportsbook-text-secondary)',
          border: '1px solid var(--sportsbook-border)'
        }}
      >
        <span>{currentLayoutInfo?.label}</span>
        <span>▼</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-300 rounded shadow-lg z-20 overflow-hidden">
          {layouts.map((layout) => (
            <button
              key={layout.value}
              onClick={(e) => {
                e.stopPropagation();
                onLayoutChange(layout.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 transition-colors ${
                selectedLayout === layout.value ? 'bg-gray-100 font-medium' : 'text-gray-700'
              }`}
            >
              {layout.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketContainer; 