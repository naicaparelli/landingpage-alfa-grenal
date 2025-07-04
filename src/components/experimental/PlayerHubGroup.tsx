import React, { useState } from 'react';
import { OddsButton } from '../core';
import { DescriptiveMarket } from '../../types';

interface PlayerHubGroupProps {
  markets: DescriptiveMarket[];
  className?: string;
}

const PlayerHubGroup: React.FC<PlayerHubGroupProps> = ({
  markets,
  className = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedOdds, setSelectedOdds] = useState<Set<string>>(new Set());
  const [activePlayer, setActivePlayer] = useState<string | null>(null);

  // Extrair jogadores únicos dos mercados
  const extractPlayers = () => {
    const players = new Set<string>();
    markets.forEach(market => {
      market.odds.forEach(odd => {
        // Procurar nomes de jogadores (assumindo que contém nome próprio)
        const playerNames = [
          'Benzema', 'Vinícius', 'Salah', 'Mané', 'Modrić', 'Firmino', 
          'Kroos', 'Henderson', 'Karim Benzema', 'Vinícius Jr.', 'Mohamed Salah',
          'Sadio Mané', 'Luka Modrić', 'Roberto Firmino', 'Toni Kroos', 'Jordan Henderson'
        ];
        
        playerNames.forEach(name => {
          if (odd.label.includes(name)) {
            players.add(name);
          }
        });
      });
    });
    return Array.from(players);
  };

  const players = extractPlayers();

  if (players.length === 0) {
    return null;
  }

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

  const getPlayerOdds = (playerName: string) => {
    const playerOdds: Array<{
      market: DescriptiveMarket;
      odd: any;
    }> = [];

    markets.forEach(market => {
      market.odds.forEach(odd => {
        if (odd.label.includes(playerName)) {
          playerOdds.push({ market, odd });
        }
      });
    });

    return playerOdds;
  };

  const getPlayerTeam = (playerName: string): string => {
    const realMadridPlayers = ['Benzema', 'Vinícius', 'Modrić', 'Kroos', 'Karim Benzema', 'Vinícius Jr.', 'Luka Modrić', 'Toni Kroos'];
    const liverpoolPlayers = ['Salah', 'Mané', 'Firmino', 'Henderson', 'Mohamed Salah', 'Sadio Mané', 'Roberto Firmino', 'Jordan Henderson'];
    
    if (realMadridPlayers.some(name => playerName.includes(name))) {
      return 'Real Madrid';
    } else if (liverpoolPlayers.some(name => playerName.includes(name))) {
      return 'Liverpool';
    }
    return 'Unknown';
  };

  const getTeamColor = (team: string): string => {
    switch (team) {
      case 'Real Madrid':
        return 'from-white to-purple-100';
      case 'Liverpool':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTeamTextColor = (team: string): string => {
    switch (team) {
      case 'Real Madrid':
        return 'text-purple-800';
      case 'Liverpool':
        return 'text-white';
      default:
        return 'text-white';
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Player Hub</h3>
            <p className="text-sm opacity-90">
              Agrupado por jogador com todas suas odds
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              {players.length} jogadores
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
          {/* Player Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-200 pb-3">
            {players.map(player => {
              const team = getPlayerTeam(player);
              const teamColor = getTeamColor(team);
              const textColor = getTeamTextColor(team);
              
              return (
                <button
                  key={player}
                  onClick={() => setActivePlayer(activePlayer === player ? null : player)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activePlayer === player
                      ? `bg-gradient-to-r ${teamColor} ${textColor} shadow-md`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-sm font-semibold">{player}</div>
                  <div className="text-xs opacity-75">{team}</div>
                </button>
              );
            })}
          </div>

          {/* Player Details */}
          {activePlayer && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getTeamColor(getPlayerTeam(activePlayer))}`}></div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {activePlayer} - {getPlayerTeam(activePlayer)}
                </h4>
              </div>

              {/* Player Odds */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getPlayerOdds(activePlayer).map(({ market, odd }, index) => (
                  <div key={`${market.id}-${odd.id}`} className="border border-gray-200 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      {market.name}
                    </div>
                    <OddsButton
                      label={odd.label}
                      odds={odd}
                      isSelected={selectedOdds.has(odd.id)}
                      onClick={() => toggleOdds(odd.id)}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>

              {getPlayerOdds(activePlayer).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhuma odd encontrada para este jogador</p>
                </div>
              )}
            </div>
          )}

          {/* Default View */}
          {!activePlayer && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">👤</div>
              <p className="text-lg font-medium mb-2">Selecione um jogador</p>
              <p className="text-sm">Clique em um jogador acima para ver todas as suas odds</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerHubGroup; 