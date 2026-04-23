/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
          900: '#4c1d95',
        }
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'float': '0 8px 30px rgba(0,0,0,0.04)',
        'focus': '0 0 0 2px rgba(24, 24, 27, 0.1)',
      },
      letterSpacing: {
        tightest: '-.04em',
      }
    },
  },
  plugins: [],
};
