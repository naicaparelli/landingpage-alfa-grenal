import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { BetSlipContextValue, BetSlip, Selection, BetType } from '../types';
import { 
  calculateTotalOdds, 
  calculatePotentialWin, 
  calculatePotentialReturn,
  saveToLocalStorage,
  loadFromLocalStorage
} from '../utils';

const BetSlipContext = createContext<BetSlipContextValue | undefined>(undefined);

export const useBetSlip = () => {
  const context = useContext(BetSlipContext);
  if (!context) {
    throw new Error('useBetSlip must be used within a BetSlipProvider');
  }
  return context;
};

interface BetSlipProviderProps {
  children: React.ReactNode;
}

export const BetSlipProvider: React.FC<BetSlipProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [betSlip, setBetSlip] = useState<BetSlip>(() => {
    const saved = loadFromLocalStorage<BetSlip>('betslip', {
      selections: [],
      betType: BetType.SINGLE,
      stake: 10,
      totalOdds: 1,
      potentialWin: 0,
      potentialReturn: 0,
      minStake: 1,
      maxStake: 10000,
      maxWin: 50000
    });
    return saved;
  });

  // Recalcular valores quando seleções ou stake mudarem
  useEffect(() => {
    const totalOdds = calculateTotalOdds(betSlip.selections);
    const potentialWin = calculatePotentialWin(betSlip.stake, totalOdds);
    const potentialReturn = calculatePotentialReturn(betSlip.stake, totalOdds);

    setBetSlip(prev => ({
      ...prev,
      totalOdds,
      potentialWin,
      potentialReturn
    }));
  }, [betSlip.selections, betSlip.stake]);

  // Salvar no localStorage quando betSlip mudar
  useEffect(() => {
    saveToLocalStorage('betslip', betSlip);
  }, [betSlip]);

  const addSelection = useCallback((selection: Selection) => {
    setBetSlip(prev => {
      // Verificar se a seleção já existe
      const existingIndex = prev.selections.findIndex(s => s.id === selection.id);
      
      if (existingIndex !== -1) {
        // Se já existe, remover
        return {
          ...prev,
          selections: prev.selections.filter(s => s.id !== selection.id)
        };
      } else {
        // Verificar limite máximo de seleções
        if (prev.selections.length >= 15) {
          return prev;
        }
        
        // Verificar se é do mesmo evento (para evitar conflitos)
        const sameEventSelections = prev.selections.filter(s => s.eventId === selection.eventId);
        if (sameEventSelections.length > 0) {
          // Remover outras seleções do mesmo evento
          const filteredSelections = prev.selections.filter(s => s.eventId !== selection.eventId);
          return {
            ...prev,
            selections: [...filteredSelections, { ...selection, selected: true }]
          };
        }
        
        // Adicionar nova seleção
        return {
          ...prev,
          selections: [...prev.selections, { ...selection, selected: true }]
        };
      }
    });
  }, []);

  const removeSelection = useCallback((selectionId: string) => {
    setBetSlip(prev => ({
      ...prev,
      selections: prev.selections.filter(s => s.id !== selectionId)
    }));
  }, []);

  const updateStake = useCallback((stake: number) => {
    setBetSlip(prev => ({
      ...prev,
      stake: Math.max(0, Math.min(stake, prev.maxStake))
    }));
  }, []);

  const changeBetType = useCallback((betType: BetType) => {
    setBetSlip(prev => ({
      ...prev,
      betType
    }));
  }, []);

  const clearAll = useCallback(() => {
    setBetSlip(prev => ({
      ...prev,
      selections: []
    }));
  }, []);

  const placeBet = useCallback(async () => {
    try {
      // Simular colocação de aposta
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Limpar cupom após sucesso
      setBetSlip(prev => ({
        ...prev,
        selections: [],
        stake: 10
      }));
      
      // Fechar cupom
      setIsOpen(false);
      
      // Aqui você poderia enviar para uma API real
      console.log('Aposta colocada com sucesso:', betSlip);
      
    } catch (error) {
      console.error('Erro ao colocar aposta:', error);
      throw error;
    }
  }, [betSlip]);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const value: BetSlipContextValue = {
    betSlip,
    addSelection,
    removeSelection,
    updateStake,
    changeBetType,
    clearAll,
    placeBet,
    isOpen,
    toggle
  };

  return (
    <BetSlipContext.Provider value={value}>
      {children}
    </BetSlipContext.Provider>
  );
}; 