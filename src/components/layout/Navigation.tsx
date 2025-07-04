import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/markets', label: 'Mercados', icon: '⚽' },
    { path: '/event', label: 'Real Madrid vs Liverpool', icon: '🏆' },
    { path: '/player-props', label: 'Player Props', icon: '👤' },
    { path: '/bet-builder', label: 'Bet Builder', icon: '🔧' },
    { path: '/experimental', label: 'Experimental', icon: '🧪' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-bg-secondary border-b border-border-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center overflow-x-auto scrollbar-hide py-3 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-body-sm font-medium whitespace-nowrap transition-colors
                ${isActivePath(item.path)
                  ? 'bg-primary text-text-on-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                }
              `}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="hidden sm:block">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 