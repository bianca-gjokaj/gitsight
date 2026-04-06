import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    ".app/**/*.{js,ts,jsx,tsx,mdx}",
    ".components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        card: {
          DEFAULT: 'var(--color-card)',
          elevated: 'var(--color-card-elevated)',
        },
        sidebar: 'var(--color-sidebar)',
        heading: 'var(--color-heading)',
        body: 'var(--color-body)',
        muted: 'var(--color-muted)',
        faint: 'var(--color-faint)',
        border: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)',
        },
        primary : {
          DEFAULT: 'var(--color-primary)',
          muted: 'var(--color-primary-muted)',
          hover: 'var(--color-primary-hover)',
        },
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        pill: '9999px',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        elevated: 'var(--shadow-elevated)',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        spinner: 'spin 0.8s linear infinite',
      },
      keyFrames: {
        fadeIn: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
        slideUp: {
          '0%': {opacity: '0', transform: 'translateY(8px)'},
          '100%': {opacity: '1', transform: 'translateY(0)'},
        },
      },
      spacing: {
        grid: 'var(--spacing-grid)',
        card: 'var(--spacing-card)',
        section: 'var(--spacing-section)',
      },
    },
  },
  plugins: [],
};

export default config;

