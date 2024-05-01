/**
 * From:
 * https://github.com/evanw/esbuild/issues/394#issuecomment-1537247216
 */

import { replaceTscAliasPaths } from 'tsc-alias'
import { build } from 'esbuild'
import fg from 'fast-glob'

await build({
  entryPoints: await fg(['index.ts', 'logic/**/*', 'server-action/**/*', 'sdk/**/*']),
  outdir: 'dist',
  platform: 'node',
  tsconfig: 'tsconfig.json',
  format: 'esm',
})

// Post build paths resolve since ESBuild only natively
// support paths resolution for bundling scenario
await replaceTscAliasPaths({
  configFile: 'tsconfig.json',
  watch: false,
  outDir: 'dist',
  declarationDir: 'dist',
  resolveFullPaths: true,
})
