import React from 'react';
import { LayoutType } from '../../types';

interface LayoutSelectorProps {
  selectedLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  title?: string;
  className?: string;
}

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  selectedLayout,
  onLayoutChange,
  title = "Selecionar Layout:",
  className = ""
}) => {
  const getLayoutDisplayName = (layout: LayoutType): string => {
    const layoutNames = {
      [LayoutType.BI_COLUMN]: 'Bi-Coluna',
      [LayoutType.TRI_COLUMN]: 'Tri-Coluna',
      [LayoutType.GRID]: 'Grid',
      [LayoutType.LIST]: 'Lista',
      [LayoutType.ACCORDION]: 'Acordeão',
      [LayoutType.LADDER]: 'Escada',
      [LayoutType.CAROUSEL]: 'Carrossel',
      [LayoutType.TABS]: 'Abas'
    };
    return layoutNames[layout] || 'Desconhecido';
  };

  return (
    <div className={`rounded-lg p-4 border ${className}`} style={{ 
      backgroundColor: 'var(--sportsbook-section)',
      borderColor: 'var(--sportsbook-bg-extra)'
    }}>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {Object.values(LayoutType).map((layout) => (
          <button
            key={layout}
            onClick={() => onLayoutChange(layout)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedLayout === layout
                ? 'bg-yellow-400 text-gray-900'
                : 'text-white hover:bg-yellow-400 hover:text-gray-900'
            }`}
            style={{ 
              backgroundColor: selectedLayout === layout 
                ? 'var(--sportsbook-accent)' 
                : 'var(--sportsbook-primary)' 
            }}
          >
            {getLayoutDisplayName(layout)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayoutSelector; 