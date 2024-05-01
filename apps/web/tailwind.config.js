/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('@repo/tailwind-config')
const path = require('path')

const web_ui_dir = path.dirname(require.resolve('@repo/web-ui'))
const web_ui_subdir = ['/components', '/lib', '/animation', '/hooks', '/icons', '/providers']

const web_ui_paths = web_ui_subdir.map((subDir) => path.join(web_ui_dir, `${subDir}/**/*.{ts,tsx}`))

module.exports = {
  ...baseConfig,
  content: [...baseConfig.content, ...web_ui_paths, './mdx-components.tsx'],
}
