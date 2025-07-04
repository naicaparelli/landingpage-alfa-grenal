import React from 'react';
import { Link } from 'react-router-dom';
import { Sport, LayoutType } from '../types';
import { getSportColor, getSportIcon } from '../utils';
import OddsButton from '../components/core/OddsButton';

const Home: React.FC = () => {
  const sampleOdds = {
    id: 'sample-odds',
    value: 2.50,
    display: '2.50',
    state: 'normal' as const
  };

  const sampleSelection = {
    id: 'sample-selection',
    marketId: 'sample-market',
    name: 'Exemplo',
    odds: sampleOdds,
    selected: false,
    eventId: 'sample-event',
    eventName: 'Exemplo',
    sport: Sport.SOCCER,
    marketType: 'moneyline',
    marketName: 'Resultado'
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Alfa Sportsbook
          </h1>
          <h2 className="text-2xl font-semibold mb-6">
            Odds Component Library
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Biblioteca profissional de componentes React para apostas esportivas com design responsivo e sistema de cores por esporte.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/markets" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Ver Mercados
            </Link>
            <Link 
              to="/event" 
              className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Página de Evento
            </Link>
          </div>
        </div>
      </section>

      {/* Lista de Componentes */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Componentes Disponíveis
          </h2>
          <p className="text-lg text-gray-600">
            Todos os componentes da biblioteca organizados por categoria
          </p>
        </div>

        {/* Componentes Core */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Componentes Core
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* OddsButton */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">OddsButton</h4>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <OddsButton
                    odds={sampleOdds}
                    selection={sampleSelection}
                    onClick={() => {}}
                    size="sm"
                  />
                  <OddsButton
                    odds={sampleOdds}
                    selection={sampleSelection}
                    onClick={() => {}}
                    size="md"
                  />
                  <OddsButton
                    odds={sampleOdds}
                    selection={sampleSelection}
                    onClick={() => {}}
                    size="lg"
                  />
                </div>
                <p className="text-sm text-gray-500">Tamanhos: sm, md, lg</p>
              </div>
            </div>

            {/* MarketGroup */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">MarketGroup</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-700">
                  Agrupa odds por mercado
                </div>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  1x2, Over/Under, Handicap, etc.
                </div>
              </div>
            </div>

            {/* BetSlip */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">BetSlip</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-700">
                  Cupom de apostas lateral
                </div>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  Seleções, stake, odds totais
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layouts */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Layouts Disponíveis
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(LayoutType).map((layout) => (
              <div key={layout} className="border border-gray-200 rounded-lg p-3 text-center">
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {layout.replace('_', ' ').toUpperCase()}
                </div>
                <div className="text-xs text-gray-500">
                  {layout === LayoutType.BI_COLUMN && '2 colunas'}
                  {layout === LayoutType.TRI_COLUMN && '3 colunas'}
                  {layout === LayoutType.GRID && 'Grid flexível'}
                  {layout === LayoutType.LIST && 'Lista vertical'}
                  {layout === LayoutType.ACCORDION && 'Acordeão'}
                  {layout === LayoutType.LADDER && 'Escada'}
                  {layout === LayoutType.CAROUSEL && 'Carrossel'}
                  {layout === LayoutType.TABS && 'Abas'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Tokens */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Design Tokens
          </h2>
          <p className="text-lg text-gray-600">
            Sistema de design consistente com tokens do Figma
          </p>
        </div>

        {/* Tipografia */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Tipografia Montserrat
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Display</h4>
              <div className="space-y-3">
                <div className="text-6xl font-bold text-gray-900">Aa</div>
                <div className="text-5xl font-bold text-gray-900">Aa</div>
                <div className="text-4xl font-bold text-gray-900">Aa</div>
                <div className="text-3xl font-bold text-gray-900">Aa</div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Headings & Body</h4>
              <div className="space-y-3">
                <div className="text-2xl font-semibold text-gray-900">Heading XL</div>
                <div className="text-xl font-semibold text-gray-900">Heading LG</div>
                <div className="text-lg font-medium text-gray-900">Heading MD</div>
                <div className="text-base text-gray-900">Body LG</div>
                <div className="text-sm text-gray-900">Body MD</div>
                <div className="text-xs text-gray-600">Caption</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cores */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Cores por Esporte
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-4">
            {Object.values(Sport).map((sport) => {
              const colorClass = getSportColor(sport);
              const icon = getSportIcon(sport);
              
              return (
                <div key={sport} className="text-center">
                  <div className={`w-12 h-12 bg-${colorClass} rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-lg`}>
                    {icon}
                  </div>
                  <p className="text-xs font-medium text-gray-900 capitalize">
                    {sport}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Estados */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Estados das Odds
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium mb-2">
                Normal 2.50
              </div>
              <p className="text-xs text-gray-600">Estado padrão</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium mb-2">
                Subindo 2.65 ↑
              </div>
              <p className="text-xs text-gray-600">Odds em alta</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-medium mb-2">
                Descendo 2.35 ↓
              </div>
              <p className="text-xs text-gray-600">Odds em baixa</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium mb-2">
                Selecionado 2.50
              </div>
              <p className="text-xs text-gray-600">Selecionado</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg font-medium mb-2 opacity-50">
                Suspenso
              </div>
              <p className="text-xs text-gray-600">Indisponível</p>
            </div>
          </div>
        </div>
      </section>

      {/* Elementos Visuais */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Elementos Visuais
          </h2>
          <p className="text-lg text-gray-600">
            Componentes visuais e de layout
          </p>
        </div>

        {/* Cards */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Cards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Card Básico</h4>
              <p className="text-sm text-gray-600">Conteúdo do card</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 shadow-md">
              <h4 className="font-medium text-gray-900 mb-2">Card com Sombra</h4>
              <p className="text-sm text-gray-600">Conteúdo do card</p>
            </div>
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <h4 className="font-medium text-blue-900 mb-2">Card Colorido</h4>
              <p className="text-sm text-blue-700">Conteúdo do card</p>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Botões
          </h3>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Primário
            </button>
            <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Secundário
            </button>
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Outline
            </button>
            <button className="text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Ghost
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Badges
          </h3>
          <div className="flex flex-wrap gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Ao vivo
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              Pré-jogo
            </span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              Finalizado
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Destaque
            </span>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Recursos da Biblioteca
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">8</div>
            <p className="text-sm text-gray-600">Layouts Diferentes</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">11</div>
            <p className="text-sm text-gray-600">Cores por Esporte</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <p className="text-sm text-gray-600">Tipos de Mercado</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
            <p className="text-sm text-gray-600">Responsivo</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 