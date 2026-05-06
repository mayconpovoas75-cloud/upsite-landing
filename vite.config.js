import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { mapProjectPathToGeneratedStorage } from './generated-paths.mjs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const projectRoot = fileURLToPath(new URL('./', import.meta.url))
  const defaultDistDir = path.join(projectRoot, 'dist')
  const shouldUseGeneratedStorage = String(env.GENERATED_STORAGE_ROOT ?? '').trim()
  const distDir = shouldUseGeneratedStorage
    ? mapProjectPathToGeneratedStorage({
        env,
        originalPath: defaultDistDir,
        projectRoot,
      })
    : defaultDistDir

  return {
    build: {
      minify: 'esbuild',
      outDir: distDir,
      sourcemap: false,
      target: 'es2020',
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    plugins: [react()],
    resolve: {
      alias: {
        ws: fileURLToPath(new URL('./src/lib/ws-browser-shim.js', import.meta.url)),
      },
    },
  }
})
