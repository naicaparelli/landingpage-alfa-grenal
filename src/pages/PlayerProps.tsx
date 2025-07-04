import React, { useState } from 'react';
import MarketGroup from '../components/core/MarketGroup';
import { LayoutType } from '../types';

interface PlayerPropsMarketProps {
  market: {
    name: string;
    description: string;
    odds: { name: string; value: number; }[];
  };
  layout: LayoutType;
}

const PlayerPropsMarket: React.FC<PlayerPropsMarketProps> = ({ market, layout }) => {
  const getLayoutClasses = () => {
    switch (layout) {
      case LayoutType.BI_COLUMN:
        return 'grid grid-cols-2 gap-3';
      case LayoutType.TRI_COLUMN:
        return 'grid grid-cols-3 gap-3';
      case LayoutType.GRID:
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3';
      case LayoutType.LIST:
        return 'flex flex-col gap-2';
      default:
        return 'grid grid-cols-2 md:grid-cols-3 gap-3';
    }
  };

  return (
    <div className={getLayoutClasses()}>
      {market.odds.map((odds, index) => (
        <button
          key={index}
          className="odds-button bg-odds-bg border-2 border-border-primary rounded-lg p-4 hover:border-border-accent hover:bg-odds-bg-hover hover:shadow-lg transition-all duration-200 text-center group shadow-md"
        >
          <div className="font-semibold text-text-primary text-sm mb-2 group-hover:text-primary">
            {odds.name}
          </div>
          <div className="text-text-primary font-black text-xl bg-bg-surface py-2 px-3 rounded-md border border-border-primary group-hover:text-primary group-hover:bg-primary/5">
            {odds.value.toFixed(2)}
          </div>
        </button>
      ))}
    </div>
  );
};

interface PlayerStat {
  name: string;
  position: string;
  team: 'Real Madrid' | 'Liverpool';
  stats: {
    goals: number;
    assists: number;
    shots: number;
    tackles: number;
    passes: number;
  };
}

const topPlayers: PlayerStat[] = [
  {
    name: 'Vinícius Jr.',
    position: 'Atacante',
    team: 'Real Madrid',
    stats: { goals: 12, assists: 8, shots: 4.2, tackles: 1.1, passes: 32.5 }
  },
  {
    name: 'Mohamed Salah',
    position: 'Atacante',
    team: 'Liverpool',
    stats: { goals: 15, assists: 6, shots: 5.1, tackles: 0.8, passes: 28.3 }
  },
  {
    name: 'Jude Bellingham',
    position: 'Meio-campo',
    team: 'Real Madrid',
    stats: { goals: 8, assists: 4, shots: 2.8, tackles: 2.3, passes: 65.2 }
  },
  {
    name: 'Sadio Mané',
    position: 'Atacante',
    team: 'Liverpool',
    stats: { goals: 10, assists: 5, shots: 3.6, tackles: 1.4, passes: 24.8 }
  },
  {
    name: 'Luka Modrić',
    position: 'Meio-campo',
    team: 'Real Madrid',
    stats: { goals: 2, assists: 7, shots: 1.8, tackles: 1.9, passes: 89.4 }
  },
  {
    name: 'Virgil van Dijk',
    position: 'Zagueiro',
    team: 'Liverpool',
    stats: { goals: 3, assists: 1, shots: 0.9, tackles: 1.6, passes: 94.7 }
  }
];

