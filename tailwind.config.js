/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#fffcf6',
        'primary-text': '#4f4f4f',
        'accent-text': '#707070',
        'secondary-background': '#ffecbc',
        'secondary-primary': '#d86a2b',
      },
    },
  },
  plugins: [],
};
