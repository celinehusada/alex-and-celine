/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F5F1E8',
        paper: '#ECE5D3',
        'paper-deep': '#E0D6BE',
        sage: '#CDD0B6',
        olive: '#4F5A33',
        'olive-deep': '#3A4325',
        burgundy: '#6B1610',
        'burgundy-deep': '#4E0F0A',
        oxblood: '#2E0E0B',
        night: '#1F0907',
        ink: '#211A14',
        blush: '#E6CFC6'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif']
      }
    }
  }
};
