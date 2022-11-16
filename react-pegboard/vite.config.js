import react from '@vitejs/plugin-react'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// __dirname is not available in ESM, so we need to use this workaround
// adapted from https://antfu.me/posts/isomorphic-dirname
const DIRNAME = dirname(fileURLToPath(import.meta.url))

const QUALIFIER = 'pegboard'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(DIRNAME, './src') }],
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(DIRNAME, 'src/index.ts'),
      name: QUALIFIER,
      formats: ['es', 'umd'],
      fileName: (format) => `${QUALIFIER}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
