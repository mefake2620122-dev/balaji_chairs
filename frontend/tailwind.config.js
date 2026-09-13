/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E3211B',
          redDark: '#C71B16',
          burgundy: '#9A1612',
          black: '#111111',
          graphite: '#222222',
          muted: '#6B6B6B',
          lightMuted: '#9E9E9E',
          offwhite: '#F7F6F2',
          card: '#FFFFFF',
          border: 'rgba(17, 17, 17, 0.08)',
          borderDark: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Manrope', 'Inter', '-apple-system', 'sans-serif']
      },
      letterSpacing: {
        tighter: '-0.035em',
        tight: '-0.02em',
        widest: '0.15em'
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'elevated': '0 20px 50px rgba(0, 0, 0, 0.1)',
        'red-glow': '0 10px 30px rgba(227, 33, 27, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
