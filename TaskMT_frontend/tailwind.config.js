// tailwind.config.js
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
        "text-color-2": "var(--text-color-2)",
        "text-color-3" :  "var(--text-color-3)",
        "text-color-4": "var(--text-color-4)",
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "sidebar-color": "var(--sidebar-color)"
      },
      transitionTimingFunction: {
        'custom-cubic': 'cubic-bezier(.8,0,.05,1)',
      },
      transitionDuration: {
        '300': '300ms',
      },
      backgroundImage: {
        'custom-gradient': 'radial-gradient(circle at top left, #83b5de, #6599ef 10%, #4385f4 20%, #0939a5 70%, #00288e 100%)',
        'linear-gradient-top-white': 'linear-gradient(to top, #b7cbed,#b7cbed 20% ,  #b7cbed 20%,#ffffff)',
      },
    },
  },
  plugins: [],
};
