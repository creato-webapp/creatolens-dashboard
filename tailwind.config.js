const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  fonts: [
    {
      family: 'Lato',
      variants: ['300', '400','700','900'],
    },
  ],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}', 
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
      fontFamily: {
        lato: ['Lato', 'system-ui'],
        // Add more font families if needed
      },        
    screens: {
      sm: '400px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontSize: {
            'desktop-heading': ['2.125rem', '3.125rem'],
            'desktop-heading-2': ['1.875rem', '2.75rem'],
            'desktop-heading-3': ['1.325rem', '1.825rem'],
            'desktop-heading-4': ['1.125rem', '1.825rem'],
            'desktop-paragraph': ['0.875rem', '1.125rem'],
            'desktop-caption': ['0.75rem', '0.875rem'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        bg:{
          white:'#FDFCFB',
          dark:'#F5F6F6',
        },
        text:{
          primary: '#1A242A',
          secondary:'#445F6F',
          tertiary:'#7697AB',
          disabled: '#ABAEB0',
          white: '#FFFFFF',
          stroke: '#BACBD5',
        },
        disabled:'#DDE5EA',
        interfaceHover:'#E3E9EC',
        stroke: '#BACBD5',
        orange: {
          100: '#FFE8D4',
          200: '#FFCBAA',
          300: '#FFA780',
          400: '#FF8560',
          500: '#FF4C2C',
          600: '#DB2E20',
          700: '#B71616',
          800: '#930E18',
          900: '#7A081A',
          1000: '#570421',
        },
        indigo: {
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
        green: {
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
        red: {
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
        yellow: {
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
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/typography'),
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities({
        /* Mobile H1 Headings Medium */
        '.font-h1-medium': {
          fontSize: '1.75rem',
          lineHeight: '2.125rem',
          letterSpacing: '0',
          fontWeight: '500',
        },
        '.font-h1-semibold': {
          fontSize: '1.75rem',
          lineHeight: '2.125rem',
          letterSpacing: '0',
          fontWeight: '600',
        },
        '.font-h1-bold': {
          fontSize: '1.75rem',
          lineHeight: '2.125rem',
          letterSpacing: '0',
          fontWeight: '700',
        },
        '.font-h1-extrabold': {
          fontSize: '1.75rem',
          lineHeight: '2.125rem',
          letterSpacing: '0',
          fontWeight: '800',
        },
        '.font-h2-medium': {
          fontSize: '1.5rem',
          lineHeight: '1.75rem',
          letterSpacing: '0',
          fontWeight: '500',
        },
        '.font-h2-semibold': {
          fontSize: '1.5rem',
          lineHeight: '1.75rem',
          letterSpacing: '0',
          fontWeight: '600',
        },
        '.font-h2-bold': {
          fontSize: '1.5rem',
          lineHeight: '1.75rem',
          letterSpacing: '0',
          fontWeight: '700',
        },
        '.font-h2-extrabold': {
          fontSize: '1.5rem',
          lineHeight: '1.75rem',
          letterSpacing: '0.48em',
          fontWeight: '800',
        },      
        '.font-h3-medium': {
          fontSize: '1.25rem',
          lineHeight: '1.5rem',
          letterSpacing: '0',
          fontWeight: '500',
        },
        '.font-h3-semibold': {
          fontSize: '1.25rem',
          lineHeight: '1.5rem',
          letterSpacing: '0',
          fontWeight: '600',
        },
        '.font-h3-bold': {
          fontSize: '1.25rem',
          lineHeight: '1.5rem',
          letterSpacing: '0',
          fontWeight: '700',
        },
        '.font-h3-extrabold': {
          fontSize: '1.25rem',
          lineHeight: '1.5rem',
          letterSpacing: '0.40em',
          fontWeight: '800',
        },
        '.font-h4-medium': {
          fontSize: '1rem',
          lineHeight: '1.25rem',
          letterSpacing: '0',
          fontWeight: '500',
        },
        '.font-h4-semibold': {
          fontSize: '1rem',
          lineHeight: '1.25rem',
          letterSpacing: '0',
          fontWeight: '600',
        },
        '.font-h4-bold': {
          fontSize: '1rem',
          lineHeight: '1.25rem',
          letterSpacing: '0',
          fontWeight: '700',
        },
        '.font-h4-extrabold': {
          fontSize: '1rem',
          lineHeight: '1.25rem',
          letterSpacing: '0',
          fontWeight: '800',
        },
        '.font-paragraph-extralight': {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          fontWeight: '275',
        },
        '.font-paragraph-light': {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          fontWeight: '300',
        },
        '.font-paragraph-regular': {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          fontWeight: '400',
        },
        '.font-paragraph-semibold': {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          fontWeight: '600',
        },
        '.font-caption-light': {
          fontSize: '0.75rem',
          lineHeight: '0.875rem',
          fontWeight: '300',
        },
        /* Mobile Extra Small Regular */
        '.font-caption-regular': {
          fontSize: '0.75rem',
          lineHeight: '0.875rem',
          fontWeight: '400',
        },
        /* Mobile Extra Small Semi Bold */
        '.font-caption-semibold': {
          fontSize: '0.75rem',
          lineHeight: '0.875rem',
          fontWeight: '600',
        },
      })
    })
  ]
}
