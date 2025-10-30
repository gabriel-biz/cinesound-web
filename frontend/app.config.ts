export default defineAppConfig({
  ui: {
    primary: 'worship',
    gray: 'stone',
    fonts: {
      sans: "'Inter', 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    button: {
      default: {
        size: 'lg',
        font: 'font-semibold',
        rounded: 'rounded-full'
      }
    },
    card: {
      default: {
        background: 'bg-white/70 dark:bg-slate-900/70 backdrop-blur',
        ring: 'ring-1 ring-worship-200/50 dark:ring-slate-700/40'
      }
    },
    input: {
      default: {
        color: 'text-slate-700 dark:text-slate-200',
        background: 'bg-white/70 dark:bg-slate-900/70 backdrop-blur'
      }
    },
    tokens: {
      colors: {
        worship: {
          50: '#fcfbf8',
          100: '#f8f4ee',
          200: '#efe4d4',
          300: '#e2d1b8',
          400: '#d1bfa0',
          500: '#bda583',
          600: '#a88c69',
          700: '#8b7052',
          800: '#6d5640',
          900: '#4b3a2a'
        },
        lilac: {
          50: '#f6f4fb',
          100: '#eae6f5',
          200: '#d6cfee',
          300: '#c0b4e3',
          400: '#a998d5',
          500: '#917ccc',
          600: '#6f5aa9',
          700: '#534583',
          800: '#3b3161',
          900: '#262140'
        }
      },
      font: {
        display: "'Playfair Display', 'DM Serif Display', serif",
        body: "'Inter', 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }
    }
  }
})
