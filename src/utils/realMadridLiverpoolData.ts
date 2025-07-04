import { Event, Market, Odds, Sport, MarketType, EventStatus, LayoutType, DescriptiveMarket } from '../types';
import { generateId, generateEventId } from './index';

// Função para gerar odds com valores específicos
function createOdds(value: number, state: 'up' | 'down' | 'normal' = 'normal'): Odds {
  return {
    id: generateId(),
    value,
    display: value.toFixed(2),
    state,
    trend: Math.random() > 0.5 ? 'up' : 'down',
    lastUpdated: new Date()
  };
}

// Dados específicos do Real Madrid vs Liverpool
export const realMadridLiverpoolEvent: Event = {
  id: generateEventId('Real Madrid', 'Liverpool', new Date('2024-04-15T20:00:00')),
  name: 'Real Madrid vs Liverpool',
  homeTeam: 'Real Madrid',
  awayTeam: 'Liverpool',
  sport: Sport.SOCCER,
  league: 'Champions League',
  startTime: new Date('2024-04-15T20:00:00'),
  status: EventStatus.PREMATCH,
  featured: true,
  live: false,
  prematch: true,
  venue: 'Santiago Bernabéu',
  markets: []
};

// Mercados com layouts específicos otimizados
export const realMadridLiverpoolMarkets: DescriptiveMarket[] = [
  {
    id: 'match-result',
    name: 'Resultado Final',
    description: 'Vencedor da partida em 90 minutos',
    odds: [
      { id: 'home', label: 'Real Madrid', description: 'Vitória do Real Madrid', odds: 2.10 },
      { id: 'draw', label: 'Empate', description: 'Empate em 90 minutos', odds: 3.40 },
      { id: 'away', label: 'Liverpool', description: 'Vitória do Liverpool', odds: 3.25 }
    ],
    category: 'main'
  },
  {
    id: 'double-chance',
    name: 'Dupla Chance',
    description: 'Duas opções em uma aposta',
    odds: [
      { id: '1x', label: '1X', description: 'Real Madrid vence ou empata', odds: 1.30 },
      { id: 'x2', label: 'X2', description: 'Liverpool vence ou empata', odds: 1.62 },
      { id: '12', label: '12', description: 'Real Madrid ou Liverpool vence', odds: 1.22 }
    ],
    category: 'main'
  },
  {
    id: 'total-goals',
    name: 'Total de Gols',
    description: 'Número total de gols na partida',
    odds: [
      { id: 'over-15', label: 'Mais de 1.5', description: '2 ou mais gols na partida', odds: 1.22 },
      { id: 'under-15', label: 'Menos de 1.5', description: '0 ou 1 gol na partida', odds: 4.20 },
      { id: 'over-25', label: 'Mais de 2.5', description: '3 ou mais gols na partida', odds: 1.83 },
      { id: 'under-25', label: 'Menos de 2.5', description: '0, 1 ou 2 gols na partida', odds: 1.95 },
      { id: 'over-35', label: 'Mais de 3.5', description: '4 ou mais gols na partida', odds: 3.10 },
      { id: 'under-35', label: 'Menos de 3.5', description: '0, 1, 2 ou 3 gols na partida', odds: 1.36 }
    ],
    category: 'goals'
  },
  {
    id: 'both-teams-score',
    name: 'Ambas as Equipes Marcam',
    description: 'Ambos os times fazem pelo menos 1 gol',
    odds: [
      { id: 'yes', label: 'Sim', description: 'Real Madrid e Liverpool marcam', odds: 1.57 },
      { id: 'no', label: 'Não', description: 'Pelo menos um time não marca', odds: 2.35 }
    ],
    category: 'goals'
  },
  {
    id: 'exact-score',
    name: 'Placar Exato',
    description: 'Resultado exato da partida',
    odds: [
      { id: '1-0', label: '1-0', description: 'Real Madrid 1 x 0 Liverpool', odds: 8.50 },
      { id: '2-0', label: '2-0', description: 'Real Madrid 2 x 0 Liverpool', odds: 11.00 },
      { id: '2-1', label: '2-1', description: 'Real Madrid 2 x 1 Liverpool', odds: 9.00 },
      { id: '3-0', label: '3-0', description: 'Real Madrid 3 x 0 Liverpool', odds: 21.00 },
      { id: '3-1', label: '3-1', description: 'Real Madrid 3 x 1 Liverpool', odds: 19.00 },
      { id: '3-2', label: '3-2', description: 'Real Madrid 3 x 2 Liverpool', odds: 26.00 },
      { id: '0-0', label: '0-0', description: 'Empate sem gols', odds: 9.00 },
      { id: '1-1', label: '1-1', description: 'Empate 1 x 1', odds: 6.50 },
      { id: '2-2', label: '2-2', description: 'Empate 2 x 2', odds: 13.00 },
      { id: '0-1', label: '0-1', description: 'Liverpool 1 x 0 Real Madrid', odds: 9.50 },
      { id: '0-2', label: '0-2', description: 'Liverpool 2 x 0 Real Madrid', odds: 13.00 },
      { id: '1-2', label: '1-2', description: 'Liverpool 2 x 1 Real Madrid', odds: 10.00 },
      { id: '0-3', label: '0-3', description: 'Liverpool 3 x 0 Real Madrid', odds: 26.00 },
      { id: '1-3', label: '1-3', description: 'Liverpool 3 x 1 Real Madrid', odds: 23.00 },
      { id: '2-3', label: '2-3', description: 'Liverpool 3 x 2 Real Madrid', odds: 29.00 }
    ],
    category: 'score'
  },
  {
    id: 'first-goalscorer',
    name: 'Primeiro Gol',
    description: 'Quem marca o primeiro gol da partida',
    odds: [
      { id: 'benzema', label: 'Karim Benzema', description: 'Benzema marca primeiro', odds: 4.50 },
      { id: 'vinicius', label: 'Vinícius Jr.', description: 'Vinícius marca primeiro', odds: 5.00 },
      { id: 'salah', label: 'Mohamed Salah', description: 'Salah marca primeiro', odds: 5.50 },
      { id: 'mane', label: 'Sadio Mané', description: 'Mané marca primeiro', odds: 6.00 },
      { id: 'modric', label: 'Luka Modrić', description: 'Modrić marca primeiro', odds: 12.00 },
      { id: 'firmino', label: 'Roberto Firmino', description: 'Firmino marca primeiro', odds: 7.00 },
      { id: 'no-goal', label: 'Sem Gols', description: 'Nenhum gol na partida', odds: 15.00 }
    ],
    category: 'players'
  },
  {
    id: 'asian-handicap',
    name: 'Handicap Asiático',
    description: 'Handicap com devolução parcial',
    odds: [
      { id: 'real-minus-05', label: 'Real Madrid -0.5', description: 'Real precisa vencer', odds: 1.95 },
      { id: 'real-0', label: 'Real Madrid 0.0', description: 'Real vence ou empate = devolução', odds: 1.83 },
      { id: 'real-plus-05', label: 'Real Madrid +0.5', description: 'Real não pode perder', odds: 2.10 },
      { id: 'liverpool-minus-05', label: 'Liverpool -0.5', description: 'Liverpool precisa vencer', odds: 2.05 },
      { id: 'liverpool-0', label: 'Liverpool 0.0', description: 'Liverpool vence ou empate = devolução', odds: 1.88 },
      { id: 'liverpool-plus-05', label: 'Liverpool +0.5', description: 'Liverpool não pode perder', odds: 1.95 }
    ],
    category: 'handicap'
  },
  {
    id: 'corners',
    name: 'Escanteios',
    description: 'Total de escanteios na partida',
    odds: [
      { id: 'over-85', label: 'Mais de 8.5', description: '9 ou mais escanteios', odds: 1.70 },
      { id: 'under-85', label: 'Menos de 8.5', description: '0 a 8 escanteios', odds: 2.05 },
      { id: 'over-95', label: 'Mais de 9.5', description: '10 ou mais escanteios', odds: 1.95 },
      { id: 'under-95', label: 'Menos de 9.5', description: '0 a 9 escanteios', odds: 1.80 },
      { id: 'over-105', label: 'Mais de 10.5', description: '11 ou mais escanteios', odds: 2.25 },
      { id: 'under-105', label: 'Menos de 10.5', description: '0 a 10 escanteios', odds: 1.60 },
      { id: 'over-115', label: 'Mais de 11.5', description: '12 ou mais escanteios', odds: 2.80 },
      { id: 'under-115', label: 'Menos de 11.5', description: '0 a 11 escanteios', odds: 1.40 }
    ],
    category: 'corners'
  },
  {
    id: 'cards',
    name: 'Cartões',
    description: 'Total de cartões amarelos e vermelhos',
    odds: [
      { id: 'over-25', label: 'Mais de 2.5', description: '3 ou mais cartões', odds: 1.65 },
      { id: 'under-25', label: 'Menos de 2.5', description: '0 a 2 cartões', odds: 2.15 },
      { id: 'over-35', label: 'Mais de 3.5', description: '4 ou mais cartões', odds: 2.05 },
      { id: 'under-35', label: 'Menos de 3.5', description: '0 a 3 cartões', odds: 1.75 },
      { id: 'over-45', label: 'Mais de 4.5', description: '5 ou mais cartões', odds: 2.70 },
      { id: 'under-45', label: 'Menos de 4.5', description: '0 a 4 cartões', odds: 1.45 },
      { id: 'red-card', label: 'Cartão Vermelho', description: 'Pelo menos 1 cartão vermelho', odds: 3.25 },
      { id: 'no-red-card', label: 'Sem Cartão Vermelho', description: 'Nenhum cartão vermelho', odds: 1.30 }
    ],
    category: 'cards'
  },
  {
    id: 'first-half-result',
    name: 'Resultado do 1º Tempo',
    description: 'Vencedor do primeiro tempo',
    odds: [
      { id: 'home', label: 'Real Madrid', description: 'Real vence o 1º tempo', odds: 2.40 },
      { id: 'draw', label: 'Empate', description: 'Empate no 1º tempo', odds: 2.10 },
      { id: 'away', label: 'Liverpool', description: 'Liverpool vence o 1º tempo', odds: 3.60 }
    ],
    category: 'halftime'
  },
  {
    id: 'halftime-fulltime',
    name: 'Intervalo/Final',
    description: 'Resultado do intervalo e final',
    odds: [
      { id: 'home-home', label: 'Real/Real', description: 'Real vence 1º tempo e jogo', odds: 3.25 },
      { id: 'home-draw', label: 'Real/Empate', description: 'Real vence 1º tempo, empate final', odds: 8.50 },
      { id: 'home-away', label: 'Real/Liverpool', description: 'Real vence 1º tempo, Liverpool vence jogo', odds: 15.00 },
      { id: 'draw-home', label: 'Empate/Real', description: 'Empate 1º tempo, Real vence jogo', odds: 5.50 },
      { id: 'draw-draw', label: 'Empate/Empate', description: 'Empate 1º tempo e final', odds: 4.80 },
      { id: 'draw-away', label: 'Empate/Liverpool', description: 'Empate 1º tempo, Liverpool vence jogo', odds: 6.00 },
      { id: 'away-home', label: 'Liverpool/Real', description: 'Liverpool vence 1º tempo, Real vence jogo', odds: 17.00 },
      { id: 'away-draw', label: 'Liverpool/Empate', description: 'Liverpool vence 1º tempo, empate final', odds: 9.50 },
      { id: 'away-away', label: 'Liverpool/Liverpool', description: 'Liverpool vence 1º tempo e jogo', odds: 4.20 }
    ],
    category: 'halftime'
  },
  {
    id: 'corner-handicap',
    name: 'Handicap de Escanteios',
    description: 'Handicap aplicado aos escanteios',
    odds: [
      { id: 'real-minus-1', label: 'Real Madrid -1', description: 'Real precisa ter 2+ escanteios a mais', odds: 1.85 },
      { id: 'real-0', label: 'Real Madrid 0', description: 'Real vence ou empata em escanteios', odds: 1.95 },
      { id: 'real-plus-1', label: 'Real Madrid +1', description: 'Real não pode ter 2+ escanteios a menos', odds: 1.80 },
      { id: 'liverpool-minus-1', label: 'Liverpool -1', description: 'Liverpool precisa ter 2+ escanteios a mais', odds: 1.90 },
      { id: 'liverpool-0', label: 'Liverpool 0', description: 'Liverpool vence ou empata em escanteios', odds: 1.85 },
      { id: 'liverpool-plus-1', label: 'Liverpool +1', description: 'Liverpool não pode ter 2+ escanteios a menos', odds: 1.95 }
    ],
    category: 'corners'
  },
  {
    id: 'anytime-goalscorer',
    name: 'Marcar a Qualquer Momento',
    description: 'Jogador marca em qualquer momento da partida',
    odds: [
      { id: 'benzema', label: 'Karim Benzema', description: 'Benzema marca a qualquer momento', odds: 2.10 },
      { id: 'vinicius', label: 'Vinícius Jr.', description: 'Vinícius marca a qualquer momento', odds: 2.40 },
      { id: 'salah', label: 'Mohamed Salah', description: 'Salah marca a qualquer momento', odds: 2.30 },
      { id: 'mane', label: 'Sadio Mané', description: 'Mané marca a qualquer momento', odds: 2.50 },
      { id: 'modric', label: 'Luka Modrić', description: 'Modrić marca a qualquer momento', odds: 4.50 },
      { id: 'firmino', label: 'Roberto Firmino', description: 'Firmino marca a qualquer momento', odds: 3.20 },
      { id: 'kroos', label: 'Toni Kroos', description: 'Kroos marca a qualquer momento', odds: 5.50 },
      { id: 'henderson', label: 'Jordan Henderson', description: 'Henderson marca a qualquer momento', odds: 6.00 }
    ],
    category: 'players'
  }
];

