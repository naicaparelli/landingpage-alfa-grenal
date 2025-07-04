import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Sport, MarketType, BetType, Selection, Odds, Market, Event } from '../types';

// Utilitário para classes CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utilitários para Odds
export function formatOdds(odds: number, format: 'decimal' | 'fractional' | 'american' = 'decimal'): string {
  switch (format) {
    case 'decimal':
      return odds.toFixed(2);
    case 'fractional':
      if (odds >= 2) {
        const numerator = Math.round((odds - 1) * 100);
        const denominator = 100;
        return `${numerator}/${denominator}`;
      } else {
        const numerator = 100;
        const denominator = Math.round(100 / (odds - 1));
        return `${numerator}/${denominator}`;
      }
    case 'american':
      if (odds >= 2) {
        return `+${Math.round((odds - 1) * 100)}`;
      } else {
        return `-${Math.round(100 / (odds - 1))}`;
      }
    default:
      return odds.toFixed(2);
  }
}

export function calculateImpliedProbability(odds: number): number {
  return (1 / odds) * 100;
}

export function calculateMargin(odds: number[]): number {
  const totalProbability = odds.reduce((sum, odd) => sum + (1 / odd), 0);
  return ((totalProbability - 1) * 100);
}

// Utilitários para BetSlip
export function calculateTotalOdds(selections: Selection[]): number {
  return selections.reduce((total, selection) => total * selection.odds.value, 1);
}

export function calculatePotentialWin(stake: number, totalOdds: number): number {
  return stake * totalOdds;
}

export function calculatePotentialReturn(stake: number, totalOdds: number): number {
  return stake * (totalOdds - 1);
}

export function calculateSystemBetCombinations(selections: number, systemSize: number): number {
  if (systemSize > selections) return 0;
  return factorial(selections) / (factorial(systemSize) * factorial(selections - systemSize));
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Utilitários para Cores por Esporte
export function getSportColor(sport: Sport): string {
  const colorMap: Record<Sport, string> = {
    [Sport.FOOTBALL]: 'sport-color-football',
    [Sport.BASKETBALL]: 'sport-color-basketball',
    [Sport.TENNIS]: 'sport-color-tennis',
    [Sport.BASEBALL]: 'sport-color-baseball',
    [Sport.HOCKEY]: 'sport-color-hockey',
    [Sport.SOCCER]: 'sport-color-soccer',
    [Sport.VOLLEYBALL]: 'sport-color-volleyball',
    [Sport.BOXING]: 'sport-color-boxing',
    [Sport.MMA]: 'sport-color-mma',
    [Sport.ESPORTS]: 'sport-color-esports',
    [Sport.OTHER]: 'sport-color-other',
  };
  return colorMap[sport] || 'sport-color-other';
}

export function getSportIcon(sport: Sport): string {
  const iconMap: Record<Sport, string> = {
    [Sport.FOOTBALL]: '🏈',
    [Sport.BASKETBALL]: '🏀',
    [Sport.TENNIS]: '🎾',
    [Sport.BASEBALL]: '⚾',
    [Sport.HOCKEY]: '🏒',
    [Sport.SOCCER]: '⚽',
    [Sport.VOLLEYBALL]: '🏐',
    [Sport.BOXING]: '🥊',
    [Sport.MMA]: '🤼',
    [Sport.ESPORTS]: '🎮',
    [Sport.OTHER]: '🏆',
  };
  return iconMap[sport] || '🏆';
}

// Utilitários para Formatação
export function formatCurrency(value: number, currency: string = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(date: Date, format: 'short' | 'long' | 'time' = 'short'): string {
  const optionsMap: Record<string, Intl.DateTimeFormatOptions> = {
    short: { day: '2-digit', month: '2-digit', year: '2-digit' },
    long: { day: '2-digit', month: 'long', year: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
  };
  
  return new Intl.DateTimeFormat('pt-BR', optionsMap[format]).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// Utilitários para Estados
export function getOddsStateClass(state: Odds['state']): string {
  const stateMap: Record<Odds['state'], string> = {
    up: 'text-odds-up animate-odds-flash',
    down: 'text-odds-down animate-odds-flash',
    suspended: 'text-odds-suspended opacity-50',
    locked: 'text-odds-locked opacity-75',
    normal: 'text-odds-text',
  };
  return stateMap[state] || 'text-odds-text';
}

export function getMarketTypeDisplayName(marketType: MarketType): string {
  const displayNames: Record<MarketType, string> = {
    [MarketType.MONEYLINE]: 'Resultado Final',
    [MarketType.SPREAD]: 'Handicap',
    [MarketType.TOTALS]: 'Over/Under',
    [MarketType.BOTH_TEAMS_SCORE]: 'Ambas Marcam',
    [MarketType.CORRECT_SCORE]: 'Placar Exato',
    [MarketType.HANDICAP]: 'Handicap Asiático',
    [MarketType.DOUBLE_CHANCE]: 'Dupla Chance',
    [MarketType.DRAW_NO_BET]: 'Empate Anula',
    [MarketType.FIRST_GOALSCORER]: 'Primeiro Gol',
    [MarketType.ANYTIME_GOALSCORER]: 'Marcar Gol',
    [MarketType.PLAYER_PROPS]: 'Props do Jogador',
    [MarketType.CORNERS]: 'Escanteios',
    [MarketType.CARDS]: 'Cartões',
    [MarketType.COMBO]: 'Combinada',
    [MarketType.SPECIALS]: 'Especiais',
  };
  return displayNames[marketType] || marketType;
}

// Utilitários para Validação
export function isValidStake(stake: number, minStake: number, maxStake: number): boolean {
  return stake >= minStake && stake <= maxStake;
}

export function isValidOdds(odds: number): boolean {
  return odds > 0 && odds < 1000;
}

export function canPlaceBet(selections: Selection[], stake: number, minStake: number, maxStake: number): boolean {
  return (
    selections.length > 0 &&
    selections.every(s => !s.odds.state || s.odds.state === 'normal') &&
    isValidStake(stake, minStake, maxStake)
  );
}

// Utilitários para Filtros
export function filterEventsBySport(events: Event[], sport: Sport): Event[] {
  return events.filter(event => event.sport === sport);
}

export function filterEventsByMarketType(events: Event[], marketType: MarketType): Event[] {
  return events.filter(event => 
    event.markets.some(market => market.type === marketType)
  );
}

export function filterEventsBySearch(events: Event[], search: string): Event[] {
  const searchLower = search.toLowerCase();
  return events.filter(event => 
    event.name.toLowerCase().includes(searchLower) ||
    event.homeTeam.toLowerCase().includes(searchLower) ||
    event.awayTeam.toLowerCase().includes(searchLower) ||
    event.league.toLowerCase().includes(searchLower)
  );
}

export function sortEvents(events: Event[], sortBy: 'startTime' | 'popularity' | 'league'): Event[] {
  switch (sortBy) {
    case 'startTime':
      return [...events].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    case 'popularity':
      return [...events].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    case 'league':
      return [...events].sort((a, b) => a.league.localeCompare(b.league));
    default:
      return events;
  }
}

// Utilitários para Responsividade
export function getResponsiveColumns(breakpoint: string): number {
  const columnMap: Record<string, number> = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    '2xl': 6,
  };
  return columnMap[breakpoint] || 3;
}

export function getResponsiveLayout(breakpoint: string, defaultLayout: string): string {
  const layoutMap: Record<string, string> = {
    xs: 'list',
    sm: 'bi_column',
    md: 'tri_column',
    lg: defaultLayout,
    xl: defaultLayout,
    '2xl': defaultLayout,
  };
  return layoutMap[breakpoint] || defaultLayout;
}

// Utilitários para Animações
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

// Utilitários para Local Storage
export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
    return defaultValue;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Erro ao remover do localStorage:', error);
  }
}

// Utilitários para Geradores de ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function generateSelectionId(marketId: string, oddsId: string): string {
  return `${marketId}-${oddsId}`;
}

