import React from 'react';
import { Link } from 'react-router-dom';
import { useBetSlip } from '../../context/BetSlipContext';

const Header: React.FC = () => {
  const { betSlip, toggle } = useBetSlip();

  return (
    <header className="bg-bg-primary border-b border-border-primary sticky top-0 z-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-text-on-primary">A</span>
            </div>
            <div>
              <h1 className="text-heading-md font-bold text-text-primary">
                Alfa Sportsbook
              </h1>
              <p className="text-caption text-text-tertiary">
                Odds Component Library
              </p>
            </div>
          </Link>

          {/* BetSlip Button - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggle}
              className="relative bg-bg-secondary hover:bg-bg-tertiary border border-border-primary rounded-lg px-4 py-2 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-body-md font-medium text-text-primary">
                  Cupom
                </span>
                {betSlip.selections.length > 0 && (
                  <span className="bg-primary text-text-on-primary rounded-full w-6 h-6 flex items-center justify-center text-caption font-bold">
                    {betSlip.selections.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 