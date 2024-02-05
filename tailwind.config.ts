import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        /**
         * Custom
         */
        landingPage: {
          blackPrimary: '#080A19',
          textSurfaceVariant: '#FDFBFF',
          audeaBlue: '#2C5EA8',
          lightBlue: '#ABC7FF',
          linierBlue: '#94A3B8',
          topCard: '#536976',
          linierPurple: '#455EB5',
          linierMidBlue: '#4A92C8',
          linierEndBlue: '#1F7FC7',
          linierGray: '#536976',
          linierEndGray: '#292E49',
          linierFooterTop: 'rgba(148, 163, 184, 1)',
          linierFooterBottom: 'rgba(148, 163, 184, 0.7)',
          linierTransparentGray: 'rgba(148, 163, 184, 0.4)',
          linierTransparentBlue: 'rgba(1, 85, 147, 0.7)',
          linierTitleTop: 'rgba(253, 251, 255, 1)',
          linierTitleBottom: 'rgba(253, 251, 255, 0.7)',
          linierLineSide: 'rgba(226, 232, 240, 0.005)',
          linierLineMid: 'rgba(226, 232, 240, 0.1)',
          linierBgPricingTop: 'rgba(36, 37, 56, 1)',
          linierBgPricingVia: 'rgba(27, 28, 46, 0.66)',
          linierBgPricingBottom: 'rgba(23, 23, 40, 0)',
          borderPricing: '#E2E8F0',
          borderPricingOn: '#6943D1',
          whitePricing: '#F7F8F8',
          linierStartBtn: '#2D00DE',
          linierMidBtn: '#95008A',
          linierEndBtn: '#EB0000',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
