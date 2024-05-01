const baseConfig = require('@repo/tailwind-config')

module.exports = {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    './icons/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './animation/**/*.{ts,tsx}',
  ],
}
