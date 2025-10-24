import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src/'),
      '@app': path.join(__dirname, 'src/app'),
      '@modules': path.join(__dirname, 'src/modules'),
      '@pages': path.join(__dirname, 'src/pages'),
      '@shared': path.join(__dirname, 'src/shared'),
    },
  },
})
