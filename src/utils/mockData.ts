import { 
  Event, 
  Market, 
  Odds, 
  Selection, 
  Sport, 
  MarketType, 
  EventStatus, 
  BetType, 
  BetStatus,
  MockDataOptions 
} from '../types';
import { generateId, generateEventId, generateSelectionId } from './index';

// Dados de times por esporte
const footballTeams = [
  'Kansas City Chiefs', 'Buffalo Bills', 'Cincinnati Bengals', 'Denver Broncos',
  'New England Patriots', 'Pittsburgh Steelers', 'Baltimore Ravens', 'Cleveland Browns',
  'Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Tennessee Titans',
  'Las Vegas Raiders', 'Los Angeles Chargers', 'Miami Dolphins', 'New York Jets'
];

const basketballTeams = [
  'Los Angeles Lakers', 'Golden State Warriors', 'Boston Celtics', 'Brooklyn Nets',
  'Chicago Bulls', 'Miami Heat', 'Phoenix Suns', 'Milwaukee Bucks',
  'Philadelphia 76ers', 'Dallas Mavericks', 'Denver Nuggets', 'Memphis Grizzlies',
  'Sacramento Kings', 'Toronto Raptors', 'New York Knicks', 'Atlanta Hawks'
];

const soccerTeams = [
  'Real Madrid', 'Barcelona', 'Bayern Munich', 'Paris Saint-Germain',
  'Manchester City', 'Liverpool', 'Chelsea', 'Arsenal',
  'Juventus', 'AC Milan', 'Inter Milan', 'Napoli',
  'Atletico Madrid', 'Sevilla', 'Borussia Dortmund', 'Ajax'
];

const tennisPlayers = [
  'Novak Djokovic', 'Rafael Nadal', 'Roger Federer', 'Daniil Medvedev',
  'Stefanos Tsitsipas', 'Alexander Zverev', 'Carlos Alcaraz', 'Casper Ruud',
  'Serena Williams', 'Simona Halep', 'Naomi Osaka', 'Ashleigh Barty',
  'Aryna Sabalenka', 'Jessica Pegula', 'Coco Gauff', 'Iga Swiatek'
];

const leagues = {
  [Sport.FOOTBALL]: ['NFL', 'College Football', 'CFL'],
  [Sport.BASKETBALL]: ['NBA', 'NCAA Basketball', 'EuroLeague'],
  [Sport.SOCCER]: ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Champions League'],
  [Sport.TENNIS]: ['ATP Tour', 'WTA Tour', 'Grand Slam'],
  [Sport.BASEBALL]: ['MLB', 'Minor League', 'World Series'],
  [Sport.HOCKEY]: ['NHL', 'KHL', 'AHL'],
  [Sport.VOLLEYBALL]: ['FIVB', 'CEV', 'Superliga'],
  [Sport.BOXING]: ['WBC', 'WBA', 'IBF', 'WBO'],
  [Sport.MMA]: ['UFC', 'Bellator', 'ONE Championship'],
  [Sport.ESPORTS]: ['League of Legends', 'CS:GO', 'Dota 2', 'Valorant'],
  [Sport.OTHER]: ['Olympics', 'World Championships', 'Special Events']
};

// Função para gerar odds aleatórias
function generateRandomOdds(min: number = 1.5, max: number = 5.0): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

// Função para gerar estado das odds
function generateOddsState(): 'up' | 'down' | 'suspended' | 'locked' | 'normal' {
  const states = ['up', 'down', 'normal', 'normal', 'normal']; // Normal tem mais probabilidade
  return states[Math.floor(Math.random() * states.length)] as any;
}

// Função para gerar odds
function generateOdds(value?: number): Odds {
  const oddsValue = value || generateRandomOdds();
  return {
    id: generateId(),
    value: oddsValue,
    display: oddsValue.toFixed(2),
    state: generateOddsState(),
    trend: Math.random() > 0.5 ? 'up' : 'down',
    lastUpdated: new Date()
  };
}

