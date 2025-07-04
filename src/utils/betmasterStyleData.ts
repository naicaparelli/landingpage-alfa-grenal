import { Event, Market, MarketType, Sport, EventStatus, Odds } from '../types';

export const betmasterStyleEvent: Event = {
  id: 'event-betmaster-style',
  name: 'Real Madrid vs Liverpool',
  homeTeam: 'Real Madrid',
  awayTeam: 'Liverpool',
  sport: Sport.SOCCER,
  league: 'Champions League',
  startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
  status: EventStatus.PREMATCH,
  score: {
    home: 0,
    away: 0
  },
  markets: [
    // 1st Half - Total Goals
    {
      id: 'market-1st-half-total-0.5',
      name: '1st Half - Total Goals 0.5',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: '1st Half Totals',
      odds: [
        {
          id: 'over-0.5-1h',
          value: 1.45,
          display: '1.45',
          state: 'normal'
        },
        {
          id: 'under-0.5-1h',
          value: 2.75,
          display: '2.75',
          state: 'normal'
        }
      ]
    },
    {
      id: 'market-1st-half-total-1',
      name: '1st Half - Total Goals 1',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: '1st Half Totals',
      odds: [
        {
          id: 'over-1-1h',
          value: 2.10,
          display: '2.10',
          state: 'normal'
        },
        {
          id: 'under-1-1h',
          value: 1.72,
          display: '1.72',
          state: 'normal'
        }
      ]
    },
    {
      id: 'market-1st-half-total-1.5',
      name: '1st Half - Total Goals 1.5',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: '1st Half Totals',
      odds: [
        {
          id: 'over-1.5-1h',
          value: 3.20,
          display: '3.20',
          state: 'normal'
        },
        {
          id: 'under-1.5-1h',
          value: 1.35,
          display: '1.35',
          state: 'normal'
        }
      ]
    },
    {
      id: 'market-1st-half-total-2',
      name: '1st Half - Total Goals 2',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: '1st Half Totals',
      odds: [
        {
          id: 'over-2-1h',
          value: 5.50,
          display: '5.50',
          state: 'normal'
        },
        {
          id: 'under-2-1h',
          value: 1.15,
          display: '1.15',
          state: 'normal'
        }
      ]
    },
    {
      id: 'market-1st-half-total-2.5',
      name: '1st Half - Total Goals 2.5',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: '1st Half Totals',
      odds: [
        {
          id: 'over-2.5-1h',
          value: 9.00,
          display: '9.00',
          state: 'normal'
        },
        {
          id: 'under-2.5-1h',
          value: 1.05,
          display: '1.05',
          state: 'normal'
        }
      ]
    },
    {
      id: 'market-1st-half-total-3',
      name: '1st Half - Total Goals 3',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: '1st Half Totals',
      odds: [
        {
          id: 'over-3-1h',
          value: 18.00,
          display: '18.00',
          state: 'normal'
        },
        {
          id: 'under-3-1h',
          value: 1.02,
          display: '1.02',
          state: 'normal'
        }
      ]
    },
    // 2nd Half - Total Goals (similar structure)
    {
      id: 'market-2nd-half-total-0.5',
      name: '2nd Half - Total Goals 0.5',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: '2nd Half Totals',
      odds: [
        {
          id: 'over-0.5-2h',
          value: 1.55,
          display: '1.55',
          state: 'normal'
        },
        {
          id: 'under-0.5-2h',
          value: 2.45,
          display: '2.45',
          state: 'normal'
        }
      ]
    },
    {
      id: 'market-2nd-half-total-1',
      name: '2nd Half - Total Goals 1',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: '2nd Half Totals',
      odds: [
        {
          id: 'over-1-2h',
          value: 2.25,
          display: '2.25',
          state: 'normal'
        },
        {
          id: 'under-1-2h',
          value: 1.65,
          display: '1.65',
          state: 'normal'
        }
      ]
    },
    {
      id: 'market-2nd-half-total-1.5',
      name: '2nd Half - Total Goals 1.5',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: '2nd Half Totals',
      odds: [
        {
          id: 'over-1.5-2h',
          value: 3.50,
          display: '3.50',
          state: 'normal'
        },
        {
          id: 'under-1.5-2h',
          value: 1.30,
          display: '1.30',
          state: 'normal'
        }
      ]
    },
    {
      id: 'market-2nd-half-total-2',
      name: '2nd Half - Total Goals 2',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: '2nd Half Totals',
      odds: [
        {
          id: 'over-2-2h',
          value: 6.00,
          display: '6.00',
          state: 'normal'
        },
        {
          id: 'under-2-2h',
          value: 1.12,
          display: '1.12',
          state: 'normal'
        }
      ]
    },
    {
      id: 'market-2nd-half-total-2.5',
      name: '2nd Half - Total Goals 2.5',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: '2nd Half Totals',
      odds: [
        {
          id: 'over-2.5-2h',
          value: 10.00,
          display: '10.00',
          state: 'normal'
        },
        {
          id: 'under-2.5-2h',
          value: 1.04,
          display: '1.04',
          state: 'normal'
        }
      ]
    },
    {
      id: 'market-2nd-half-total-3',
      name: '2nd Half - Total Goals 3',
      type: MarketType.TOTALS,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: '2nd Half Totals',
      odds: [
        {
          id: 'over-3-2h',
          value: 20.00,
          display: '20.00',
          state: 'normal'
        },
        {
          id: 'under-3-2h',
          value: 1.01,
          display: '1.01',
          state: 'normal'
        }
      ]
    },
    // Match Result
    {
      id: 'market-match-result',
      name: 'Match Result',
      type: MarketType.MONEYLINE,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: 'Main',
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
      id: 'market-double-chance',
      name: 'Double Chance',
      type: MarketType.DOUBLE_CHANCE,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
      category: 'Main',
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
      id: 'market-both-teams-score',
      name: 'Both Teams to Score',
      type: MarketType.BOTH_TEAMS_SCORE,
      sport: Sport.SOCCER,
      eventId: 'event-betmaster-style',
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
    }
  ]
};

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

// Função para formatar nome do mercado para exibição compacta
export function formatMarketName(marketName: string): string {
  return marketName
    .replace('1st Half - Total Goals ', 'O/U ')
    .replace('2nd Half - Total Goals ', '2H O/U ')
    .replace(' Goals', '');
}

// Função para obter label do over/under
export function getOverUnderLabel(odds: Odds, marketName: string): string {
  const value = marketName.match(/(\d+(?:\.\d+)?)/)?.[1];
  if (odds.id.includes('over')) {
    return `Over ${value}`;
  } else if (odds.id.includes('under')) {
    return `Under ${value}`;
  }
  return odds.display;
} 