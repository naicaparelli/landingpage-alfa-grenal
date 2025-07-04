import React, { useState } from 'react';
import { LayoutType } from '../types';

interface BetBuilderSelection {
  id: string;
  category: string;
  market: string;
  selection: string;
  odds: number;
  status: 'available' | 'selected' | 'conflicting';
}

interface BetBuilderMarketProps {
  market: {
    category: string;
    name: string;
    description: string;
    selections: BetBuilderSelection[];
  };
  selectedSelections: string[];
  onSelectionToggle: (selectionId: string) => void;
}

const BetBuilderMarket: React.FC<BetBuilderMarketProps> = ({ market, selectedSelections, onSelectionToggle }) => {
  return (
    <div className="space-y-3">
      {market.selections.map((selection) => {
        const isSelected = selectedSelections.includes(selection.id);
        const isConflicting = selection.status === 'conflicting';
        
        return (
          <button
            key={selection.id}
            onClick={() => onSelectionToggle(selection.id)}
            disabled={isConflicting}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              isSelected 
                ? 'border-alfa-green bg-alfa-green/10 shadow-md' 
                : isConflicting
                ? 'border-red-300 bg-red-50 cursor-not-allowed opacity-60'
                : 'border-gray-200 hover:border-alfa-blue hover:bg-alfa-blue/5'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-text-primary">
                  {selection.selection}
                </div>
                <div className="text-sm text-text-secondary">
                  {selection.market}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`text-lg font-bold ${
                  isSelected ? 'text-alfa-green' : 'text-alfa-blue'
                }`}>
                  {selection.odds.toFixed(2)}
                </div>
                {isSelected && (
                  <div className="text-alfa-green text-xl">✓</div>
                )}
                {isConflicting && (
                  <div className="text-red-500 text-xl">⚠️</div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

const betBuilderData = {
  match_result: {
    category: 'Resultado da Partida',
    name: 'Resultado Final',
    description: 'Quem vencerá a partida',
    selections: [
      { id: 'rm_win', category: 'match_result', market: 'Resultado Final', selection: 'Real Madrid Vitória', odds: 2.10, status: 'available' as const },
      { id: 'draw', category: 'match_result', market: 'Resultado Final', selection: 'Empate', odds: 3.40, status: 'available' as const },
      { id: 'lfc_win', category: 'match_result', market: 'Resultado Final', selection: 'Liverpool Vitória', odds: 3.20, status: 'available' as const }
    ]
  },
  total_goals: {
    category: 'Total de Gols',
    name: 'Over/Under Gols',
    description: 'Total de gols na partida',
    selections: [
      { id: 'over25', category: 'total_goals', market: 'Total de Gols', selection: 'Over 2.5 Gols', odds: 1.75, status: 'available' as const },
      { id: 'under25', category: 'total_goals', market: 'Total de Gols', selection: 'Under 2.5 Gols', odds: 2.05, status: 'available' as const },
      { id: 'over35', category: 'total_goals', market: 'Total de Gols', selection: 'Over 3.5 Gols', odds: 2.80, status: 'available' as const },
      { id: 'under35', category: 'total_goals', market: 'Total de Gols', selection: 'Under 3.5 Gols', odds: 1.42, status: 'available' as const }
    ]
  },
  both_teams_score: {
    category: 'Ambas Marcam',
    name: 'Ambas Equipes Marcam',
    description: 'Ambas as equipes farão gol',
    selections: [
      { id: 'btts_yes', category: 'both_teams_score', market: 'Ambas Marcam', selection: 'Sim', odds: 1.85, status: 'available' as const },
      { id: 'btts_no', category: 'both_teams_score', market: 'Ambas Marcam', selection: 'Não', odds: 1.95, status: 'available' as const }
    ]
  },
  first_goalscorer: {
    category: 'Primeiro Gol',
    name: 'Primeiro Marcador',
    description: 'Quem fará o primeiro gol',
    selections: [
      { id: 'vini_first', category: 'first_goalscorer', market: 'Primeiro Gol', selection: 'Vinícius Jr.', odds: 4.50, status: 'available' as const },
      { id: 'salah_first', category: 'first_goalscorer', market: 'Primeiro Gol', selection: 'Mohamed Salah', odds: 4.20, status: 'available' as const },
      { id: 'bellingham_first', category: 'first_goalscorer', market: 'Primeiro Gol', selection: 'Jude Bellingham', odds: 6.00, status: 'available' as const },
      { id: 'mane_first', category: 'first_goalscorer', market: 'Primeiro Gol', selection: 'Sadio Mané', odds: 5.50, status: 'available' as const }
    ]
  },
  cards: {
    category: 'Cartões',
    name: 'Total de Cartões',
    description: 'Número de cartões na partida',
    selections: [
      { id: 'cards_over3', category: 'cards', market: 'Total Cartões', selection: 'Over 3.5 Cartões', odds: 1.90, status: 'available' as const },
      { id: 'cards_under3', category: 'cards', market: 'Total Cartões', selection: 'Under 3.5 Cartões', odds: 1.90, status: 'available' as const },
      { id: 'cards_over5', category: 'cards', market: 'Total Cartões', selection: 'Over 5.5 Cartões', odds: 2.75, status: 'available' as const },
      { id: 'cards_under5', category: 'cards', market: 'Total Cartões', selection: 'Under 5.5 Cartões', odds: 1.44, status: 'available' as const }
    ]
  },
  corners: {
    category: 'Escanteios',
    name: 'Total de Escanteios',
    description: 'Número de escanteios na partida',
    selections: [
      { id: 'corners_over9', category: 'corners', market: 'Total Escanteios', selection: 'Over 9.5 Escanteios', odds: 1.85, status: 'available' as const },
      { id: 'corners_under9', category: 'corners', market: 'Total Escanteios', selection: 'Under 9.5 Escanteios', odds: 1.95, status: 'available' as const },
      { id: 'corners_over11', category: 'corners', market: 'Total Escanteios', selection: 'Over 11.5 Escanteios', odds: 2.40, status: 'available' as const },
      { id: 'corners_under11', category: 'corners', market: 'Total Escanteios', selection: 'Under 11.5 Escanteios', odds: 1.55, status: 'available' as const }
    ]
  }
};

const BetBuilder: React.FC = () => {
  const [selectedSelections, setSelectedSelections] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stake, setStake] = useState<number>(10);

  const handleSelectionToggle = (selectionId: string) => {
    setSelectedSelections(prev => {
      if (prev.includes(selectionId)) {
        return prev.filter(id => id !== selectionId);
      } else {
        // Verificar conflitos
        const allSelections = Object.values(betBuilderData).flatMap(market => market.selections);
        const newSelection = allSelections.find(s => s.id === selectionId);
        
        if (newSelection) {
          // Remover outras seleções da mesma categoria
          const filteredSelections = prev.filter(id => {
            const existingSelection = allSelections.find(s => s.id === id);
            return existingSelection?.category !== newSelection.category;
          });
          
          return [...filteredSelections, selectionId];
        }
        
        return prev;
      }
    });
  };

  const getSelectedBets = () => {
    const allSelections = Object.values(betBuilderData).flatMap(market => market.selections);
    return selectedSelections.map(id => allSelections.find(s => s.id === id)!).filter(Boolean);
  };

  const calculateTotalOdds = () => {
    const selectedBets = getSelectedBets();
    return selectedBets.reduce((total, bet) => total * bet.odds, 1);
  };

  const calculatePotentialWin = () => {
    const totalOdds = calculateTotalOdds();
    return stake * totalOdds;
  };

  const calculatePotentialProfit = () => {
    return calculatePotentialWin() - stake;
  };

  const categories = [
    { id: 'all', name: 'Todos', count: Object.keys(betBuilderData).length },
    { id: 'match_result', name: 'Resultado', count: 1 },
    { id: 'total_goals', name: 'Gols', count: 1 },
    { id: 'both_teams_score', name: 'Ambas Marcam', count: 1 },
    { id: 'first_goalscorer', name: 'Primeiro Gol', count: 1 },
    { id: 'cards', name: 'Cartões', count: 1 },
    { id: 'corners', name: 'Escanteios', count: 1 }
  ];

  const filteredMarkets = selectedCategory === 'all' 
    ? Object.entries(betBuilderData)
    : Object.entries(betBuilderData).filter(([key]) => key === selectedCategory);

  const selectedBets = getSelectedBets();
  const totalOdds = calculateTotalOdds();
  const potentialWin = calculatePotentialWin();
  const potentialProfit = calculatePotentialProfit();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-heading-xl font-bold text-text-primary mb-2">
          Bet Builder
        </h1>
        <p className="text-body-md text-text-secondary mb-4">
          Real Madrid vs Liverpool - Construa sua aposta combinada personalizada
        </p>
        
        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="card">
            <div className="card-body text-center">
              <div className="text-heading-md font-bold text-alfa-blue">
                {selectedSelections.length}
              </div>
              <div className="text-body-sm text-text-secondary">
                Seleções
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="text-heading-md font-bold text-alfa-green">
                {totalOdds.toFixed(2)}
              </div>
              <div className="text-body-sm text-text-secondary">
                Odds Total
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="text-heading-md font-bold text-alfa-orange">
                R$ {potentialWin.toFixed(2)}
              </div>
              <div className="text-body-sm text-text-secondary">
                Retorno Potencial
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="text-heading-md font-bold text-alfa-purple">
                R$ {potentialProfit.toFixed(2)}
              </div>
              <div className="text-body-sm text-text-secondary">
                Lucro Potencial
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bet Slip */}
      {selectedSelections.length > 0 && (
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-heading-md font-semibold text-text-primary">
                🎯 Sua Aposta Combinada
              </h3>
              <button
                onClick={() => setSelectedSelections([])}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Limpar Tudo
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="space-y-3 mb-4">
              {selectedBets.map((bet, index) => (
                <div key={bet.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">
                      {bet.selection}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {bet.market}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-alfa-blue">
                      {bet.odds.toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleSelectionToggle(bet.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Valor da Aposta
                  </label>
                  <input
                    type="number"
                    value={stake}
                    onChange={(e) => setStake(Number(e.target.value) || 0)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-alfa-blue focus:border-alfa-blue"
                    placeholder="R$ 10,00"
                    min="1"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Odds Combinadas
                  </label>
                  <div className="p-2 bg-gray-100 rounded-lg text-lg font-bold text-alfa-blue">
                    {totalOdds.toFixed(2)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Retorno Total</div>
                  <div className="text-xl font-bold text-alfa-green">
                    R$ {potentialWin.toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Lucro</div>
                  <div className="text-xl font-bold text-alfa-orange">
                    R$ {potentialProfit.toFixed(2)}
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-alfa-blue text-white py-3 rounded-lg font-semibold hover:bg-alfa-blue/90 transition-colors">
                Fazer Aposta Combinada
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instruções */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-heading-md font-semibold text-text-primary">
            ℹ️ Como usar o Bet Builder
          </h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-text-primary mb-3">Funcionalidades:</h4>
              <ul className="text-sm text-text-secondary space-y-2">
                <li>• <strong>Seleções múltiplas:</strong> Combine diferentes mercados</li>
                <li>• <strong>Odds dinâmicas:</strong> Cálculo automático em tempo real</li>
                <li>• <strong>Conflitos automáticos:</strong> Evita seleções incompatíveis</li>
                <li>• <strong>Uma por categoria:</strong> Apenas uma seleção por tipo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-3">Dicas:</h4>
              <ul className="text-sm text-text-secondary space-y-2">
                <li>• Combine 3-5 seleções para melhores odds</li>
                <li>• Evite muitas seleções de baixa odd</li>
                <li>• Balance risco e recompensa</li>
                <li>• Use o filtro para encontrar mercados específicos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-heading-md font-semibold text-text-primary">
            Filtros por Categoria
          </h3>
        </div>
        <div className="card-body">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-alfa-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mercados */}
      <div className="space-y-6">
        {filteredMarkets.map(([key, market]) => (
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
                    {market.selections.length} opções
                  </div>
                  <div className="text-xs text-text-secondary">
                    {market.category}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <BetBuilderMarket
                market={market}
                selectedSelections={selectedSelections}
                onSelectionToggle={handleSelectionToggle}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Apostas Populares */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-heading-md font-semibold text-text-primary">
            🔥 Combinações Populares
          </h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="font-semibold text-text-primary mb-2">
                Aposta Segura
              </div>
              <div className="text-sm text-text-secondary space-y-1">
                <div>• Real Madrid Vitória</div>
                <div>• Over 2.5 Gols</div>
                <div>• Ambas Marcam - Sim</div>
                <div className="font-bold text-alfa-blue">Odds: 6.83</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="font-semibold text-text-primary mb-2">
                Aposta Arriscada
              </div>
              <div className="text-sm text-text-secondary space-y-1">
                <div>• Liverpool Vitória</div>
                <div>• Salah Primeiro Gol</div>
                <div>• Over 3.5 Gols</div>
                <div>• Over 5.5 Cartões</div>
                <div className="font-bold text-alfa-blue">Odds: 103.04</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetBuilder; 