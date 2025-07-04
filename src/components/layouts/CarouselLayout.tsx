import React, { useState } from 'react';
import { LayoutProps, LayoutType } from '../../types';
import { MarketGroup } from '../core';

const CarouselLayout: React.FC<LayoutProps> = ({
  markets,
  onSelectionClick,
  selectedSelections = [],
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(markets.length / itemsPerPage);

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentMarkets = () => {
    const start = currentIndex * itemsPerPage;
    return markets.slice(start, start + itemsPerPage);
  };

  return (
    <div
      className={`carousel-layout relative ${className}`}
      data-testid="carousel-layout"
    >
      {/* Navigation Arrows */}
      {markets.length > itemsPerPage && (
        <>
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-bg-surface hover:bg-bg-tertiary border border-border-primary rounded-full w-8 h-8 flex items-center justify-center text-text-primary transition-colors"
            disabled={currentIndex === 0}
          >
            ←
          </button>
          
          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-bg-surface hover:bg-bg-tertiary border border-border-primary rounded-full w-8 h-8 flex items-center justify-center text-text-primary transition-colors"
            disabled={currentIndex === totalPages - 1}
          >
            →
          </button>
        </>
      )}

      {/* Markets Container */}
      <div className="overflow-hidden px-10">
        <div 
          className="flex transition-transform duration-300 ease-in-out gap-4"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {markets.map((market) => (
            <div
              key={market.id}
              className="min-w-[calc(33.333%-0.667rem)] flex-shrink-0"
            >
              <MarketGroup
                market={market}
                layout={LayoutType.CAROUSEL}
                onSelectionClick={onSelectionClick}
                selectedSelections={selectedSelections}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Page Indicators */}
      {markets.length > itemsPerPage && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-primary'
                  : 'bg-border-secondary hover:bg-border-hover'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselLayout; 