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
        "text-color-3": "var(--text-color-3)",
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
      keyframes: {
        'rotate-in-up-left': {
          '0%': {
            transformOrigin: 'left bottom',
            transform: 'rotate(90deg)',
            opacity: '0',
          },
          '100%': {
            transformOrigin: 'left bottom',
            transform: 'rotate(0)',
            opacity: '1',
          },
        },
        pulse: {
          '0%': {
            transform: 'scale(0.8)',
            backgroundColor: '#b3d4fc',
            boxShadow: '0 0 0 0 rgba(178, 212, 252, 0.7)',
          },
          '50%': {
            transform: 'scale(1.2)',
            backgroundColor: '#4b79e4',
            boxShadow: '0 0 0 10px rgba(178, 212, 252, 0)',
          },
          '100%': {
            transform: 'scale(0.8)',
            backgroundColor: '#2584f8',
            boxShadow: '0 0 0 0 rgba(178, 212, 252, 0.7)',
          },
        },
      },
      animation: {
        'rotate-in-up-left': 'rotate-in-up-left 2s ease infinite',
        pulse: 'pulse 1.5s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