// Função para obter o layout ideal para cada tipo de mercado
export function getOptimalLayout(marketCategory: string): LayoutType {
  const categoryLayoutMap: Record<string, LayoutType> = {
    'main': LayoutType.TRI_COLUMN,        // Resultado Final - 3 opções
    'goals': LayoutType.BI_COLUMN,        // Over/Under, Ambas Marcam - 2 opções principais
    'score': LayoutType.GRID,             // Placar Exato - muitas opções
    'players': LayoutType.LIST,           // Jogadores - lista vertical
    'handicap': LayoutType.LADDER,        // Handicap Asiático - back/lay style
    'corners': LayoutType.BI_COLUMN,      // Escanteios - over/under principalmente
    'cards': LayoutType.BI_COLUMN,        // Cartões - over/under principalmente
    'halftime': LayoutType.ACCORDION      // Mercados de tempo - compacto
  };

  return categoryLayoutMap[marketCategory] || LayoutType.GRID;
}

export function getDescriptiveMarketsByCategory(category: string): DescriptiveMarket[] {
  return realMadridLiverpoolMarkets.filter(market => market.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(realMadridLiverpoolMarkets.map(market => market.category)));
}

export function getMarketStats() {
  const totalMarkets = realMadridLiverpoolMarkets.length;
  const totalOdds = realMadridLiverpoolMarkets.reduce((sum, market) => sum + market.odds.length, 0);
  const categories = getAllCategories();
  const layouts = Array.from(new Set(categories.map(cat => getOptimalLayout(cat))));
  
  return {
    totalMarkets,
    totalOdds,
    categories: categories.length,
    layouts: layouts.length,
    averageOddsPerMarket: Math.round(totalOdds / totalMarkets * 10) / 10
  };
} 