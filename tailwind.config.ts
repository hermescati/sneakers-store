import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',
        '3xl': '1536px'
      },
      colors: {
        background: '#ffffff',
        foreground: '#212427',
        primary: {
          50: '#ffffff',
          100: '#f9fafb',
          200: '#f2f2f2',
          300: '#ebebeb',
          400: '#bebfc0',
          500: '#9f9f9f',
          600: '#6f6f6f',
          700: '#565656',
          800: '#33383c',
          900: '#212427'
        },
        secondary: '#fd844a',
        success: '#15f37d',
        danger: '#f32f15'
      },
      fontSize: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '0.875rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem'
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'spin-180': 'rotate 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
export default config
