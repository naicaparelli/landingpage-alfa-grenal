import React, { useState } from 'react';
import { OddsButton } from '../core';
import { DescriptiveMarket } from '../../types';

interface ProbabilityTiersGroupProps {
  markets: DescriptiveMarket[];
  className?: string;
}

const ProbabilityTiersGroup: React.FC<ProbabilityTiersGroupProps> = ({
  markets,
  className = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedOdds, setSelectedOdds] = useState<Set<string>>(new Set());
  const [activeTier, setActiveTier] = useState<string>('favorites');

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

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Classificar apostas por probabilidade
  const categorizeProbability = (odds: number): 'favorites' | 'balanced' | 'longshots' => {
    if (odds <= 2.0) return 'favorites';
    if (odds <= 4.0) return 'balanced';
    return 'longshots';
  };

  const probabilityTiers = [
    {
      id: 'favorites',
      name: 'Favoritos',
      description: 'Odds baixas, alta probabilidade',
      icon: '🏆',
      color: 'from-green-500 to-green-600',
      range: '1.00 - 2.00',
      borderColor: 'border-green-200',
      bgColor: 'bg-green-50'
    },
    {
      id: 'balanced',
      name: 'Equilibrado',
      description: 'Odds médias, probabilidade moderada',
      icon: '⚖️',
      color: 'from-blue-500 to-blue-600',
      range: '2.01 - 4.00',
      borderColor: 'border-blue-200',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'longshots',
      name: 'Zebras',
      description: 'Odds altas, baixa probabilidade',
      icon: '🦓',
      color: 'from-red-500 to-red-600',
      range: '4.01+',
      borderColor: 'border-red-200',
      bgColor: 'bg-red-50'
    }
  ];

  // Agrupar odds por probabilidade
  const groupedOdds = markets.reduce((acc, market) => {
    market.odds.forEach(odd => {
      const tier = categorizeProbability(odd.odds);
      if (!acc[tier]) {
        acc[tier] = [];
      }
      acc[tier].push({
        ...odd,
        marketName: market.name,
        marketId: market.id
      });
    });
    return acc;
  }, {} as Record<string, Array<any>>);

  const activeTierData = probabilityTiers.find(tier => tier.id === activeTier);
  const activeTierOdds = groupedOdds[activeTier] || [];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Probability Tiers</h3>
            <p className="text-sm opacity-90">
              Por chance (favoritos, equilibrado, zebras)
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              {probabilityTiers.length} tiers
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
        <div className="p-4">
          {/* Tier Navigation */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {probabilityTiers.map(tier => {
              const tierOdds = groupedOdds[tier.id] || [];
              const isActive = activeTier === tier.id;
              
              return (
                <div
                  key={tier.id}
                  onClick={() => setActiveTier(tier.id)}
                  className={`cursor-pointer rounded-lg p-4 transition-all ${
                    isActive 
                      ? `bg-gradient-to-br ${tier.color} text-white shadow-lg` 
                      : `${tier.bgColor} ${tier.borderColor} border-2 hover:shadow-md`
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{tier.icon}</div>
                    <h4 className="font-semibold text-lg mb-1">{tier.name}</h4>
                    <p className={`text-sm mb-2 ${isActive ? 'opacity-90' : 'opacity-70'}`}>
                      {tier.description}
                    </p>
                    <div className={`text-xs font-mono ${isActive ? 'bg-white/20' : 'bg-white'} px-2 py-1 rounded`}>
                      {tier.range}
                    </div>
                    <div className="mt-2 text-sm font-medium">
                      {tierOdds.length} apostas
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tier Content */}
          {activeTierData && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${activeTierData.color} flex items-center justify-center text-white text-xl`}>
                  {activeTierData.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{activeTierData.name}</h4>
                  <p className="text-sm text-gray-600">{activeTierData.description}</p>
                </div>
              </div>

              {/* Odds */}
              {activeTierOdds.length > 0 ? (
                <div className="space-y-3">
                  {activeTierOdds
                    .sort((a, b) => a.odds - b.odds) // Ordenar por odds crescente
                    .map(odd => (
                      <div 
                        key={`${odd.marketId}-${odd.id}`} 
                        className={`border-2 rounded-lg p-3 transition-all ${
                          selectedOdds.has(odd.id) 
                            ? activeTierData.borderColor.replace('border-', 'border-2 border-') + ' bg-opacity-10' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">
                              {odd.marketName}
                            </div>
                            <div className="font-medium text-gray-900">
                              {odd.label}
                            </div>
                            <div className="text-sm text-gray-600">
                              {odd.description}
                            </div>
                          </div>
                          <div className="ml-4">
                            <OddsButton
                              label={odd.odds.toFixed(2)}
                              odds={{
                                id: odd.id,
                                value: odd.odds,
                                display: odd.odds.toFixed(2),
                                state: odd.state || 'normal'
                              }}
                              isSelected={selectedOdds.has(odd.id)}
                              onClick={() => toggleOdds(odd.id)}
                              className="min-w-[80px]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">{activeTierData.icon}</div>
                  <p className="text-lg font-medium mb-2">Nenhuma aposta neste tier</p>
                  <p className="text-sm">
                    Não há apostas na faixa de odds {activeTierData.range}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Probability Guide */}
          <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Guia de Probabilidade</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-green-600 text-lg font-bold mb-1">Favoritos</div>
                <div className="text-sm text-gray-600">
                  Odds baixas = alta probabilidade de acontecer
                </div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 text-lg font-bold mb-1">Equilibrado</div>
                <div className="text-sm text-gray-600">
                  Odds médias = probabilidade moderada
                </div>
              </div>
              <div className="text-center">
                <div className="text-red-600 text-lg font-bold mb-1">Zebras</div>
                <div className="text-sm text-gray-600">
                  Odds altas = baixa probabilidade, maior retorno
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProbabilityTiersGroup; 