export function generateEventId(homeTeam: string, awayTeam: string, startTime: Date): string {
  const teams = `${homeTeam}-${awayTeam}`.replace(/\s+/g, '-').toLowerCase();
  const timestamp = startTime.getTime();
  return `${teams}-${timestamp}`;
}

// Utilitários para Análise
export function calculateConversionRate(betsPlaced: number, betsWon: number): number {
  return betsPlaced > 0 ? (betsWon / betsPlaced) * 100 : 0;
}

export function calculateROI(totalStake: number, totalWinnings: number): number {
  return totalStake > 0 ? ((totalWinnings - totalStake) / totalStake) * 100 : 0;
}

export function calculateAverageOdds(selections: Selection[]): number {
  if (selections.length === 0) return 0;
  const totalOdds = selections.reduce((sum, selection) => sum + selection.odds.value, 0);
  return totalOdds / selections.length;
}

// Utilitários para Testes A/B
export function getABTestVariant(testName: string, variants: string[]): string {
  const stored = loadFromLocalStorage(`ab-test-${testName}`, null);
  if (stored && variants.includes(stored)) {
    return stored;
  }
  
  const variant = variants[Math.floor(Math.random() * variants.length)];
  saveToLocalStorage(`ab-test-${testName}`, variant);
  return variant;
}

// Utilitários para Formatação de Texto
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatTeamName(teamName: string, maxLength: number = 20): string {
  return truncateText(teamName, maxLength);
}

export function formatEventName(homeTeam: string, awayTeam: string, maxLength: number = 40): string {
  const eventName = `${homeTeam} vs ${awayTeam}`;
  return truncateText(eventName, maxLength);
} 