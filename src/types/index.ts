// Tipos Básicos
export interface Odds {
  id: string;
  value: number;
  display: string;
  state: 'up' | 'down' | 'suspended' | 'locked' | 'normal';
  trend?: 'up' | 'down';
  lastUpdated?: Date;
}

export interface Selection {
  id: string;
  marketId: string;
  name: string;
  odds: Odds;
  selected: boolean;
  eventId: string;
  eventName: string;
  sport: Sport;
  marketType: string;
  marketName: string;
  addedAt?: Date;
}

export interface Market {
  id: string;
  name: string;
  type: MarketType;
  odds: Odds[];
  sport: Sport;
  eventId: string;
  suspended?: boolean;
  featured?: boolean;
  category?: string;
  description?: string;
  rules?: string;
  minStake?: number;
  maxStake?: number;
  liquidityBack?: number;
  liquidityLay?: number;
}

export interface Event {
  id: string;
  name: string;
  homeTeam: string;
  awayTeam: string;
  sport: Sport;
  league: string;
  startTime: Date;
  status: EventStatus;
  score?: Score;
  markets: Market[];
  featured?: boolean;
  live?: boolean;
  prematch?: boolean;
  stats?: EventStats;
  venue?: string;
  weather?: string;
}

export interface Score {
  home: number;
  away: number;
  period?: string;
  minute?: number;
  sets?: { home: number; away: number }[];
  quarters?: { home: number; away: number }[];
}

export interface EventStats {
  possession?: number;
  shots?: { home: number; away: number };
  shotsOnTarget?: { home: number; away: number };
  corners?: { home: number; away: number };
  cards?: { home: number; away: number };
  fouls?: { home: number; away: number };
  offsides?: { home: number; away: number };
}

export interface BetSlip {
  selections: Selection[];
  betType: BetType;
  stake: number;
  totalOdds: number;
  potentialWin: number;
  potentialReturn: number;
  minStake: number;
  maxStake: number;
  maxWin: number;
  systemBets?: SystemBet[];
  freeBet?: boolean;
  bonusAmount?: number;
}

export interface SystemBet {
  type: string;
  combinations: number;
  stake: number;
  potentialWin: number;
}

export interface BetHistory {
  id: string;
  selections: Selection[];
  betType: BetType;
  stake: number;
  odds: number;
  potentialWin: number;
  status: BetStatus;
  placedAt: Date;
  settledAt?: Date;
  result?: BetResult;
  winAmount?: number;
}

// Enums
export enum Sport {
  FOOTBALL = 'football',
  BASKETBALL = 'basketball',
  TENNIS = 'tennis',
  BASEBALL = 'baseball',
  HOCKEY = 'hockey',
  SOCCER = 'soccer',
  VOLLEYBALL = 'volleyball',
  BOXING = 'boxing',
  MMA = 'mma',
  ESPORTS = 'esports',
  OTHER = 'other'
}

export enum EventStatus {
  PREMATCH = 'prematch',
  LIVE = 'live',
  FINISHED = 'finished',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  POSTPONED = 'postponed'
}

export enum MarketType {
  MONEYLINE = 'moneyline',
  SPREAD = 'spread',
  TOTALS = 'totals',
  BOTH_TEAMS_SCORE = 'both_teams_score',
  CORRECT_SCORE = 'correct_score',
  HANDICAP = 'handicap',
  DOUBLE_CHANCE = 'double_chance',
  DRAW_NO_BET = 'draw_no_bet',
  FIRST_GOALSCORER = 'first_goalscorer',
  ANYTIME_GOALSCORER = 'anytime_goalscorer',
  PLAYER_PROPS = 'player_props',
  CORNERS = 'corners',
  CARDS = 'cards',
  COMBO = 'combo',
  SPECIALS = 'specials'
}

export enum BetType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
  SYSTEM = 'system',
  CHAIN = 'chain'
}

export enum BetStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  WON = 'won',
  LOST = 'lost',
  VOID = 'void',
  PARTIALLY_WON = 'partially_won',
  PARTIALLY_LOST = 'partially_lost',
  CANCELLED = 'cancelled',
  CASHOUT = 'cashout'
}

export enum BetResult {
  WIN = 'win',
  LOSE = 'lose',
  VOID = 'void',
  PUSH = 'push'
}

