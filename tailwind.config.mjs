import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3840px',
      },
      colors: {
        synth: {
          bg: '#2a2139',
          pink: '#f92aad',
          cyan: '#25b0bc',
          text: '#e5e5e5',
          glow: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        glow: {
          from: { textShadow: '0 0 7px #f92aad' },
          to: { textShadow: '0 0 10px #f92aad, 0 0 15px #f92aad' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { 
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  daisyui: {
    themes: [
      {
        synthwave: {
          "primary": "#f92aad",
          "primary-content": "#ffffff",
          "secondary": "#25b0bc",
          "secondary-content": "#ffffff",
          "accent": "#f92aad",
          "accent-content": "#ffffff",
          "neutral": "#2a2139",
          "neutral-content": "#e5e5e5",
          "base-100": "#2a2139",
          "base-200": "#1f1929",
          "base-300": "#191322",
          "base-content": "#e5e5e5",
          "info": "#25b0bc",
          "info-content": "#ffffff",
          "success": "#00ff88",
          "success-content": "#000000",
          "warning": "#ffaa00",
          "warning-content": "#000000",
          "error": "#ff5555",
          "error-content": "#ffffff",
        },
      },
      "dark",
      "synthwave",
    ],
    darkTheme: "synthwave",
  },
  plugins: [typography, daisyui],
};