import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',
        '3xl': '1536px'
      },
      colors: {
        background: 'rgba(var(--background))',
        foreground: 'rgba(var(--foreground))',
        border: 'rgba(var(--border))',
        skeleton: 'rgba(var(--skeleton))',
        primary: {
          100: 'rgba(var(--primary-100))',
          200: 'rgba(var(--primary-200))',
          300: 'rgba(var(--primary-300))',
          400: 'rgba(var(--primary-400))',
          500: 'rgba(var(--primary-500))',
          600: 'rgba(var(--primary-600))',
          700: 'rgba(var(--primary-700))',
          800: 'rgba(var(--primary-800))',
          900: 'rgba(var(--primary-900))'
        },
        secondary: {
          DEFAULT: 'rgba(var(--secondary-500))',
          100: 'rgba(var(--secondary-100))',
          200: 'rgba(var(--secondary-200))',
          300: 'rgba(var(--secondary-300))',
          400: 'rgba(var(--secondary-400))',
          500: 'rgba(var(--secondary-500))',
          600: 'rgba(var(--secondary-600))',
          700: 'rgba(var(--secondary-700))',
          800: 'rgba(var(--secondary-800))',
          900: 'rgba(var(--secondary-900))'
        },
        danger: {
          DEFAULT: 'rgba(var(--danger-500))',
          50: 'rgba(var(--danger-50))',
          100: 'rgba(var(--danger-100))',
          200: 'rgba(var(--danger-200))',
          300: 'rgba(var(--danger-300))',
          400: 'rgba(var(--danger-400))',
          500: 'rgba(var(--danger-500))',
          600: 'rgba(var(--danger-600))',
          700: 'rgba(var(--danger-700))',
          800: 'rgba(var(--danger-800))',
          900: 'rgba(var(--danger-900))',
          950: 'rgba(var(--danger-950))'
        },
        warning: {
          DEFAULT: 'rgba(var(--warning-500))',
          50: 'rgba(var(--warning-50))',
          100: 'rgba(var(--warning-100))',
          200: 'rgba(var(--warning-200))',
          300: 'rgba(var(--warning-300))',
          400: 'rgba(var(--warning-400))',
          500: 'rgba(var(--warning-500))',
          600: 'rgba(var(--warning-600))',
          700: 'rgba(var(--warning-700))',
          800: 'rgba(var(--warning-800))',
          900: 'rgba(var(--warning-900))',
          950: 'rgba(var(--warning-950))'
        },
        success: {
          DEFAULT: 'rgba(var(--success-500))',
          50: 'rgba(var(--success-50))',
          100: 'rgba(var(--success-100))',
          200: 'rgba(var(--success-200))',
          300: 'rgba(var(--success-300))',
          400: 'rgba(var(--success-400))',
          500: 'rgba(var(--success-500))',
          600: 'rgba(var(--success-600))',
          700: 'rgba(var(--success-700))',
          800: 'rgba(var(--success-800))',
          900: 'rgba(var(--success-900))',
          950: 'rgba(var(--success-950))'
        }
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
        },
        bump: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' }
        }
      },
      animation: {
        'spin-180': 'rotate 4s ease-in-out infinite',
        bump: 'bump 0.6s ease-in-out infinite'
      }
    }
  },
  plugins: [typography]
}
export default config
