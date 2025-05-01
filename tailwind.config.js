/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary color (Navy Blue)
        navy: {
          50: '#f0f4fa',
          100: '#d9e2f5',
          200: '#b3c6eb',
          300: '#809ddb',
          400: '#6683c9',
          500: '#4c69b7',
          600: '#3d5494',
          700: '#1E3A8A', // Primary
          800: '#1c2d6a',
          900: '#192552',
        },
        // Secondary color (Teal)
        teal: {
          50: '#effcf9',
          100: '#d0f7ef',
          200: '#a1ece0',
          300: '#69dace',
          400: '#35c2b8',
          500: '#19a89d',
          600: '#0D9488', // Secondary
          700: '#0a7268',
          800: '#0a5b54',
          900: '#084b45',
        },
        // Accent color (Amber)
        amber: {
          500: '#F59E0B', // Accent
        },
        // Status colors
        success: {
          50: '#ecfdf5',
          500: '#10b981',
          700: '#047857',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c',
        },
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};