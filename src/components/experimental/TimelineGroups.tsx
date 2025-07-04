import React, { useState } from 'react';
import { OddsButton } from '../core';
import { DescriptiveMarket } from '../../types';

interface TimelineGroupsProps {
  markets: DescriptiveMarket[];
  className?: string;
}

const TimelineGroups: React.FC<TimelineGroupsProps> = ({
  markets,
  className = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedOdds, setSelectedOdds] = useState<Set<string>>(new Set());
  const [activeTimeline, setActiveTimeline] = useState<string>('full-time');

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

  // Agrupar mercados por tempo
  const timelineGroups = [
    {
      id: 'full-time',
      name: 'Tempo Integral',
      description: '90 minutos + acréscimos',
      icon: '⏰',
      color: 'from-blue-500 to-blue-600',
      markets: markets.filter(market => 
        !market.name.toLowerCase().includes('1º tempo') && 
        !market.name.toLowerCase().includes('2º tempo') &&
        !market.name.toLowerCase().includes('half')
      )
    },
    {
      id: 'first-half',
      name: '1º Tempo',
      description: 'Primeiros 45 minutos',
      icon: '1️⃣',
      color: 'from-green-500 to-green-600',
      markets: markets.filter(market => 
        market.name.toLowerCase().includes('1º tempo') ||
        market.name.toLowerCase().includes('first half') ||
        market.name.toLowerCase().includes('intervalo')
      )
    },
    {
      id: 'second-half',
      name: '2º Tempo',
      description: 'Últimos 45 minutos',
      icon: '2️⃣',
      color: 'from-orange-500 to-orange-600',
      markets: markets.filter(market => 
        market.name.toLowerCase().includes('2º tempo') ||
        market.name.toLowerCase().includes('second half')
      )
    },
    {
      id: 'live-betting',
      name: 'Live Betting',
      description: 'Apostas ao vivo',
      icon: '🔴',
      color: 'from-red-500 to-red-600',
      markets: [] // Placeholder para mercados ao vivo
    }
  ];

  const activeGroup = timelineGroups.find(group => group.id === activeTimeline);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Timeline Groups</h3>
            <p className="text-sm opacity-90">
              Por tempo de jogo (1º tempo, 2º tempo)
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              {timelineGroups.length} grupos
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
          {/* Timeline Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {timelineGroups.map(group => (
              <button
                key={group.id}
                onClick={() => setActiveTimeline(group.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTimeline === group.id
                    ? `bg-gradient-to-r ${group.color} text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{group.icon}</span>
                  <div>
                    <div className="text-sm font-semibold">{group.name}</div>
                    <div className="text-xs opacity-75">{group.markets.length} mercados</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Timeline Content */}
          {activeGroup && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${activeGroup.color} flex items-center justify-center text-white text-xl`}>
                  {activeGroup.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{activeGroup.name}</h4>
                  <p className="text-sm text-gray-600">{activeGroup.description}</p>
                </div>
              </div>

              {/* Markets */}
              {activeGroup.markets.length > 0 ? (
                <div className="space-y-4">
                  {activeGroup.markets.map(market => (
                    <div key={market.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h5 className="font-medium text-gray-900">{market.name}</h5>
                          <p className="text-sm text-gray-600">{market.description}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {market.odds.length} opções
                        </div>
                      </div>
                      
                                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                         {market.odds.map(odd => (
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
                           />
                         ))}
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">{activeGroup.icon}</div>
                  <p className="text-lg font-medium mb-2">
                    {activeGroup.id === 'live-betting' ? 'Apostas ao vivo não disponíveis' : 'Nenhum mercado disponível'}
                  </p>
                  <p className="text-sm">
                    {activeGroup.id === 'live-betting' 
                      ? 'As apostas ao vivo aparecerão aqui durante a partida'
                      : 'Não há mercados para este período de tempo'
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Timeline Visualization */}
          <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Linha do Tempo da Partida</h4>
            <div className="relative">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                  <div className="text-xs font-medium text-gray-600">0'</div>
                  <div className="text-xs text-gray-500">Início</div>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                  <div className="text-xs font-medium text-gray-600">45'</div>
                  <div className="text-xs text-gray-500">Intervalo</div>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                  <div className="text-xs font-medium text-gray-600">45'</div>
                  <div className="text-xs text-gray-500">2º Tempo</div>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
                  <div className="text-xs font-medium text-gray-600">90'</div>
                  <div className="text-xs text-gray-500">Final</div>
                </div>
              </div>
              <div className="absolute top-1.5 left-0 right-0 h-0.5 bg-gray-300 -z-10"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineGroups; 