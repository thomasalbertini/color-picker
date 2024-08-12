import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, relative, extname } from 'path';
import { fileURLToPath } from 'node:url'
import dts from 'vite-plugin-dts'
import { globSync } from 'glob'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'uilibrary',
    }
  },
  rollupOptions: {
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    input: Object.fromEntries(
      globSync(['src/components/**/index.tsx', 'src/main.ts']).map((file) => {
        const entryName = relative(
          'src',
          file.slice(0, file.length - extname(file).length)
        )
        const entryUrl = fileURLToPath(new URL(file, import.meta.url))
        return [entryName, entryUrl]
      })
    ),
    output: {
      entryFileNames: '[name].js',
      assetFileNames: 'assets/[name][extname]',
      globals: {
        react: 'React',
        'react-dom': 'React-dom',
        'react/jsx-runtime': 'react/jsx-runtime',
      },
    },
  },
})
