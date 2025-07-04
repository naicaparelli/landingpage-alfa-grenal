import React, { useState, useEffect } from 'react';
import { BetSlipProps, BetType, Selection } from '../../types';
import { 
  calculateTotalOdds, 
  calculatePotentialWin, 
  calculatePotentialReturn, 
  formatCurrency, 
  formatOdds,
  canPlaceBet,
  getSportIcon
} from '../../utils';

const BetSlip: React.FC<BetSlipProps> = ({
  betSlip,
  onUpdateStake,
  onRemoveSelection,
  onChangeBetType,
  onPlaceBet,
  onClearAll,
  isOpen,
  onToggle,
  className = ''
}) => {
  const [stakeInput, setStakeInput] = useState(betSlip.stake.toString());
  const [isPlacing, setIsPlacing] = useState(false);

  useEffect(() => {
    setStakeInput(betSlip.stake.toString());
  }, [betSlip.stake]);

  const handleStakeChange = (value: string) => {
    setStakeInput(value);
    const numValue = parseFloat(value) || 0;
    if (numValue >= 0) {
      onUpdateStake(numValue);
    }
  };

  const handleBetTypeChange = (type: BetType) => {
    onChangeBetType(type);
  };

  const handlePlaceBet = async () => {
    if (!canPlaceBet(betSlip.selections, betSlip.stake, betSlip.minStake, betSlip.maxStake)) {
      return;
    }

    setIsPlacing(true);
    try {
      await onPlaceBet();
    } finally {
      setIsPlacing(false);
    }
  };

  const getBetTypeDisplayName = (type: BetType) => {
    switch (type) {
      case BetType.SINGLE:
        return 'Simples';
      case BetType.MULTIPLE:
        return 'Múltipla';
      case BetType.SYSTEM:
        return 'Sistema';
      case BetType.CHAIN:
        return 'Cadeia';
      default:
        return 'Simples';
    }
  };

  const canPlace = canPlaceBet(betSlip.selections, betSlip.stake, betSlip.minStake, betSlip.maxStake);

  return (
    <div
      className={`betslip fixed right-0 top-0 h-full w-full max-w-md bg-betslip-bg border-l border-border-primary shadow-betslip z-500 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } ${className}`}
      data-testid="betslip"
    >
      {/* Header */}
      <div className="betslip-header bg-betslip-header px-4 py-3 border-b border-border-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-montserrat font-medium text-heading-md text-text-primary">
              Cupom de Apostas
            </h2>
            <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-text-on-primary rounded-full text-caption font-medium">
              {betSlip.selections.length}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {betSlip.selections.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-text-tertiary hover:text-text-primary transition-colors"
                title="Limpar tudo"
              >
                🗑️
              </button>
            )}
            
            <button
              onClick={onToggle}
              className="text-text-tertiary hover:text-text-primary transition-colors"
              title="Fechar"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
      
      {/* Seleções */}
      <div className="betslip-selections flex-1 overflow-y-auto">
        {betSlip.selections.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-text-tertiary">
            <div className="text-4xl mb-4">🎯</div>
            <p className="text-body-md text-center">
              Selecione as odds para<br />começar a apostar
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {betSlip.selections.map((selection) => (
              <div
                key={selection.id}
                className="betslip-selection bg-betslip-selection border border-border-primary rounded-lg p-3 hover:bg-betslip-selection-hover transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs">
                        {getSportIcon(selection.sport)}
                      </span>
                      <span className="text-caption text-text-tertiary truncate">
                        {selection.eventName}
                      </span>
                    </div>
                    
                    <p className="text-body-sm text-text-primary font-medium truncate">
                      {selection.name}
                    </p>
                    
                    <p className="text-caption text-text-secondary">
                      {selection.marketName}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-2">
                    <span className="text-body-md font-medium text-text-primary">
                      {formatOdds(selection.odds.value)}
                    </span>
                    
                    <button
                      onClick={() => onRemoveSelection(selection.id)}
                      className="text-text-tertiary hover:text-error transition-colors"
                      title="Remover seleção"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                {/* Indicador de estado da odd */}
                {selection.odds.state !== 'normal' && (
                  <div className="mt-2 pt-2 border-t border-border-primary">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selection.odds.state === 'suspended' ? 'bg-warning/10 text-warning' :
                      selection.odds.state === 'locked' ? 'bg-error/10 text-error' :
                      'bg-success/10 text-success'
                    }`}>
                      {selection.odds.state === 'suspended' ? 'Suspenso' :
                       selection.odds.state === 'locked' ? 'Bloqueado' :
                       'Ativo'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Controles e Resumo */}
      {betSlip.selections.length > 0 && (
        <div className="betslip-controls border-t border-border-primary bg-betslip-bg">
          {/* Tipo de Aposta */}
          <div className="p-4 border-b border-border-primary">
            <label className="block text-body-sm font-medium text-text-primary mb-2">
              Tipo de Aposta
            </label>
            <div className="flex gap-2">
              {[BetType.SINGLE, BetType.MULTIPLE, BetType.SYSTEM].map((type) => (
                <button
                  key={type}
                  onClick={() => handleBetTypeChange(type)}
                  disabled={type === BetType.SINGLE && betSlip.selections.length > 1}
                  className={`flex-1 px-3 py-2 rounded-lg text-body-sm font-medium transition-colors ${
                    betSlip.betType === type
                      ? 'bg-primary text-text-on-primary'
                      : 'bg-bg-secondary text-text-primary hover:bg-bg-tertiary'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {getBetTypeDisplayName(type)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Valor da Aposta */}
          <div className="p-4 border-b border-border-primary">
            <label className="block text-body-sm font-medium text-text-primary mb-2">
              Valor da Aposta
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary">
                R$
              </span>
              <input
                type="number"
                value={stakeInput}
                onChange={(e) => handleStakeChange(e.target.value)}
                min={betSlip.minStake}
                max={betSlip.maxStake}
                step="0.01"
                placeholder="0,00"
                className="w-full pl-8 pr-4 py-2 bg-bg-secondary border border-border-primary rounded-lg text-text-primary focus:border-border-focus focus:outline-none"
              />
            </div>
            
            <div className="flex items-center justify-between mt-2 text-caption text-text-tertiary">
              <span>Min: {formatCurrency(betSlip.minStake)}</span>
              <span>Max: {formatCurrency(betSlip.maxStake)}</span>
            </div>
          </div>
          
          {/* Resumo */}
          <div className="p-4 border-b border-border-primary">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-body-sm text-text-secondary">
                  Odds Total:
                </span>
                <span className="text-body-sm font-medium text-text-primary">
                  {formatOdds(betSlip.totalOdds)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-body-sm text-text-secondary">
                  Retorno Potencial:
                </span>
                <span className="text-body-sm font-medium text-success">
                  {formatCurrency(betSlip.potentialReturn)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-body-md font-medium text-text-primary">
                  Ganho Potencial:
                </span>
                <span className="text-body-md font-medium text-betslip-total">
                  {formatCurrency(betSlip.potentialWin)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Botão de Apostar */}
          <div className="p-4">
            <button
              onClick={handlePlaceBet}
              disabled={!canPlace || isPlacing}
              className={`w-full py-3 px-4 rounded-lg font-montserrat font-medium text-body-md transition-all duration-200 ${
                canPlace && !isPlacing
                  ? 'bg-primary hover:bg-primary/90 text-text-on-primary hover:shadow-lg active:scale-95'
                  : 'bg-bg-secondary text-text-disabled cursor-not-allowed'
              }`}
            >
              {isPlacing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Processando...
                </div>
              ) : (
                `Apostar ${formatCurrency(betSlip.stake)}`
              )}
            </button>
            
            {/* Mensagens de erro */}
            {betSlip.stake < betSlip.minStake && (
              <p className="text-caption text-error mt-2">
                Valor mínimo: {formatCurrency(betSlip.minStake)}
              </p>
            )}
            
            {betSlip.stake > betSlip.maxStake && (
              <p className="text-caption text-error mt-2">
                Valor máximo: {formatCurrency(betSlip.maxStake)}
              </p>
            )}
            
            {betSlip.selections.some(s => s.odds.state !== 'normal') && (
              <p className="text-caption text-warning mt-2">
                Algumas seleções estão suspensas ou bloqueadas
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BetSlip; 