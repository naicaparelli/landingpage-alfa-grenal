import React, { useState } from 'react';
import { OddsButton } from '../core';
import { DescriptiveMarket } from '../../types';

interface OverUnderSplitGroupProps {
  markets: DescriptiveMarket[];
  className?: string;
}

const OverUnderSplitGroup: React.FC<OverUnderSplitGroupProps> = ({
  markets,
  className = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedOdds, setSelectedOdds] = useState<Set<string>>(new Set());

  // Filtrar mercados Over/Under
  const overUnderMarkets = markets.filter(market => 
    market.name.toLowerCase().includes('over') || 
    market.name.toLowerCase().includes('under') ||
    market.name.toLowerCase().includes('mais') ||
    market.name.toLowerCase().includes('menos')
  );

  if (overUnderMarkets.length === 0) {
    return null;
  }

  // Processar mercados para separar Over e Under
  const processedMarkets = overUnderMarkets.map(market => {
    const overOdds = market.odds.filter((odd: any) => 
      odd.label.toLowerCase().includes('over') || 
      odd.label.toLowerCase().includes('mais')
    );
    
    const underOdds = market.odds.filter((odd: any) => 
      odd.label.toLowerCase().includes('under') || 
      odd.label.toLowerCase().includes('menos')
    );

    return {
      ...market,
      overOdds,
      underOdds
    };
  });

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleOdds = (oddId: string) => {
    setSelectedOdds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(oddId)) {
        newSet.delete(oddId);
      } else {
        newSet.add(oddId);
      }
      return newSet;
    });
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Over/Under Split</h3>
            <p className="text-sm opacity-90">
              Under à esquerda, Over à direita
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              {overUnderMarkets.length} mercados
            </span>
            <button
              onClick={handleToggleCollapse}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
              >
                <path 
                  d="M12 6l-4 4-4-4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {processedMarkets.map(market => (
            <div key={market.id} className="border border-gray-100 rounded-lg overflow-hidden">
              {/* Market Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                <h4 className="font-medium text-gray-900">{market.name}</h4>
                <p className="text-sm text-gray-600">{market.description}</p>
              </div>

              {/* Split Layout */}
              <div className="grid grid-cols-2 divide-x divide-gray-100">
                {/* Under Column */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-red-600">Under</h5>
                    <span className="text-xs text-gray-500">
                      {market.underOdds.length} opções
                    </span>
                  </div>
                  <div className="space-y-2">
                    {market.underOdds.map((odd: any) => (
                      <OddsButton
                        key={odd.id}
                        label={odd.label}
                        odds={odd}
                        isSelected={selectedOdds.has(odd.id)}
                        onClick={() => toggleOdds(odd.id)}
                        className="w-full bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
                      />
                    ))}
                  </div>
                </div>

                {/* Over Column */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-green-600">Over</h5>
                    <span className="text-xs text-gray-500">
                      {market.overOdds.length} opções
                    </span>
                  </div>
                  <div className="space-y-2">
                    {market.overOdds.map((odd: any) => (
                      <OddsButton
                        key={odd.id}
                        label={odd.label}
                        odds={odd}
                        isSelected={selectedOdds.has(odd.id)}
                        onClick={() => toggleOdds(odd.id)}
                        className="w-full bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverUnderSplitGroup; 