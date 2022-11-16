import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const QUALIFIER = 'pegboard'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  resolve: {
    // eslint-disable-next-line no-undef
    alias: { '@': path.join(__dirname, './src') },
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      // eslint-disable-next-line no-undef
      entry: path.join(__dirname, './src/index.ts'),
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
