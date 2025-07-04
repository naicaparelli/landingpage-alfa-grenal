import { Event, Market, MarketType, Sport, EventStatus, Odds } from '../types';

export const betmasterEvent: Event = {
  id: 'real-madrid-vs-liverpool',
  name: 'Real Madrid vs Liverpool',
  homeTeam: 'Real Madrid',
  awayTeam: 'Liverpool',
  sport: Sport.SOCCER,
  league: 'UEFA Champions League',
  startTime: new Date('2024-12-15T20:00:00Z'),
  status: EventStatus.PREMATCH,
  score: {
    home: 0,
    away: 0
  },
  markets: [
    // 1x2 (Match Result)
    {
      id: 'match-result',
      name: 'Match Result',
      type: MarketType.MONEYLINE,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Main Markets',
      odds: [
        {
          id: 'home-win',
          value: 2.15,
          display: '2.15',
          state: 'normal'
        },
        {
          id: 'draw',
          value: 3.40,
          display: '3.40',
          state: 'normal'
        },
        {
          id: 'away-win',
          value: 3.20,
          display: '3.20',
          state: 'normal'
        }
      ]
    },
    // Double Chance
    {
      id: 'double-chance',
      name: 'Double Chance',
      type: MarketType.DOUBLE_CHANCE,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Main Markets',
      odds: [
        {
          id: '1x',
          value: 1.30,
          display: '1.30',
          state: 'normal'
        },
        {
          id: '12',
          value: 1.22,
          display: '1.22',
          state: 'normal'
        },
        {
          id: 'x2',
          value: 1.57,
          display: '1.57',
          state: 'normal'
        }
      ]
    },
    // Both Teams to Score
    {
      id: 'both-teams-score',
      name: 'Both Teams to Score',
      type: MarketType.BOTH_TEAMS_SCORE,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Goals',
      odds: [
        {
          id: 'yes',
          value: 1.75,
          display: '1.75',
          state: 'normal'
        },
        {
          id: 'no',
          value: 2.05,
          display: '2.05',
          state: 'normal'
        }
      ]
    },
    // Total Goals O/U 2.5
    {
      id: 'total-goals-2.5',
      name: 'Total Goals O/U 2.5',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Goals',
      odds: [
        {
          id: 'over-2.5',
          value: 1.85,
          display: '1.85',
          state: 'normal'
        },
        {
          id: 'under-2.5',
          value: 1.95,
          display: '1.95',
          state: 'normal'
        }
      ]
    },
    // Total Goals O/U 1.5
    {
      id: 'total-goals-1.5',
      name: 'Total Goals O/U 1.5',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Goals',
      odds: [
        {
          id: 'over-1.5',
          value: 1.25,
          display: '1.25',
          state: 'normal'
        },
        {
          id: 'under-1.5',
          value: 3.75,
          display: '3.75',
          state: 'normal'
        }
      ]
    },
    // Total Goals O/U 3.5
    {
      id: 'total-goals-3.5',
      name: 'Total Goals O/U 3.5',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Goals',
      odds: [
        {
          id: 'over-3.5',
          value: 2.65,
          display: '2.65',
          state: 'normal'
        },
        {
          id: 'under-3.5',
          value: 1.45,
          display: '1.45',
          state: 'normal'
        }
      ]
    },
    // 1st Half Result
    {
      id: '1st-half-result',
      name: '1st Half Result',
      type: MarketType.MONEYLINE,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Half Time',
      odds: [
        {
          id: '1h-home',
          value: 2.85,
          display: '2.85',
          state: 'normal'
        },
        {
          id: '1h-draw',
          value: 2.20,
          display: '2.20',
          state: 'normal'
        },
        {
          id: '1h-away',
          value: 4.10,
          display: '4.10',
          state: 'normal'
        }
      ]
    },
    // 1st Half Total Goals O/U 0.5
    {
      id: '1st-half-total-0.5',
      name: '1st Half Total Goals O/U 0.5',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Half Time',
      odds: [
        {
          id: '1h-over-0.5',
          value: 1.45,
          display: '1.45',
          state: 'normal'
        },
        {
          id: '1h-under-0.5',
          value: 2.75,
          display: '2.75',
          state: 'normal'
        }
      ]
    },
    // 1st Half Total Goals O/U 1.5
    {
      id: '1st-half-total-1.5',
      name: '1st Half Total Goals O/U 1.5',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Half Time',
      odds: [
        {
          id: '1h-over-1.5',
          value: 3.20,
          display: '3.20',
          state: 'normal'
        },
        {
          id: '1h-under-1.5',
          value: 1.35,
          display: '1.35',
          state: 'normal'
        }
      ]
    },
    // Correct Score
    {
      id: 'correct-score',
      name: 'Correct Score',
      type: MarketType.CORRECT_SCORE,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Score',
      odds: [
        {
          id: 'score-1-0',
          value: 9.50,
          display: '9.50',
          state: 'normal'
        },
        {
          id: 'score-2-0',
          value: 13.00,
          display: '13.00',
          state: 'normal'
        },
        {
          id: 'score-2-1',
          value: 11.00,
          display: '11.00',
          state: 'normal'
        },
        {
          id: 'score-1-1',
          value: 7.50,
          display: '7.50',
          state: 'normal'
        },
        {
          id: 'score-0-1',
          value: 11.00,
          display: '11.00',
          state: 'normal'
        },
        {
          id: 'score-0-2',
          value: 15.00,
          display: '15.00',
          state: 'normal'
        },
        {
          id: 'score-1-2',
          value: 13.50,
          display: '13.50',
          state: 'normal'
        },
        {
          id: 'score-0-0',
          value: 9.00,
          display: '9.00',
          state: 'normal'
        },
        {
          id: 'score-3-0',
          value: 25.00,
          display: '25.00',
          state: 'normal'
        },
        {
          id: 'score-3-1',
          value: 22.00,
          display: '22.00',
          state: 'normal'
        },
        {
          id: 'score-2-2',
          value: 18.00,
          display: '18.00',
          state: 'normal'
        },
        {
          id: 'score-0-3',
          value: 35.00,
          display: '35.00',
          state: 'normal'
        }
      ]
    },
    // Asian Handicap
    {
      id: 'asian-handicap',
      name: 'Asian Handicap',
      type: MarketType.HANDICAP,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Handicap',
      odds: [
        {
          id: 'ah-home',
          value: 1.90,
          display: '1.90',
          state: 'normal'
        },
        {
          id: 'ah-away',
          value: 1.90,
          display: '1.90',
          state: 'normal'
        }
      ]
    },
    // Corners Total O/U 9.5
    {
      id: 'corners-total-9.5',
      name: 'Corners Total O/U 9.5',
      type: MarketType.CORNERS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Corners',
      odds: [
        {
          id: 'corners-over-9.5',
          value: 1.85,
          display: '1.85',
          state: 'normal'
        },
        {
          id: 'corners-under-9.5',
          value: 1.95,
          display: '1.95',
          state: 'normal'
        }
      ]
    },
    // Cards Total O/U 3.5
    {
      id: 'cards-total-3.5',
      name: 'Cards Total O/U 3.5',
      type: MarketType.CARDS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Cards',
      odds: [
        {
          id: 'cards-over-3.5',
          value: 2.10,
          display: '2.10',
          state: 'normal'
        },
        {
          id: 'cards-under-3.5',
          value: 1.72,
          display: '1.72',
          state: 'normal'
        }
      ]
    },
    // First Goalscorer
    {
      id: 'first-goalscorer',
      name: 'First Goalscorer',
      type: MarketType.FIRST_GOALSCORER,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Player Props',
      odds: [
        {
          id: 'benzema',
          value: 4.50,
          display: '4.50',
          state: 'normal'
        },
        {
          id: 'salah',
          value: 5.00,
          display: '5.00',
          state: 'normal'
        },
        {
          id: 'mane',
          value: 6.50,
          display: '6.50',
          state: 'normal'
        },
        {
          id: 'vinicius',
          value: 5.50,
          display: '5.50',
          state: 'normal'
        },
        {
          id: 'no-goalscorer',
          value: 12.00,
          display: '12.00',
          state: 'normal'
        }
      ]
    },
    // Anytime Goalscorer
    {
      id: 'anytime-goalscorer',
      name: 'Anytime Goalscorer',
      type: MarketType.ANYTIME_GOALSCORER,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Player Props',
      odds: [
        {
          id: 'benzema-anytime',
          value: 2.20,
          display: '2.20',
          state: 'normal'
        },
        {
          id: 'salah-anytime',
          value: 2.50,
          display: '2.50',
          state: 'normal'
        },
        {
          id: 'mane-anytime',
          value: 3.10,
          display: '3.10',
          state: 'normal'
        },
        {
          id: 'vinicius-anytime',
          value: 2.80,
          display: '2.80',
          state: 'normal'
        },
        {
          id: 'modric-anytime',
          value: 6.00,
          display: '6.00',
          state: 'normal'
        },
        {
          id: 'firmino-anytime',
          value: 3.40,
          display: '3.40',
          state: 'normal'
        }
      ]
    },
    // Player Props - Chutes a Gol
    {
      id: 'shots-on-target',
      name: 'Chutes a Gol',
      type: MarketType.PLAYER_PROPS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Player Props',
      odds: [
        {
          id: 'benzema-shots-over-2.5',
          value: 2.40,
          display: '2.40',
          state: 'normal'
        },
        {
          id: 'salah-shots-over-2.5',
          value: 2.10,
          display: '2.10',
          state: 'normal'
        },
        {
          id: 'vinicius-shots-over-1.5',
          value: 1.85,
          display: '1.85',
          state: 'normal'
        },
        {
          id: 'mane-shots-over-1.5',
          value: 1.95,
          display: '1.95',
          state: 'normal'
        }
      ]
    },
    // Player Props - Assistências
    {
      id: 'assists',
      name: 'Assistências',
      type: MarketType.PLAYER_PROPS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Player Props',
      odds: [
        {
          id: 'modric-assists-over-0.5',
          value: 3.20,
          display: '3.20',
          state: 'normal'
        },
        {
          id: 'salah-assists-over-0.5',
          value: 2.80,
          display: '2.80',
          state: 'normal'
        },
        {
          id: 'henderson-assists-over-0.5',
          value: 4.50,
          display: '4.50',
          state: 'normal'
        },
        {
          id: 'kroos-assists-over-0.5',
          value: 3.60,
          display: '3.60',
          state: 'normal'
        }
      ]
    },
    // Player Props - Cartões
    {
      id: 'player-cards',
      name: 'Cartões de Jogador',
      type: MarketType.PLAYER_PROPS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Player Props',
      odds: [
        {
          id: 'casemiro-card',
          value: 2.50,
          display: '2.50',
          state: 'normal'
        },
        {
          id: 'fabinho-card',
          value: 2.80,
          display: '2.80',
          state: 'normal'
        },
        {
          id: 'alaba-card',
          value: 3.40,
          display: '3.40',
          state: 'normal'
        },
        {
          id: 'robertson-card',
          value: 3.20,
          display: '3.20',
          state: 'normal'
        }
      ]
    },
    // Player Props - Passes Certos
    {
      id: 'passes-completed',
      name: 'Passes Certos',
      type: MarketType.PLAYER_PROPS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Player Props',
      odds: [
        {
          id: 'modric-passes-over-60.5',
          value: 1.75,
          display: '1.75',
          state: 'normal'
        },
        {
          id: 'kroos-passes-over-65.5',
          value: 1.65,
          display: '1.65',
          state: 'normal'
        },
        {
          id: 'thiago-passes-over-50.5',
          value: 1.90,
          display: '1.90',
          state: 'normal'
        },
        {
          id: 'henderson-passes-over-45.5',
          value: 2.10,
          display: '2.10',
          state: 'normal'
        }
      ]
    },
    // Player Props - Desarmes
    {
      id: 'tackles',
      name: 'Desarmes',
      type: MarketType.PLAYER_PROPS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Player Props',
      odds: [
        {
          id: 'casemiro-tackles-over-2.5',
          value: 2.20,
          display: '2.20',
          state: 'normal'
        },
        {
          id: 'fabinho-tackles-over-2.5',
          value: 2.40,
          display: '2.40',
          state: 'normal'
        },
        {
          id: 'alaba-tackles-over-1.5',
          value: 1.85,
          display: '1.85',
          state: 'normal'
        },
        {
          id: 'robertson-tackles-over-1.5',
          value: 1.95,
          display: '1.95',
          state: 'normal'
        }
      ]
    },
    // Player Props - Marcar Gol (Sim/Não)
    {
      id: 'player-to-score',
      name: 'Marcar Gol',
      type: MarketType.PLAYER_PROPS,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Player Props',
      odds: [
        {
          id: 'benzema-to-score-yes',
          value: 2.20,
          display: '2.20',
          state: 'normal'
        },
        {
          id: 'benzema-to-score-no',
          value: 1.65,
          display: '1.65',
          state: 'normal'
        },
        {
          id: 'salah-to-score-yes',
          value: 2.50,
          display: '2.50',
          state: 'normal'
        },
        {
          id: 'salah-to-score-no',
          value: 1.50,
          display: '1.50',
          state: 'normal'
        },
        {
          id: 'vinicius-to-score-yes',
          value: 2.80,
          display: '2.80',
          state: 'normal'
        },
        {
          id: 'vinicius-to-score-no',
          value: 1.40,
          display: '1.40',
          state: 'normal'
        }
      ]
    },
    // Match Result & Both Teams to Score
    {
      id: 'result-btts',
      name: 'Result & Both Teams to Score',
      type: MarketType.COMBO,
      sport: Sport.SOCCER,
      eventId: 'real-madrid-vs-liverpool',
      category: 'Combo',
      odds: [
        {
          id: 'home-btts-yes',
          value: 4.20,
          display: '4.20',
          state: 'normal'
        },
        {
          id: 'home-btts-no',
          value: 4.50,
          display: '4.50',
          state: 'normal'
        },
        {
          id: 'draw-btts-yes',
          value: 8.00,
          display: '8.00',
          state: 'normal'
        },
        {
          id: 'draw-btts-no',
          value: 6.50,
          display: '6.50',
          state: 'normal'
        },
        {
          id: 'away-btts-yes',
          value: 6.00,
          display: '6.00',
          state: 'normal'
        },
        {
          id: 'away-btts-no',
          value: 5.50,
          display: '5.50',
          state: 'normal'
        }
      ]
    }
  ]
};

