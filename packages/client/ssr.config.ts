import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@(?=\/)/, replacement: path.resolve(__dirname, './src') },
    ],
  },
  build: {
    ssr: true,
    lib: {
      entry: path.resolve(__dirname, 'src/ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
  },
  ssr: {
    format: 'cjs',
  },
});
