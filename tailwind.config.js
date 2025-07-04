/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'display': ['Montserrat', 'sans-serif'],
        'body': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['58px', { lineHeight: '68px', letterSpacing: '-0.02em' }],
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em' }],
        'display-md': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em' }],
        'display-sm': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em' }],
        'heading-xl': ['28px', { lineHeight: '36px', letterSpacing: '-0.01em' }],
        'heading-lg': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em' }],
        'heading-md': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        'heading-sm': ['18px', { lineHeight: '26px', letterSpacing: '-0.01em' }],
        'body-lg': ['16px', { lineHeight: '24px', letterSpacing: '0em' }],
        'body-md': ['14px', { lineHeight: '22px', letterSpacing: '0em' }],
        'body-sm': ['13px', { lineHeight: '20px', letterSpacing: '0em' }],
        'caption': ['12px', { lineHeight: '18px', letterSpacing: '0.01em' }],
      },
      colors: {
        // Cores do Sistema
        'primary': '#E5FF00',
        'secondary': '#1E3A8A',
        'accent': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'success': '#10B981',
        
        // Cores de Background
        'bg-zero': '#0F0F23',
        'bg-primary': '#1A1A2E',
        'bg-secondary': '#252550',
        'bg-tertiary': '#2D2D5A',
        'bg-surface': '#16213E',
        'bg-elevated': '#1E3A8A',
        'bg-overlay': 'rgba(15, 15, 35, 0.9)',
        
        // Cores de Texto
        'text-primary': '#FFFFFF',
        'text-secondary': '#E5E7EB',
        'text-tertiary': '#9CA3AF',
        'text-disabled': '#6B7280',
        'text-on-primary': '#0F0F23',
        'text-on-secondary': '#FFFFFF',
        
        // Cores de Borda
        'border-primary': '#374151',
        'border-secondary': '#4B5563',
        'border-accent': '#E5FF00',
        'border-hover': '#6B7280',
        'border-focus': '#E5FF00',
        
        // Cores por Esporte
        'sport-color-football': '#00B050',
        'sport-color-basketball': '#FF8C00',
        'sport-color-tennis': '#FFD700',
        'sport-color-baseball': '#8B4513',
        'sport-color-hockey': '#00CED1',
        'sport-color-soccer': '#32CD32',
        'sport-color-volleyball': '#FF6347',
        'sport-color-boxing': '#DC143C',
        'sport-color-mma': '#8B0000',
        'sport-color-esports': '#9932CC',
        'sport-color-other': '#708090',
        
        // Estados das Odds
        'odds-up': '#10B981',
        'odds-down': '#EF4444',
        'odds-suspended': '#F59E0B',
        'odds-locked': '#6B7280',
        'odds-hover': '#E5FF00',
        'odds-selected': '#E5FF00',
        'odds-bg': '#1E2A5E',
        'odds-bg-hover': '#2563EB',
        'odds-bg-selected': '#E5FF00',
        'odds-text': '#FFFFFF',
        'odds-text-selected': '#0F0F23',
        
        // Cores Alfa (para compatibilidade)
        'alfa-blue': '#1E3A8A',
        'alfa-green': '#10B981',
        'alfa-orange': '#F59E0B',
        'alfa-purple': '#8B5CF6',
        
        // Cores do BetSlip
        'betslip-bg': '#0F0F23',
        'betslip-header': '#1E3A8A',
        'betslip-selection': '#252550',
        'betslip-selection-hover': '#2D2D5A',
        'betslip-total': '#E5FF00',
        'betslip-win': '#10B981',
        'betslip-lose': '#EF4444',
        
        // Cores de Mercado
        'market-bg': '#1E2A5E',
        'market-header': '#2C3E73',
        'market-border': '#374151',
        'market-hover': '#2563EB',
        'market-selected': '#E5FF00',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '120': '30rem',
        '144': '36rem',
      },
      boxShadow: {
        'odds': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'odds-hover': '0 4px 8px rgba(0, 0, 0, 0.2)',
        'odds-selected': '0 0 0 2px #E5FF00',
        'betslip': '0 10px 25px rgba(0, 0, 0, 0.5)',
        'market': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'elevated': '0 8px 24px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'odds-flash': 'flash 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'fade-in': 'fadeIn 0.2s ease-in',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        flash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
        '500': '500',
      },
    },
  },
  plugins: [],
} 