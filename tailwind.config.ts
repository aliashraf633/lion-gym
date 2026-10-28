import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#ff9f1a', dark: '#e08b10', light: '#ffb74d' },
        darkbg: '#0f0f12',
        cardbg: '#1a1a24',
        sectionbg: '#14141d',
      },
      fontFamily: { cairo: ['var(--font-cairo)', 'Cairo', 'sans-serif'] },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: { 'fade-up': 'fade-up .5s ease-out both' },
    },
  },
  plugins: [],
};
export default config;
