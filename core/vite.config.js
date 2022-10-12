import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const QUALIFIER = 'pegboard'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      // eslint-disable-next-line no-undef
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: QUALIFIER,
      formats: ['es', 'umd'],
      fileName: (format) => `${QUALIFIER}.${format}.js`,
    },
    rollupOptions: {
      // external: ['react', 'react-dom', 'styled-components'],
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          // 'styled-components': 'styled',
        },
      },
    },
  },
})
