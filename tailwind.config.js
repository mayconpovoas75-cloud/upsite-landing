/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#090604',
        bark: '#1A0D08',
        ember: '#991B1B',
        flame: '#F97316',
        blaze: '#EA580C',
        sand: '#F5E7D0',
        cream: '#FFF7ED',
        smoke: '#D6B89D',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        ember: '0 24px 70px rgba(249, 115, 22, 0.2)',
        panel: '0 24px 60px rgba(0, 0, 0, 0.4)',
        soft: '0 16px 36px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        embers:
          'radial-gradient(circle at top, rgba(249, 115, 22, 0.26), transparent 32%), radial-gradient(circle at 85% 15%, rgba(153, 27, 27, 0.22), transparent 28%), linear-gradient(160deg, rgba(9, 6, 4, 0.98), rgba(26, 13, 8, 0.96))',
        wood:
          'linear-gradient(135deg, rgba(255, 255, 255, 0.03), transparent 34%), linear-gradient(180deg, rgba(34, 17, 11, 0.96), rgba(12, 7, 5, 0.94))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        emberPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(249, 115, 22, 0.16)' },
          '70%': { boxShadow: '0 0 0 18px rgba(249, 115, 22, 0)' },
        },
        fadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(18px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'ember-pulse': 'emberPulse 2.8s infinite',
        'fade-up': 'fadeUp 0.7s ease-out both',
      },
    },
  },
  plugins: [],
}
