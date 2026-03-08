/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FCFCFA',
        cream: '#F2F2EE',
        beige: '#DDDCD5',
        taupe: '#7B7A73',
        olive: '#5F6A58',
        espresso: '#2F2E2A',
        charcoal: '#1F1F1B',
        gold: '#A28758',
      },
      boxShadow: {
        soft: '0 12px 30px -18px rgba(47, 46, 42, 0.28)',
        card: '0 16px 32px -24px rgba(31, 31, 27, 0.24)',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        softenIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        softenIn: 'softenIn 420ms cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