// Função para gerar mercados por tipo
function generateMarketsByType(marketType: MarketType, eventId: string, sport: Sport): Market {
  const baseMarket = {
    id: generateId(),
    type: marketType,
    sport: sport,
    eventId: eventId,
    suspended: Math.random() > 0.9,
    featured: Math.random() > 0.7,
    minStake: 1,
    maxStake: 10000
  };

  switch (marketType) {
    case MarketType.MONEYLINE:
      return {
        ...baseMarket,
        name: 'Resultado Final',
        odds: [
          generateOdds(1.85),
          generateOdds(3.40),
          generateOdds(4.20)
        ]
      };

    case MarketType.SPREAD:
      return {
        ...baseMarket,
        name: 'Handicap',
        odds: [
          generateOdds(1.90),
          generateOdds(1.90)
        ]
      };

    case MarketType.TOTALS:
      return {
        ...baseMarket,
        name: 'Over/Under 2.5',
        odds: [
          generateOdds(1.80),
          generateOdds(2.00)
        ]
      };

    case MarketType.BOTH_TEAMS_SCORE:
      return {
        ...baseMarket,
        name: 'Ambas Marcam',
        odds: [
          generateOdds(1.70),
          generateOdds(2.10)
        ]
      };

    case MarketType.CORRECT_SCORE:
      return {
        ...baseMarket,
        name: 'Placar Exato',
        odds: [
          generateOdds(8.50),
          generateOdds(12.00),
          generateOdds(15.00),
          generateOdds(9.50),
          generateOdds(6.50),
          generateOdds(21.00)
        ]
      };

    case MarketType.DOUBLE_CHANCE:
      return {
        ...baseMarket,
        name: 'Dupla Chance',
        odds: [
          generateOdds(1.25),
          generateOdds(1.40),
          generateOdds(1.65)
        ]
      };

    case MarketType.FIRST_GOALSCORER:
      return {
        ...baseMarket,
        name: 'Primeiro Gol',
        odds: [
          generateOdds(4.50),
          generateOdds(5.00),
          generateOdds(6.50),
          generateOdds(7.00),
          generateOdds(8.50),
          generateOdds(12.00)
        ]
      };

    case MarketType.CORNERS:
      return {
        ...baseMarket,
        name: 'Total de Escanteios',
        odds: [
          generateOdds(1.85),
          generateOdds(1.95)
        ]
      };

    case MarketType.CARDS:
      return {
        ...baseMarket,
        name: 'Total de Cartões',
        odds: [
          generateOdds(1.75),
          generateOdds(2.05)
        ]
      };

    default:
      return {
        ...baseMarket,
        name: 'Mercado Especial',
        odds: [
          generateOdds(),
          generateOdds()
        ]
      };
  }
}

// Função para gerar evento
function generateEvent(sport: Sport, options: MockDataOptions = {}): Event {
  const teams = getTeamsBySport(sport);
  const homeTeam = teams[Math.floor(Math.random() * teams.length)];
  const awayTeam = teams[Math.floor(Math.random() * teams.length)];
  const startTime = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000); // Próximos 7 dias
  const eventId = generateEventId(homeTeam, awayTeam, startTime);
  const sportLeagues = leagues[sport];
  const league = sportLeagues[Math.floor(Math.random() * sportLeagues.length)];

  const event: Event = {
    id: eventId,
    name: `${homeTeam} vs ${awayTeam}`,
    homeTeam,
    awayTeam,
    sport,
    league,
    startTime,
    status: Math.random() > 0.8 ? EventStatus.LIVE : EventStatus.PREMATCH,
    markets: [],
    featured: Math.random() > 0.7,
    live: Math.random() > 0.8,
    prematch: Math.random() > 0.2
  };

  // Adicionar mercados básicos
  const basicMarkets = [
    MarketType.MONEYLINE,
    MarketType.SPREAD,
    MarketType.TOTALS,
    MarketType.BOTH_TEAMS_SCORE,
    MarketType.DOUBLE_CHANCE
  ];

  basicMarkets.forEach(marketType => {
    event.markets.push(generateMarketsByType(marketType, eventId, sport));
  });

  // Adicionar mercados especiais se solicitado
  if (options.includePlayerProps) {
    event.markets.push(generateMarketsByType(MarketType.FIRST_GOALSCORER, eventId, sport));
    event.markets.push(generateMarketsByType(MarketType.ANYTIME_GOALSCORER, eventId, sport));
  }

  // Adicionar estatísticas se live
  if (event.status === EventStatus.LIVE && options.includeStats) {
    event.score = {
      home: Math.floor(Math.random() * 4),
      away: Math.floor(Math.random() * 4),
      period: 'HT',
      minute: Math.floor(Math.random() * 90) + 1
    };

    event.stats = {
      possession: Math.floor(Math.random() * 100),
      shots: { home: Math.floor(Math.random() * 15), away: Math.floor(Math.random() * 15) },
      shotsOnTarget: { home: Math.floor(Math.random() * 8), away: Math.floor(Math.random() * 8) },
      corners: { home: Math.floor(Math.random() * 10), away: Math.floor(Math.random() * 10) },
      cards: { home: Math.floor(Math.random() * 5), away: Math.floor(Math.random() * 5) },
      fouls: { home: Math.floor(Math.random() * 20), away: Math.floor(Math.random() * 20) }
    };
  }

  return event;
}

// Função para obter times por esporte
function getTeamsBySport(sport: Sport): string[] {
  switch (sport) {
    case Sport.FOOTBALL:
      return footballTeams;
    case Sport.BASKETBALL:
      return basketballTeams;
    case Sport.SOCCER:
      return soccerTeams;
    case Sport.TENNIS:
      return tennisPlayers;
    default:
      return footballTeams;
  }
}

// Função principal para gerar dados mock
export function generateMockData(options: MockDataOptions = {}): Event[] {
  const {
    sport,
    eventCount = 20,
    includePlayerProps = true,
    includeLive = true,
    includeStats = true
  } = options;

  const events: Event[] = [];
  const sports = sport ? [sport] : Object.values(Sport);

  for (let i = 0; i < eventCount; i++) {
    const randomSport = sports[Math.floor(Math.random() * sports.length)];
    const event = generateEvent(randomSport, {
      includePlayerProps,
      includeLive,
      includeStats
    });
    events.push(event);
  }

  return events;
}

