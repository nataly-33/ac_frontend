module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        agua: {
          50: '#eaf6ff',
          100: '#b3e3ff',
          400: '#38bdf8',
          600: '#0284c7',
          900: '#0c2a3e',
        },
        riesgo: {
          bajo: '#22c55e',
          medio: '#f59e0b',
          alto: '#f97316',
          critico: '#ef4444',
        }
      },
      fontFamily: {
        display: ['"Exo 2"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    }
  },
  plugins: []
}
