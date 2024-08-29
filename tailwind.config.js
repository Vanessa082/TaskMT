/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      "hero-banner": "linear-gradient(0deg, #00000069, #00000069), url('/landing/banner-img.jpg')",
      "simple-dark": "linear-gradient(0deg, #00000069, #00000069)",
    },
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "lighter-shade-s-color": "var(--lighter-shade-s-color)",
        "accent-color": "var(--accent-color)",
        "text-color": "var(--text-color)",
        "muted-text-color": "var(--muted-text-color)",
        "background-color": "var(--background-color)",
        "overlay-color": "var(--overlay-color)"
      },
      transitionTimingFunction: {
        'custom-cubic': 'cubic-bezier(.8,0,.05,1)',
      },
      transitionDuration: {
        '300': '300ms',
      },
      backgroundImage: {
        'custom-gradient': 'radial-gradient(circle at top left, #83b5de, #92c4e8 20%, #69a0d3 40%, #092c5a 70%, #00288e 100%)',
        'linear-gradient-top-white': 'linear-gradient(to top, #092c5a,#092c5a 20% ,  #092c5a 20%,#ffffff)',
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
