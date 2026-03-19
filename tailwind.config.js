/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Bebas Neue"', 'cursive'],
        'body': ['"DM Sans"', 'sans-serif'],
        'mono': ['"Space Mono"', 'monospace'],
        'serif': ['"Playfair Display"', 'serif'],
      },
      colors: {
        'void': '#050505',
        'obsidian': '#0a0a0a',
        'carbon': '#111111',
        'charcoal': '#1a1a1a',
        'graphite': '#2a2a2a',
        'slate': '#3a3a3a',
        'silver': '#c0c0c0',
        'pearl': '#e8e4dc',
        'ivory': '#f5f0e8',
        'accent': '#8b7355',
        'gold': '#c9a96e',
        'ice': '#a8b5c4',
      },
      letterSpacing: {
        'widest2': '0.3em',
        'widest3': '0.5em',
      }
    },
  },
  plugins: [],
}
