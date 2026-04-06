/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'baristech-bg': 'var(--bg)',
        'baristech-ink': 'var(--ink)',
        'baristech-surface': 'var(--surface)',
        'baristech-raised': 'var(--raised)',
        'baristech-border': 'var(--border)',
        'baristech-border-hi': 'var(--border-hi)',
        'baristech-gold': 'var(--gold)',
        'baristech-gold-hi': 'var(--gold-hi)',
        'baristech-gold-lo': 'var(--gold-lo)',
        'baristech-text': 'var(--text)',
        'baristech-sub': 'var(--sub)',
        'baristech-dim': 'var(--dim)',
        'baristech-green': 'var(--green)',
        'baristech-red': 'var(--red)',
        'baristech-blue': 'var(--blue)',
        'baristech-amber': 'var(--amber)',
      },
    },
  },
  plugins: [],
}