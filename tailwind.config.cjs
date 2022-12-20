/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        0: 0,
        4: '4px',
        8: '8px',
        12: '12px'
      }
    }
  },
  plugins: []
}
