import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // extend custom font variables for global styles in tailwind
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        'roboto-mono': ['var(--font-roboto-mono)'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // custom colors
        purple: {
          951: 'rgba(79, 70, 229, 1)',
        },
        gray: {
          950: 'hsla(0, 0%, 100%, 0.7);',
          951: 'hsla(0, 0%, 100%, 0.4);',
          952: '#373b64',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