const playerPropsData = {
  goalscorer: {
    name: 'Marcar Gol',
    description: 'Apostas em quem vai marcar',
    odds: [
      { name: 'Vinícius Jr.', value: 2.40 },
      { name: 'Mohamed Salah', value: 2.25 },
      { name: 'Jude Bellingham', value: 3.50 },
      { name: 'Sadio Mané', value: 2.80 },
      { name: 'Karim Benzema', value: 2.60 },
      { name: 'Darwin Núñez', value: 3.20 },
      { name: 'Rodrygo', value: 3.80 },
      { name: 'Luis Díaz', value: 4.00 },
      { name: 'Toni Kroos', value: 12.00 },
      { name: 'Jordan Henderson', value: 15.00 }
    ]
  },
  shots: {
    name: 'Chutes a Gol',
    description: 'Total de chutes de cada jogador',
    odds: [
      { name: 'Salah Over 2.5', value: 1.85 },
      { name: 'Salah Under 2.5', value: 1.95 },
      { name: 'Vinícius Over 2.5', value: 2.10 },
      { name: 'Vinícius Under 2.5', value: 1.75 },
      { name: 'Bellingham Over 1.5', value: 1.90 },
      { name: 'Bellingham Under 1.5', value: 1.90 },
      { name: 'Mané Over 1.5', value: 2.20 },
      { name: 'Mané Under 1.5', value: 1.65 }
    ]
  },
  assists: {
    name: 'Assistências',
    description: 'Quem vai dar assistência',
    odds: [
      { name: 'Modrić Dar Assistência', value: 3.50 },
      { name: 'Salah Dar Assistência', value: 4.20 },
      { name: 'Kroos Dar Assistência', value: 4.00 },
      { name: 'Robertson Dar Assistência', value: 5.50 },
      { name: 'Vinícius Dar Assistência', value: 4.80 },
      { name: 'TAA Dar Assistência', value: 5.00 }
    ]
  },
  cards: {
    name: 'Cartões',
    description: 'Jogadores que vão receber cartão',
    odds: [
      { name: 'Casemiro Levar Cartão', value: 2.80 },
      { name: 'Fabinho Levar Cartão', value: 3.20 },
      { name: 'Ramos Levar Cartão', value: 3.50 },
      { name: 'Van Dijk Levar Cartão', value: 4.50 },
      { name: 'Modrić Levar Cartão', value: 5.00 },
      { name: 'Henderson Levar Cartão', value: 4.20 }
    ]
  },
  passes: {
    name: 'Passes Certos',
    description: 'Total de passes completados',
    odds: [
      { name: 'Modrić Over 75.5', value: 1.75 },
      { name: 'Modrić Under 75.5', value: 2.05 },
      { name: 'Van Dijk Over 65.5', value: 1.95 },
      { name: 'Van Dijk Under 65.5', value: 1.85 },
      { name: 'Kroos Over 70.5', value: 1.80 },
      { name: 'Kroos Under 70.5', value: 2.00 },
      { name: 'TAA Over 55.5', value: 2.10 },
      { name: 'TAA Under 55.5', value: 1.75 }
    ]
  },
  tackles: {
    name: 'Desarmes',
    description: 'Total de desarmes por jogador',
    odds: [
      { name: 'Casemiro Over 2.5', value: 2.20 },
      { name: 'Casemiro Under 2.5', value: 1.65 },
      { name: 'Fabinho Over 2.5', value: 2.40 },
      { name: 'Fabinho Under 2.5', value: 1.55 },
      { name: 'Bellingham Over 1.5', value: 1.90 },
      { name: 'Bellingham Under 1.5', value: 1.90 }
    ]
  }
};

