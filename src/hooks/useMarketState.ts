import { useState } from 'react';
import { LayoutType } from '../types';

export const useMarketState = () => {
  const [selectedLayouts, setSelectedLayouts] = useState<Record<string, LayoutType>>({});
  const [globalLayout, setGlobalLayout] = useState<LayoutType>(LayoutType.BI_COLUMN);
  const [collapsedMarkets, setCollapsedMarkets] = useState<Record<string, boolean>>({});
  const [favoriteMarkets, setFavoriteMarkets] = useState<Set<string>>(new Set());

  const handleLayoutChange = (marketId: string, layout: LayoutType) => {
    setSelectedLayouts(prev => ({
      ...prev,
      [marketId]: layout
    }));
  };

  const getLayoutForMarket = (marketId: string): LayoutType => {
    return selectedLayouts[marketId] || globalLayout;
  };

  const toggleMarketCollapse = (marketId: string) => {
    setCollapsedMarkets(prev => ({
      ...prev,
      [marketId]: !prev[marketId]
    }));
  };

  const toggleMarketFavorite = (marketId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que o collapse seja acionado
    setFavoriteMarkets(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(marketId)) {
        newFavorites.delete(marketId);
      } else {
        newFavorites.add(marketId);
      }
      return newFavorites;
    });
  };

  return {
    selectedLayouts,
    globalLayout,
    setGlobalLayout,
    collapsedMarkets,
    favoriteMarkets,
    handleLayoutChange,
    getLayoutForMarket,
    toggleMarketCollapse,
    toggleMarketFavorite
  };
}; 