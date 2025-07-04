import React, { useState } from 'react';
import { realMadridLiverpoolMarkets } from '../utils/realMadridLiverpoolData';
import {
  OverUnderSplitGroup,
  PlayerHubGroup,
  QuickCombosGroup,
  TimelineGroups,
  ProbabilityTiersGroup,
  HeadToHeadGroup,
  GROUPING_OPTIONS,
  GroupingMode
} from '../components/experimental';

const ExperimentalPage: React.FC = () => {
  const [selectedGrouping, setSelectedGrouping] = useState<GroupingMode>('over-under-split');

  const renderGroupingComponent = () => {
    const props = {
      markets: realMadridLiverpoolMarkets,
      className: 'mb-6'
    };

    switch (selectedGrouping) {
      case 'over-under-split':
        return <OverUnderSplitGroup {...props} />;
      case 'player-hub':
        return <PlayerHubGroup {...props} />;
      case 'quick-combos':
        return <QuickCombosGroup {...props} />;
      case 'timeline-groups':
        return <TimelineGroups {...props} />;
      case 'probability-tiers':
        return <ProbabilityTiersGroup {...props} />;
      case 'head-to-head':
        return <HeadToHeadGroup {...props} />;
      default:
        return <OverUnderSplitGroup {...props} />;
    }
  };

  const selectedGroupingInfo = GROUPING_OPTIONS.find(option => option.id === selectedGrouping);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Laboratório Experimental
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Agrupamentos Inteligentes para Apostas Esportivas
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <p className="text-blue-800">
              <strong>Real Madrid vs Liverpool</strong> - Showcase de Agrupamentos Experimentais
            </p>
          </div>
        </div>

        {/* Grouping Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Selecione um Agrupamento Experimental
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GROUPING_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => setSelectedGrouping(option.id)}
                className={`relative overflow-hidden rounded-lg p-4 transition-all duration-300 ${
                  selectedGrouping === option.id
                    ? 'ring-2 ring-blue-500 ring-offset-2 shadow-lg'
                    : 'hover:shadow-md border border-gray-200'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} ${
                  selectedGrouping === option.id ? 'opacity-100' : 'opacity-10'
                }`}></div>
                <div className="relative">
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <h3 className={`font-semibold text-lg mb-2 ${
                    selectedGrouping === option.id ? 'text-white' : 'text-gray-900'
                  }`}>
                    {option.name}
                  </h3>
                  <p className={`text-sm ${
                    selectedGrouping === option.id ? 'text-white opacity-90' : 'text-gray-600'
                  }`}>
                    {option.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Grouping Info */}
        {selectedGroupingInfo && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${selectedGroupingInfo.color} flex items-center justify-center text-white text-2xl`}>
                {selectedGroupingInfo.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedGroupingInfo.name}
                </h3>
                <p className="text-gray-600">
                  {selectedGroupingInfo.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Experimental Component */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {renderGroupingComponent()}
        </div>

        {/* Features Info */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Recursos Experimentais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold text-lg mb-2">Agrupamento Inteligente</h3>
              <p className="text-sm text-gray-600">
                Organiza apostas de forma lógica e intuitiva baseada em correlações e probabilidades
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Interface Otimizada</h3>
              <p className="text-sm text-gray-600">
                Design responsivo com cores temáticas e navegação simplificada para cada agrupamento
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-semibold text-lg mb-2">Compatibilidade Total</h3>
              <p className="text-sm text-gray-600">
                Reutiliza componentes existentes mantendo retrocompatibilidade com o sistema atual
              </p>
            </div>
          </div>
        </div>

        {/* A/B Testing Notice */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="text-purple-500 text-2xl">🧬</div>
            <div>
              <h3 className="font-semibold text-purple-900 mb-2">
                Sistema de Experimentação A/B
              </h3>
              <p className="text-purple-800 mb-3">
                Esta página experimental permite testar novos conceitos de agrupamento sem afetar a experiência atual dos usuários. 
                Os agrupamentos podem ser gradualmente migrados para as páginas principais baseado em feedback e métricas de engajamento.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-1">Páginas Atuais</h4>
                  <p className="text-sm text-purple-700">
                    Sistema existente com 8 layouts tradicionais mantido para compatibilidade
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-1">Página Experimental</h4>
                  <p className="text-sm text-purple-700">
                    Novos agrupamentos inteligentes para testar conceitos inovadores
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Comparar com Páginas Existentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/event"
              className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 transition-colors"
            >
              <h3 className="font-semibold text-blue-900 mb-2">Página de Evento</h3>
              <p className="text-sm text-blue-700">
                Sistema atual com layouts tradicionais
              </p>
            </a>
            <a
              href="/markets"
              className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 transition-colors"
            >
              <h3 className="font-semibold text-green-900 mb-2">Mercados Principais</h3>
              <p className="text-sm text-green-700">
                Showcase de todos os layouts
              </p>
            </a>
            <a
              href="/player-props"
              className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 transition-colors"
            >
              <h3 className="font-semibold text-purple-900 mb-2">Player Props</h3>
              <p className="text-sm text-purple-700">
                Apostas específicas de jogadores
              </p>
            </a>
            <a
              href="/"
              className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Home</h3>
              <p className="text-sm text-gray-700">
                Página inicial do showcase
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentalPage; 