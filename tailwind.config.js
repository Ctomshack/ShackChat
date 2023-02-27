/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'sent': '#0078ff',
      'received': '#e9e9eb',
      'background' : '',
      'google': '#4285F4',
      'header': '#f1f1f2',
      'iosBlue': '#3378f6',
      'inputRing': '#d2d2d5',
    },},
  },
  plugins: [],
}