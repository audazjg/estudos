import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Configuration for both development and production
const commonConfig = {
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 10000,
    host: '0.0.0.0'
  },
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 10000,
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
};

export default defineConfig({
  ...commonConfig,
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          utils: ['date-fns', 'canvas-confetti']
        }
      }
    },
    // Ensure proper handling of dynamic imports
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096
  }
});