// Função para obter nome das seleções
export function getSelectionName(oddsId: string, marketType: MarketType): string {
  const nameMap: Record<string, string> = {
    // Match Result
    'home-win': 'Real Madrid',
    'draw': 'Empate',
    'away-win': 'Liverpool',
    
    // Double Chance - Labels descritivos
    '1x': 'Real Madrid ou Empate',
    '12': 'Real Madrid ou Liverpool',
    'x2': 'Empate ou Liverpool',
    
    // Both Teams to Score - Labels descritivos
    'yes': 'Ambas marcam',
    'no': 'Nem ambas marcam',
    
    // Totals - Labels descritivos
    'over-2.5': 'Mais de 2.5 gols',
    'under-2.5': 'Menos de 2.5 gols',
    'over-1.5': 'Mais de 1.5 gols',
    'under-1.5': 'Menos de 1.5 gols',
    'over-3.5': 'Mais de 3.5 gols',
    'under-3.5': 'Menos de 3.5 gols',
    
    // 1st Half
    '1h-home': 'Real Madrid',
    '1h-draw': 'Empate',
    '1h-away': 'Liverpool',
    '1h-over-0.5': 'Over 0.5',
    '1h-under-0.5': 'Under 0.5',
    '1h-over-1.5': 'Over 1.5',
    '1h-under-1.5': 'Under 1.5',
    
    // Correct Score - Labels descritivos
    'score-1-0': 'Real Madrid 1-0',
    'score-2-0': 'Real Madrid 2-0',
    'score-2-1': 'Real Madrid 2-1',
    'score-3-0': 'Real Madrid 3-0',
    'score-3-1': 'Real Madrid 3-1',
    'score-1-1': 'Empate 1-1',
    'score-2-2': 'Empate 2-2',
    'score-0-0': 'Empate 0-0',
    'score-0-1': 'Liverpool 0-1',
    'score-0-2': 'Liverpool 0-2',
    'score-1-2': 'Liverpool 1-2',
    'score-0-3': 'Liverpool 0-3',
    
    // Asian Handicap
    'ah-home': 'Real Madrid (-0.5)',
    'ah-away': 'Liverpool (+0.5)',
    
    // Corners - Labels descritivos
    'corners-over-9.5': 'Mais de 9.5 escanteios',
    'corners-under-9.5': 'Menos de 9.5 escanteios',
    
    // Cards - Labels descritivos
    'cards-over-3.5': 'Mais de 3.5 cartões',
    'cards-under-3.5': 'Menos de 3.5 cartões',
    
    // First Goalscorer - Labels descritivos
    'benzema': 'Karim Benzema',
    'salah': 'Mohamed Salah',
    'mane': 'Sadio Mané',
    'vinicius': 'Vinícius Jr.',
    'no-goalscorer': 'Nenhum gol marcado',
    
    // Anytime Goalscorer
    'benzema-anytime': 'Benzema',
    'salah-anytime': 'Salah',
    'mane-anytime': 'Mané',
    'vinicius-anytime': 'Vinicius Jr.',
    'modric-anytime': 'Modrić',
    'firmino-anytime': 'Firmino',
    
    // Combo
    'home-btts-yes': 'Real Madrid & Sim',
    'home-btts-no': 'Real Madrid & Não',
    'draw-btts-yes': 'Empate & Sim',
    'draw-btts-no': 'Empate & Não',
    'away-btts-yes': 'Liverpool & Sim',
    'away-btts-no': 'Liverpool & Não',
    
    // Player Props - Chutes a Gol
    'benzema-shots-over-2.5': 'Benzema +2.5 chutes',
    'salah-shots-over-2.5': 'Salah +2.5 chutes',
    'vinicius-shots-over-1.5': 'Vinicius +1.5 chutes',
    'mane-shots-over-1.5': 'Mané +1.5 chutes',
    
    // Player Props - Assistências
    'modric-assists-over-0.5': 'Modrić +0.5 assist',
    'salah-assists-over-0.5': 'Salah +0.5 assist',
    'henderson-assists-over-0.5': 'Henderson +0.5 assist',
    'kroos-assists-over-0.5': 'Kroos +0.5 assist',
    
    // Player Props - Cartões
    'casemiro-card': 'Casemiro levar cartão',
    'fabinho-card': 'Fabinho levar cartão',
    'alaba-card': 'Alaba levar cartão',
    'robertson-card': 'Robertson levar cartão',
    
    // Player Props - Passes Certos
    'modric-passes-over-60.5': 'Modrić +60.5 passes',
    'kroos-passes-over-65.5': 'Kroos +65.5 passes',
    'thiago-passes-over-50.5': 'Thiago +50.5 passes',
    'henderson-passes-over-45.5': 'Henderson +45.5 passes',
    
    // Player Props - Desarmes
    'casemiro-tackles-over-2.5': 'Casemiro +2.5 desarmes',
    'fabinho-tackles-over-2.5': 'Fabinho +2.5 desarmes',
    'alaba-tackles-over-1.5': 'Alaba +1.5 desarmes',
    'robertson-tackles-over-1.5': 'Robertson +1.5 desarmes',
    
    // Player Props - Marcar Gol
    'benzema-to-score-yes': 'Benzema marca - Sim',
    'benzema-to-score-no': 'Benzema marca - Não',
    'salah-to-score-yes': 'Salah marca - Sim',
    'salah-to-score-no': 'Salah marca - Não',
    'vinicius-to-score-yes': 'Vinicius marca - Sim',
    'vinicius-to-score-no': 'Vinicius marca - Não'
  };
  
  return nameMap[oddsId] || oddsId;
}

// Função para agrupar mercados por categoria
export function groupMarketsByCategory(markets: Market[]): Record<string, Market[]> {
  return markets.reduce((acc, market) => {
    const category = market.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(market);
    return acc;
  }, {} as Record<string, Market[]>);
} 