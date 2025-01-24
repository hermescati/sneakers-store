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
        background: 'rgba(var(--background))',
        foreground: 'rgba(var(--foreground))',
        primary: {
          100: 'rgba(var(--primary-100))',
          200: 'rgba(var(--primary-200))',
          300: 'rgba(var(--primary-300))',
          400: 'rgba(var(--primary-400))',
          500: 'rgba(var(--primary-500))',
          600: 'rgba(var(--primary-600))',
          700: 'rgba(var(--primary-700))',
          800: 'rgba(var(--primary-800))',
          900: 'rgba(var(--foreground))'
        },
        secondary: 'rgba(var(--secondary))',
        "success-text": 'rgba(var(--success-text))',
        "success-bg": 'rgba(var(--success-bg))',
        "warning-text": 'rgba(var(--warning-text))',
        "warning-bg": 'rgba(var(--warning-bg))',
        "danger-text": 'rgba(var(--danger-text))',
        "danger-bg": 'rgba(var(--danger-bg))',
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
