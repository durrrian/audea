/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('@repo/tailwind-config')
const path = require('path')

const baseDir = path.dirname(require.resolve('@repo/web-ui'))
const subDirs = ['/components', '/lib', '/animation', '/hooks', '/icons', '/providers']

const web_ui_paths = subDirs.map((subDir) => path.join(baseDir, `${subDir}/**/*.{ts,tsx}`))

module.exports = {
  ...baseConfig,
  content: [...baseConfig.content, ...web_ui_paths, './mdx-components.tsx'],
}
