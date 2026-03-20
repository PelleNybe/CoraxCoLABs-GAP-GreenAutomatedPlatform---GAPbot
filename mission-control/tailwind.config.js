/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core background palette - deeper, richer darks
        background: '#0a0a0c',
        surface: '#121216',
        surfaceHighlight: '#1a1a1f',

        // Primary Accent - a more vibrant, neon-leaning emerald
        primary: {
          400: '#10b981', // main
          500: '#059669', // slightly darker
          900: '#064e3b', // deepest
          glow: 'rgba(16, 185, 129, 0.4)'
        },

        // Secondary Accent - Cyan/Teal for contrast against Emerald
        secondary: {
          400: '#06b6d4',
          500: '#0891b2',
        },

        // Typography
        textMain: '#e4e4e7', // zinc-200
        textMuted: '#a1a1aa', // zinc-400
        textFaint: '#52525b', // zinc-600

        // Status Colors - adjusted for better contrast on dark bg
        status: {
          info: '#3b82f6', // blue-500
          success: '#10b981', // emerald-500
          warn: '#f59e0b', // amber-500
          critical: '#ef4444', // red-500
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 15px var(--tw-shadow-color)',
        'glow-critical': '0 0 20px rgba(239, 68, 68, 0.3)',
      }
    },
  },
  plugins: [],
}
