import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useBetSlip } from './context/BetSlipContext';
import { BetSlip } from './components/core';

// Páginas
import Home from './pages/Home';
import MainMarkets from './pages/MainMarkets';
import PlayerProps from './pages/PlayerProps';
import BetBuilder from './pages/BetBuilder';
import { EventDetailPage } from './pages/EventDetailPage';
import ExperimentalPage from './pages/ExperimentalPage';

// Header e Layout
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';

function App() {
  const { betSlip, addSelection, removeSelection, updateStake, changeBetType, placeBet, clearAll, isOpen, toggle } = useBetSlip();

  return (
    <div className="min-h-screen bg-bg-zero">
      {/* Header */}
      <Header />
      
      {/* Navegação */}
      <Navigation />
      
      {/* Conteúdo Principal */}
      <main className="container mx-auto px-1 sm:px-2 py-2 sm:py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/markets" element={<MainMarkets />} />
          <Route path="/event" element={<EventDetailPage />} />
          <Route path="/player-props" element={<PlayerProps />} />
          <Route path="/bet-builder" element={<BetBuilder />} />
          <Route path="/experimental" element={<ExperimentalPage />} />
        </Routes>
      </main>
      
      {/* BetSlip */}
      <BetSlip
        betSlip={betSlip}
        onUpdateStake={updateStake}
        onRemoveSelection={removeSelection}
        onChangeBetType={changeBetType}
        onPlaceBet={placeBet}
        onClearAll={clearAll}
        isOpen={isOpen}
        onToggle={toggle}
      />
      
      {/* Botão flutuante do BetSlip no mobile */}
      {betSlip.selections.length > 0 && !isOpen && (
        <button
          onClick={toggle}
          className="fixed bottom-4 right-4 z-400 bg-primary text-text-on-primary rounded-full px-4 py-3 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 md:hidden"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {betSlip.selections.length} {betSlip.selections.length === 1 ? 'Seleção' : 'Seleções'}
            </span>
            <div className="w-6 h-6 bg-text-on-primary text-primary rounded-full flex items-center justify-center text-sm font-bold">
              {betSlip.selections.length}
            </div>
          </div>
        </button>
      )}
      
      {/* Overlay para mobile quando BetSlip está aberto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-400 md:hidden"
          onClick={toggle}
        />
      )}
    </div>
  );
}

export default App; 