export enum LayoutType {
  BI_COLUMN = 'bi_column',
  TRI_COLUMN = 'tri_column',
  GRID = 'grid',
  LIST = 'list',
  ACCORDION = 'accordion',
  LADDER = 'ladder',
  CAROUSEL = 'carousel',
  TABS = 'tabs'
}

// Interfaces para Componentes
export interface OddsButtonProps {
  odds: Odds;
  selection: Partial<Selection>;
  onClick: (selection: Selection) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent';
  showTrend?: boolean;
  className?: string;
}

export interface MarketGroupProps {
  market: Market;
  layout?: LayoutType;
  onSelectionClick: (selection: Selection) => void;
  selectedSelections?: Selection[];
  className?: string;
}

export interface BetSlipProps {
  betSlip: BetSlip;
  onUpdateStake: (stake: number) => void;
  onRemoveSelection: (selectionId: string) => void;
  onChangeBetType: (betType: BetType) => void;
  onPlaceBet: () => void;
  onClearAll: () => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export interface LayoutProps {
  markets: Market[];
  onSelectionClick: (selection: Selection) => void;
  selectedSelections?: Selection[];
  className?: string;
}

export interface FilterOptions {
  sports?: Sport[];
  markets?: MarketType[];
  minOdds?: number;
  maxOdds?: number;
  featured?: boolean;
  live?: boolean;
  search?: string;
}

export interface SortOptions {
  field: 'odds' | 'name' | 'startTime' | 'popularity';
  direction: 'asc' | 'desc';
}

// Interfaces para Context
export interface BetSlipContextValue {
  betSlip: BetSlip;
  addSelection: (selection: Selection) => void;
  removeSelection: (selectionId: string) => void;
  updateStake: (stake: number) => void;
  changeBetType: (betType: BetType) => void;
  clearAll: () => void;
  placeBet: () => Promise<void>;
  isOpen: boolean;
  toggle: () => void;
}

export interface OddsContextValue {
  events: Event[];
  loading: boolean;
  error: string | null;
  filters: FilterOptions;
  updateFilters: (filters: FilterOptions) => void;
  refreshOdds: () => void;
  subscribeToUpdates: (eventId: string) => void;
  unsubscribeFromUpdates: (eventId: string) => void;
}

// Interfaces para Hooks
export interface UseOddsReturn {
  odds: Odds[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export interface UseBetSlipReturn {
  betSlip: BetSlip;
  addSelection: (selection: Selection) => void;
  removeSelection: (selectionId: string) => void;
  updateStake: (stake: number) => void;
  changeBetType: (betType: BetType) => void;
  clearAll: () => void;
  placeBet: () => Promise<void>;
  canPlaceBet: boolean;
}

// Interfaces para Dados Mock
export interface MockDataOptions {
  sport?: Sport;
  eventCount?: number;
  marketCount?: number;
  includePlayerProps?: boolean;
  includeLive?: boolean;
  includeStats?: boolean;
}

// Interfaces para Configuração
export interface ThemeConfig {
  colors: Record<string, string>;
  fonts: Record<string, string>;
  breakpoints: Record<string, string>;
  animations: Record<string, string>;
}

export interface AppConfig {
  apiUrl: string;
  wsUrl: string;
  theme: ThemeConfig;
  features: {
    liveBetting: boolean;
    cashout: boolean;
    streaming: boolean;
    betBuilder: boolean;
    multiview: boolean;
  };
  limits: {
    maxSelections: number;
    maxStake: number;
    minStake: number;
    maxWin: number;
  };
}

// Interfaces para Analytics
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  oddsUpdateLatency: number;
  betPlacementTime: number;
  errorRate: number;
  conversionRate: number;
}

// Interfaces para Responsividade
export interface ResponsiveConfig {
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  layout: LayoutType;
  columns: number;
  showSidebar: boolean;
  compactMode: boolean;
}

// Nova interface para mercados com odds descritivas
export interface DescriptiveOdds {
  id: string;
  label: string;
  description: string;
  odds: number;
  value?: number;
  display?: string;
  state?: 'up' | 'down' | 'suspended' | 'locked' | 'normal';
  trend?: 'up' | 'down';
  lastUpdated?: Date;
}

export interface DescriptiveMarket {
  id: string;
  name: string;
  description: string;
  odds: DescriptiveOdds[];
  category: string;
  suspended?: boolean;
  featured?: boolean;
  rules?: string;
  minStake?: number;
  maxStake?: number;
  liquidityBack?: number;
  liquidityLay?: number;
} 