const PlayerProps: React.FC = () => {
  const [selectedLayout, setSelectedLayout] = useState<LayoutType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getOptimalLayout = (marketType: string): LayoutType => {
    switch (marketType) {
      case 'goalscorer':
        return LayoutType.LIST; // Lista vertical para muitos jogadores
      case 'shots':
      case 'passes':
      case 'tackles':
        return LayoutType.BI_COLUMN; // Over/Under são 2 opções
      case 'assists':
      case 'cards':
        return LayoutType.GRID; // Muitas opções organizadas
      default:
        return LayoutType.LIST;
    }
  };

  const categories = [
    { id: 'all', name: 'Todos', count: Object.keys(playerPropsData).length },
    { id: 'goalscorer', name: 'Gols', count: 1 },
    { id: 'shots', name: 'Chutes', count: 1 },
    { id: 'assists', name: 'Assistências', count: 1 },
    { id: 'cards', name: 'Cartões', count: 1 },
    { id: 'passes', name: 'Passes', count: 1 },
    { id: 'tackles', name: 'Desarmes', count: 1 }
  ];

  const filteredMarkets = selectedCategory === 'all' 
    ? Object.entries(playerPropsData)
    : Object.entries(playerPropsData).filter(([key]) => key === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-heading-xl font-bold text-text-primary mb-2">
          Props de Jogador
        </h1>
        <p className="text-body-md text-text-secondary mb-4">
          Real Madrid vs Liverpool - Apostas específicas por jogador
        </p>
        
        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="card">
            <div className="card-body text-center">
              <div className="text-heading-md font-bold text-alfa-blue">
                {Object.keys(playerPropsData).length}
              </div>
              <div className="text-body-sm text-text-secondary">
                Categorias
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="text-heading-md font-bold text-alfa-green">
                {topPlayers.length}
              </div>
              <div className="text-body-sm text-text-secondary">
                Jogadores
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="text-heading-md font-bold text-alfa-orange">
                {Object.values(playerPropsData).reduce((acc, market) => acc + market.odds.length, 0)}
              </div>
              <div className="text-body-sm text-text-secondary">
                Mercados
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="text-heading-md font-bold text-alfa-purple">
                6
              </div>
              <div className="text-body-sm text-text-secondary">
                Layouts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Players Stats */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-heading-md font-semibold text-text-primary">
            Estatísticas dos Principais Jogadores
          </h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPlayers.map((player, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold text-text-primary">{player.name}</div>
                    <div className="text-sm text-text-secondary">{player.position}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    player.team === 'Real Madrid' ? 'bg-bg-surface text-text-primary' : 'bg-error/20 text-error'
                  }`}>
                    {player.team}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Gols: <span className="font-semibold">{player.stats.goals}</span></div>
                  <div>Assist: <span className="font-semibold">{player.stats.assists}</span></div>
                  <div>Chutes: <span className="font-semibold">{player.stats.shots}</span></div>
                  <div>Desarmes: <span className="font-semibold">{player.stats.tackles}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-heading-md font-semibold text-text-primary">
            Filtros e Configurações
          </h3>
        </div>
        <div className="card-body space-y-4">
          {/* Filtro por Categoria */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Categoria de Props
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                                          ? 'bg-primary text-text-on-primary'
                    : 'bg-bg-secondary text-text-primary hover:bg-bg-tertiary'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Override de Layout */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Override de Layout (Opcional)
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedLayout(null)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedLayout === null
                                      ? 'bg-success text-text-on-primary'
                  : 'bg-bg-secondary text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                Automático
              </button>
                             {([LayoutType.LIST, LayoutType.BI_COLUMN, LayoutType.GRID] as LayoutType[]).map(layout => (
                <button
                  key={layout}
                  onClick={() => setSelectedLayout(layout)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedLayout === layout
                                          ? 'bg-warning text-text-on-primary'
                    : 'bg-bg-secondary text-text-primary hover:bg-bg-tertiary'
                  }`}
                >
                                     {layout.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          {/* Explicação dos Layouts */}
          <div className="bg-bg-secondary p-4 rounded-lg border border-border-primary">
            <h4 className="font-semibold text-text-primary mb-2">Layouts Otimizados:</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li><strong>Lista:</strong> Ideal para marcadores (muitos jogadores)</li>
              <li><strong>Bi-coluna:</strong> Perfeito para Over/Under (2 opções)</li>
              <li><strong>Grid:</strong> Ótimo para assistências e cartões (múltiplas opções)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mercados */}
      <div className="space-y-6">
        {filteredMarkets.map(([key, market]) => {
          const optimalLayout = getOptimalLayout(key);
          const finalLayout = selectedLayout || optimalLayout;
          
          return (
            <div key={key} className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-heading-md font-semibold text-text-primary">
                      {market.name}
                    </h3>
                    <p className="text-body-sm text-text-secondary">
                      {market.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-text-secondary">
                      Layout: {finalLayout}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {market.odds.length} opções
                    </div>
                  </div>
                </div>
              </div>
                             <div className="card-body">
                 <PlayerPropsMarket
                   market={market}
                   layout={finalLayout}
                 />
               </div>
            </div>
          );
        })}
      </div>

      {/* Dicas */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-heading-md font-semibold text-text-primary">
            💡 Dicas para Props de Jogador
          </h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-text-primary mb-2">Real Madrid</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Vinícius Jr. é o principal finalizador</li>
                <li>• Modrić lidera em assistências e passes</li>
                <li>• Bellingham tem chegado bem ao gol</li>
                <li>• Casemiro costuma receber cartões</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-2">Liverpool</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Salah é o artilheiro da equipe</li>
                <li>• Van Dijk domina em passes defensivos</li>
                <li>• TAA é perigoso em assistências</li>
                <li>• Fabinho é forte em desarmes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProps; 