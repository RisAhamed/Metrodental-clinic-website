import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
  root: 'portal',
  plugins: [react()],
  base: '/portal/',
  build: {
    outDir: '../public/portal',
    emptyOutDir: true,
  },
  define: {
    'import.meta.env.VITE_CLERK_PUBLISHABLE_KEY': JSON.stringify(
      env.VITE_CLERK_PUBLISHABLE_KEY || env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
    ),
  },
  server: {
    port: 5173,
    // In development, /api calls go to dev-server.js (started automatically by `npm run dev`)
    proxy: { '/api': { target: 'http://localhost:3001', changeOrigin: true } },
  },
  }
})
