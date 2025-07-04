import React, { useState } from 'react';
import { OddsButton } from '../core';
import { DescriptiveMarket } from '../../types';

interface HeadToHeadGroupProps {
  markets: DescriptiveMarket[];
  className?: string;
}

const HeadToHeadGroup: React.FC<HeadToHeadGroupProps> = ({
  markets,
  className = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedOdds, setSelectedOdds] = useState<Set<string>>(new Set());

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

  // Configuração dos times
  const teams = {
    home: {
      name: 'Real Madrid',
      flag: '🏳️',
      color: 'from-white to-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-300'
    },
    away: {
      name: 'Liverpool',
      flag: '🔴',
      color: 'from-red-500 to-red-600',
      textColor: 'text-white',
      borderColor: 'border-red-300'
    }
  };

  // Mercados head-to-head comparativos
  const headToHeadCategories = [
    {
      id: 'match-winner',
      name: 'Vencedor da Partida',
      markets: markets.filter(m => m.id === 'match-result')
    },
    {
      id: 'goals',
      name: 'Mercados de Gols',
      markets: markets.filter(m => m.category === 'goals')
    },
    {
      id: 'players',
      name: 'Jogadores',
      markets: markets.filter(m => m.category === 'players')
    },
    {
      id: 'match-stats',
      name: 'Estatísticas',
      markets: markets.filter(m => m.category === 'corners' || m.category === 'cards')
    }
  ];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Head-to-Head</h3>
            <p className="text-sm opacity-90">
              Comparação direta entre times
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              {headToHeadCategories.length} categorias
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
          {/* Team Headers */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className={`bg-gradient-to-br ${teams.home.color} p-4 rounded-lg border-2 ${teams.home.borderColor}`}>
              <div className="text-center">
                <div className="text-3xl mb-2">{teams.home.flag}</div>
                <h3 className={`text-xl font-bold ${teams.home.textColor}`}>
                  {teams.home.name}
                </h3>
                <div className={`text-sm ${teams.home.textColor} opacity-75`}>
                  Casa
                </div>
              </div>
            </div>
            
            <div className={`bg-gradient-to-br ${teams.away.color} p-4 rounded-lg border-2 ${teams.away.borderColor}`}>
              <div className="text-center">
                <div className="text-3xl mb-2">{teams.away.flag}</div>
                <h3 className={`text-xl font-bold ${teams.away.textColor}`}>
                  {teams.away.name}
                </h3>
                <div className={`text-sm ${teams.away.textColor} opacity-75`}>
                  Visitante
                </div>
              </div>
            </div>
          </div>

          {/* Head-to-Head Categories */}
          <div className="space-y-6">
            {headToHeadCategories.map(category => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {category.name}
                </h4>
                
                {category.markets.map(market => (
                  <div key={market.id} className="mb-4 last:mb-0">
                    <div className="text-sm font-medium text-gray-700 mb-3">
                      {market.name}
                    </div>
                    
                    {/* Head-to-Head Layout */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Home Team Side */}
                      <div className="space-y-2">
                        <div className="text-center text-sm font-medium text-purple-700 mb-2">
                          {teams.home.name}
                        </div>
                        {market.odds
                          .filter(odd => 
                            odd.label.toLowerCase().includes('real') ||
                            odd.label.toLowerCase().includes('madrid') ||
                            odd.label.toLowerCase().includes('benzema') ||
                            odd.label.toLowerCase().includes('vinícius') ||
                            odd.label.toLowerCase().includes('modrić') ||
                            odd.label.toLowerCase().includes('kroos')
                          )
                          .map(odd => (
                            <OddsButton
                              key={odd.id}
                              label={odd.label}
                              odds={{
                                id: odd.id,
                                value: odd.odds,
                                display: odd.odds.toFixed(2),
                                state: odd.state || 'normal'
                              }}
                              isSelected={selectedOdds.has(odd.id)}
                              onClick={() => toggleOdds(odd.id)}
                              className="w-full bg-purple-50 hover:bg-purple-100 border-purple-200"
                            />
                          ))
                        }
                      </div>

                      {/* Away Team Side */}
                      <div className="space-y-2">
                        <div className="text-center text-sm font-medium text-red-700 mb-2">
                          {teams.away.name}
                        </div>
                        {market.odds
                          .filter(odd => 
                            odd.label.toLowerCase().includes('liverpool') ||
                            odd.label.toLowerCase().includes('salah') ||
                            odd.label.toLowerCase().includes('mané') ||
                            odd.label.toLowerCase().includes('firmino') ||
                            odd.label.toLowerCase().includes('henderson')
                          )
                          .map(odd => (
                            <OddsButton
                              key={odd.id}
                              label={odd.label}
                              odds={{
                                id: odd.id,
                                value: odd.odds,
                                display: odd.odds.toFixed(2),
                                state: odd.state || 'normal'
                              }}
                              isSelected={selectedOdds.has(odd.id)}
                              onClick={() => toggleOdds(odd.id)}
                              className="w-full bg-red-50 hover:bg-red-100 border-red-200"
                            />
                          ))
                        }
                      </div>
                    </div>

                    {/* Neutral/Draw Options */}
                    {market.odds.filter(odd => 
                      odd.label.toLowerCase().includes('empate') ||
                      odd.label.toLowerCase().includes('draw') ||
                      odd.label.toLowerCase().includes('ambas') ||
                      odd.label.toLowerCase().includes('over') ||
                      odd.label.toLowerCase().includes('under') ||
                      odd.label.toLowerCase().includes('mais') ||
                      odd.label.toLowerCase().includes('menos')
                    ).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-center text-sm font-medium text-gray-700 mb-2">
                          Opções Neutras
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {market.odds
                            .filter(odd => 
                              odd.label.toLowerCase().includes('empate') ||
                              odd.label.toLowerCase().includes('draw') ||
                              odd.label.toLowerCase().includes('ambas') ||
                              odd.label.toLowerCase().includes('over') ||
                              odd.label.toLowerCase().includes('under') ||
                              odd.label.toLowerCase().includes('mais') ||
                              odd.label.toLowerCase().includes('menos')
                            )
                            .map(odd => (
                              <OddsButton
                                key={odd.id}
                                label={odd.label}
                                odds={{
                                  id: odd.id,
                                  value: odd.odds,
                                  display: odd.odds.toFixed(2),
                                  state: odd.state || 'normal'
                                }}
                                isSelected={selectedOdds.has(odd.id)}
                                onClick={() => toggleOdds(odd.id)}
                                className="bg-gray-50 hover:bg-gray-100 border-gray-200"
                              />
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {category.markets.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Nenhum mercado disponível para esta categoria</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Match Statistics */}
          <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Estatísticas do Confronto</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-purple-600 text-lg font-bold mb-1">Real Madrid</div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>15 títulos da Champions</div>
                  <div>Última final: 2022</div>
                  <div>Casa: Santiago Bernabéu</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-red-600 text-lg font-bold mb-1">Liverpool</div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>6 títulos da Champions</div>
                  <div>Última final: 2022</div>
                  <div>Casa: Anfield</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadToHeadGroup; 