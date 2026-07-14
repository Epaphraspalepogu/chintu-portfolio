/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          950: '#05060f',
          900: '#0a0c1b',
          800: '#11142a',
          700: '#1a1e3c',
        },
        electric: '#38bdf8',
        royal: '#a78bfa',
        cyan: '#22d3ee',
        silver: '#cbd5e1',
        titanium: '#94a3b8',
      },
      animation: {
        'aurora': 'aurora 18s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)', opacity: '0.7' },
          '33%': { transform: 'translate(6%, -4%) scale(1.1)', opacity: '0.9' },
          '66%': { transform: 'translate(-4%, 6%) scale(0.95)', opacity: '0.6' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(40px)' },
          '50%': { opacity: '0.7', filter: 'blur(60px)' },
        },
      },
    },
  },
  plugins: [],
};
