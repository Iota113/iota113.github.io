import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // 1. Set the base path
  // Use '/' if deploying to [username].github.io
  // Use '/repo-name/' if deploying to a sub-repo test site
  base: '/v2/', 

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      // Standardizes imports so you can use '@/' instead of relative paths like '../../'
      '@': path.resolve(__dirname, './src'), 
    },
  },

  build: {
    // Ensures the final files are placed in a 'dist' folder for GitHub Pages
    outDir: 'dist',
  },

});