const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  fonts: [
    {
      family: 'Lato',
      variants: ['300', '400', '700', '900'],
    },
  ],
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/lib/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /border-(error|warning|successful)-(500|600|700)/,
    },
    {
      pattern: /text-(error|warning|successful)-(500|600|700)/,
    },
  ],
  theme: {
    fontFamily: {
      lato: ['Lato', 'system-ui'],
      // Add more font families if needed
    },
    screens: {
      sm: '425px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      minWidth: {
        8: '2rem',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        md: '1.125rem',
        lg: '1.25rem',
        xl: '1.375rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        '4xl': '1.875rem',
        '5xl': '2.125rem',
        'm-landing-title': ['3.125rem', '3.2rem'],
        'd-landing-title': ['4.125rem', '4.5rem'],
      },
      backgroundImage: {
        'hero-background': "url('/landing-background.png')",
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        bg: {
          white: '#FDFCFB',
          dark: '#F5F6F6',
        },
        text: {
          primary: '#1A242A',
          secondary: '#445F6F',
          tertiary: '#7697AB',
          disabled: '#ABAEB0',
          white: '#FFFFFF',
          stroke: '#BACBD5',
        },
        dividers: '#DDE5EA',
        'interface-hover': '#E3E9EC',
        disabled: '#DDE5EA',
        'bg-disabled': '#FF1F2F4',
        stroke: '#BACBD5',
        accent1: {
          1000: '#570421',
          900: '#7A081A',
          800: '#930E18',
          700: '#B71616',
          600: '#DB2E20',
          500: '#FF4C2C',
          400: '#FF8560',
          300: '#FFA780',
          200: '#FFCBAA',
          100: '#FFE8D4',
        },
        accent2: {
          1000: '#030A4A',
          900: '#071268',
          800: '#0B1B7D',
          700: '#12289C',
          600: '#1B37BA',
          500: '#2549D9',
          400: '#5777E8',
          300: '#7A97F3',
          200: '#A7BDFB',
          100: '#D3DFFD',
        },
        successful: {
          1000: '#013E4A',
          900: '#026765',
          800: '#047D6E',
          700: '#079B7B',
          600: '#0AB982',
          500: '#0FD884',
          400: '#45E793',
          300: '#6BF39F',
          200: '#9DFBB8',
          100: '#CDFDD6',
        },
        error: {
          1000: '#56063A',
          900: '#780D3D',
          800: '#921642',
          700: '#B52349',
          600: '#D8334F',
          500: '#FC4655',
          400: '#FD7574',
          300: '#FE9A8F',
          200: '#FEC3B5',
          100: '#FEE4DA',
        },
        warning: {
          1000: '#573F03',
          900: '#7A5F07',
          800: '#93760C',
          700: '#B79614',
          600: '#DBB81D',
          500: '#FFDB28',
          400: '#FFE65D',
          300: '#FFED7E',
          200: '#FFF5A9',
          100: '#FFFAD3',
        },
      },
      animation: {
        slideInFromRight: 'slideInFromRight 0.7s ease-out forwards',
        fadeOut: 'fadeOut 0.5s ease-out forwards', // If you want to use the fade-out animation
        fadeIn: 'fadeIn 0.5s ease-out forwards', // Add this line for fade-in animation
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('prettier-plugin-tailwindcss'), require('@tailwindcss/typography')],
}
