import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures the app works when served from a subdirectory
  build: {
    outDir: 'dist', // Outputs built files to the `dist` folder
  },
});