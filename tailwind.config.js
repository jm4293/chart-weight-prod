/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './asset/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-header': 'var(--bg-header)',
        'theme-main': 'var(--bg-main)',
        'theme-section': 'var(--bg-section)',
      },
    },
  },
  plugins: [],
};
