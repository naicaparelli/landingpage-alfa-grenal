import React, { useState } from 'react';
import { LayoutProps, LayoutType } from '../../types';
import { MarketGroup } from '../core';
import { getMarketTypeDisplayName, getSportColor } from '../../utils';

const TabsLayout: React.FC<LayoutProps> = ({
  markets,
  onSelectionClick,
  selectedSelections = [],
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(0);

  // Agrupar mercados por categoria
  const groupedMarkets = markets.reduce((acc, market) => {
    let category = 'Principais';
    
    if (market.name.includes('Gols') || market.name.includes('Total')) {
      category = 'Gols';
    } else if (market.name.includes('Tempo') || market.name.includes('Half')) {
      category = 'Tempo';
    } else if (market.name.includes('Corner') || market.name.includes('Escanteio')) {
      category = 'Escanteios';
    } else if (market.name.includes('Cartão') || market.name.includes('Card')) {
      category = 'Cartões';
    }
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(market);
    return acc;
  }, {} as Record<string, typeof markets>);

  const tabNames = Object.keys(groupedMarkets);
  const activeMarkets = Object.values(groupedMarkets)[activeTab] || [];

  return (
    <div
      className={`tabs-layout ${className}`}
      data-testid="tabs-layout"
    >
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-lg overflow-hidden">
        {tabNames.map((tabName, index) => (
          <button
            key={tabName}
            onClick={() => setActiveTab(index)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === index
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {tabName}
            <span className="ml-2 text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-1">
              {groupedMarkets[tabName].length}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-lg border border-t-0 border-gray-200">
        {tabNames.length > 0 && (
          <div className="p-4 space-y-4">
            {activeMarkets.map((market) => (
              <div
                key={market.id}
                className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
              >
                {/* Market Header */}
                <div className="bg-white px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-${getSportColor(market.sport)}`} />
                    <h4 className="font-semibold text-gray-900">
                      {getMarketTypeDisplayName(market.type)}
                    </h4>
                    {market.featured && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Destaque
                      </span>
                    )}
                  </div>
                </div>

                {/* Market Content */}
                <div className="p-4">
                  <MarketGroup
                    market={market}
                    layout={LayoutType.GRID}
                    onSelectionClick={onSelectionClick}
                    selectedSelections={selectedSelections}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsLayout; 