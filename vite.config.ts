import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // If you are using React

export default defineConfig({
  plugins: [react()], // If you are using React
  test: {
    environment: 'jsdom', // For DOM testing (if needed) - use 'node' if not testing DOM
    include: ['**/*.test.{js,jsx,ts,tsx}'], // Adjust if your test files are in a different location
  },
});