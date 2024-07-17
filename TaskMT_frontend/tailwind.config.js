/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "text-color-1": "var(--text-color-1)",
        "secondary-color": "var(--secondary-color)",
        "primary-color": "var(--primary-color)"
      },
      spacing: {
        //
      }
    },
  },
  plugins: [],
}