// Função para gerar eventos populares
export function generatePopularEvents(): Event[] {
  const popularEvents: Event[] = [];

  // Grandes jogos de futebol
  popularEvents.push(generateEvent(Sport.SOCCER, { includePlayerProps: true, includeLive: true }));
  popularEvents.push(generateEvent(Sport.SOCCER, { includePlayerProps: true, includeLive: true }));
  
  // Grandes jogos de basquete
  popularEvents.push(generateEvent(Sport.BASKETBALL, { includePlayerProps: true, includeLive: true }));
  
  // Grandes jogos de futebol americano
  popularEvents.push(generateEvent(Sport.FOOTBALL, { includePlayerProps: true, includeLive: true }));

  // Marcar todos como featured
  popularEvents.forEach(event => {
    event.featured = true;
  });

  return popularEvents;
}

// Função para gerar eventos ao vivo
export function generateLiveEvents(): Event[] {
  const liveEvents = generateMockData({ eventCount: 10, includeLive: true, includeStats: true });
  
  // Forçar todos os eventos como live
  liveEvents.forEach(event => {
    event.status = EventStatus.LIVE;
    event.live = true;
  });

  return liveEvents;
}

// Função para gerar mercados específicos
export function generateMarketsByCategory(category: 'main' | 'corners' | 'cards' | 'players'): Market[] {
  const markets: Market[] = [];
  const eventId = generateId();

  switch (category) {
    case 'main':
      markets.push(generateMarketsByType(MarketType.MONEYLINE, eventId, Sport.SOCCER));
      markets.push(generateMarketsByType(MarketType.TOTALS, eventId, Sport.SOCCER));
      markets.push(generateMarketsByType(MarketType.BOTH_TEAMS_SCORE, eventId, Sport.SOCCER));
      markets.push(generateMarketsByType(MarketType.DOUBLE_CHANCE, eventId, Sport.SOCCER));
      break;

    case 'corners':
      markets.push(generateMarketsByType(MarketType.CORNERS, eventId, Sport.SOCCER));
      break;

    case 'cards':
      markets.push(generateMarketsByType(MarketType.CARDS, eventId, Sport.SOCCER));
      break;

    case 'players':
      markets.push(generateMarketsByType(MarketType.FIRST_GOALSCORER, eventId, Sport.SOCCER));
      markets.push(generateMarketsByType(MarketType.ANYTIME_GOALSCORER, eventId, Sport.SOCCER));
      break;
  }

  return markets;
}

// Função para gerar seleções de exemplo
export function generateSampleSelections(): Selection[] {
  const events = generateMockData({ eventCount: 3 });
  const selections: Selection[] = [];

  events.forEach(event => {
    const market = event.markets[0];
    const odds = market.odds[0];
    
    selections.push({
      id: generateSelectionId(market.id, odds.id),
      marketId: market.id,
      name: `${event.homeTeam} Vitória`,
      odds: odds,
      selected: true,
      eventId: event.id,
      eventName: event.name,
      sport: event.sport,
      marketType: market.type,
      marketName: market.name,
      addedAt: new Date()
    });
  });

  return selections;
}

// Função para gerar dados de alta frequência (simulação tempo real)
export function generateHighFrequencyOddsUpdates(eventId: string): Odds[] {
  const odds: Odds[] = [];
  
  for (let i = 0; i < 20; i++) {
    odds.push({
      id: generateId(),
      value: generateRandomOdds(1.1, 10.0),
      display: '0.00',
      state: Math.random() > 0.7 ? 'up' : 'down',
      trend: Math.random() > 0.5 ? 'up' : 'down',
      lastUpdated: new Date(Date.now() - Math.random() * 60000) // Últimos minutos
    });
  }

  return odds;
}

// Função para gerar dados de teste A/B
export function generateABTestData() {
  return {
    layoutVariants: ['grid', 'list', 'accordion'],
    colorVariants: ['primary', 'secondary', 'accent'],
    buttonVariants: ['compact', 'expanded', 'minimal'],
    priceVariants: ['decimal', 'fractional', 'american']
  };
}

// Dados de exemplo para diferentes contextos
export const mockEventData = generateMockData({ eventCount: 50, includePlayerProps: true });
export const mockPopularEvents = generatePopularEvents();
export const mockLiveEvents = generateLiveEvents();
export const mockMainMarkets = generateMarketsByCategory('main');
export const mockPlayerMarkets = generateMarketsByCategory('players');
export const mockSampleSelections = generateSampleSelections();

// Configuração padrão para desenvolvimento
export const devConfig = {
  apiUrl: 'https://api.alfasportsbook.com',
  wsUrl: 'wss://ws.alfasportsbook.com',
  updateInterval: 2000,
  maxSelections: 15,
  minStake: 1,
  maxStake: 10000,
  maxWin: 50000,
  supportedSports: Object.values(Sport),
  supportedMarkets: Object.values(MarketType),
  defaultCurrency: 'BRL',
  defaultLanguage: 'pt-BR'
}; 