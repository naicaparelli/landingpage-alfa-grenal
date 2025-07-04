import React, { useState } from 'react';
import { OddsButton } from '../core';
import { DescriptiveMarket } from '../../types';

interface QuickCombosGroupProps {
  markets: DescriptiveMarket[];
  className?: string;
}

const QuickCombosGroup: React.FC<QuickCombosGroupProps> = ({
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

  // Combinações pré-montadas
  const quickCombos = [
    {
      id: 'combo-1',
      name: 'Combo Favorito',
      description: 'Real Madrid vence + Over 2.5 gols',
      odds: 3.85,
      color: 'from-green-500 to-green-600',
      icon: '🏆'
    },
    {
      id: 'combo-2',
      name: 'Combo Equilibrado',
      description: 'Empate + Under 2.5 gols',
      odds: 6.80,
      color: 'from-blue-500 to-blue-600',
      icon: '⚖️'
    },
    {
      id: 'combo-3',
      name: 'Combo Zebra',
      description: 'Liverpool vence + Over 3.5 gols',
      odds: 8.96,
      color: 'from-red-500 to-red-600',
      icon: '🔥'
    },
    {
      id: 'combo-4',
      name: 'Combo Gols',
      description: 'Ambas marcam + Over 2.5 gols',
      odds: 3.20,
      color: 'from-yellow-500 to-yellow-600',
      icon: '⚽'
    },
    {
      id: 'combo-5',
      name: 'Combo Benzema',
      description: 'Benzema marca + Real Madrid vence',
      odds: 4.41,
      color: 'from-purple-500 to-purple-600',
      icon: '👑'
    },
    {
      id: 'combo-6',
      name: 'Combo Salah',
      description: 'Salah marca + Liverpool vence',
      odds: 5.50,
      color: 'from-red-500 to-pink-500',
      icon: '⚡'
    }
  ];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Quick Combos</h3>
            <p className="text-sm opacity-90">
              Apostas correlacionadas pré-montadas
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              {quickCombos.length} combos
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickCombos.map(combo => (
              <div 
                key={combo.id} 
                className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${combo.color} p-4 text-white cursor-pointer hover:shadow-lg transition-all duration-300 ${
                  selectedOdds.has(combo.id) ? 'ring-2 ring-white ring-offset-2' : ''
                }`}
                onClick={() => toggleOdds(combo.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{combo.icon}</span>
                      <h4 className="font-semibold text-lg">{combo.name}</h4>
                    </div>
                    <p className="text-sm opacity-90 mb-3 leading-relaxed">
                      {combo.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        Multiple
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {combo.odds.toFixed(2)}
                        </div>
                        <div className="text-xs opacity-75">
                          odds
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Selection Indicator */}
                {selectedOdds.has(combo.id) && (
                  <div className="absolute top-2 right-2 bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-orange-500 text-xl">💡</div>
              <div>
                <h4 className="font-semibold text-orange-800 mb-1">
                  Como funcionam os Quick Combos?
                </h4>
                <p className="text-sm text-orange-700 leading-relaxed">
                  Cada combo combina duas ou mais apostas relacionadas em uma única seleção. 
                  As odds são calculadas multiplicando as probabilidades individuais. 
                  Ideal para apostadores que querem maximizar retornos com correlações inteligentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickCombosGroup; 