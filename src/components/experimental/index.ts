// Componentes Experimentais - Agrupamentos Inteligentes
export { default as OverUnderSplitGroup } from './OverUnderSplitGroup';
export { default as PlayerHubGroup } from './PlayerHubGroup';
export { default as QuickCombosGroup } from './QuickCombosGroup';
export { default as TimelineGroups } from './TimelineGroups';
export { default as ProbabilityTiersGroup } from './ProbabilityTiersGroup';
export { default as HeadToHeadGroup } from './HeadToHeadGroup';

// Tipos para agrupamentos
export type GroupingMode = 
  | 'over-under-split'
  | 'player-hub'
  | 'quick-combos'
  | 'timeline-groups'
  | 'probability-tiers'
  | 'head-to-head';

export interface GroupingOption {
  id: GroupingMode;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const GROUPING_OPTIONS: GroupingOption[] = [
  {
    id: 'over-under-split',
    name: 'Over/Under Split',
    description: 'Under à esquerda, Over à direita',
    icon: '↔️',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'player-hub',
    name: 'Player Hub',
    description: 'Agrupado por jogador com todas suas odds',
    icon: '👤',
    color: 'from-green-500 to-blue-500'
  },
  {
    id: 'quick-combos',
    name: 'Quick Combos',
    description: 'Apostas correlacionadas pré-montadas',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'timeline-groups',
    name: 'Timeline Groups',
    description: 'Por tempo de jogo (1º tempo, 2º tempo)',
    icon: '⏰',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'probability-tiers',
    name: 'Probability Tiers',
    description: 'Por chance (favoritos, equilibrado, zebras)',
    icon: '📊',
    color: 'from-red-500 to-yellow-500'
  },
  {
    id: 'head-to-head',
    name: 'Head-to-Head',
    description: 'Comparação direta entre times',
    icon: '⚔️',
    color: 'from-indigo-500 to-purple-500'
  }
]; 