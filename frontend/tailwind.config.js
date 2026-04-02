/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#08060e', // Obsidian black background
          card: '#120d1c', // Sleek violet-tinted dark card
          border: '#2e1f49', // Subtle violet border
          text: '#ffffff', // Crisp white text
          muted: '#9ca3af' // Muted gray text
        },
        brand: {
          primary: '#7c3aed', // Vivid violet accent
          secondary: '#a78bfa', // Neon lavender highlights
          accent: '#ec4899' // Soft pink glows
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
