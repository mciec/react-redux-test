import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'C:\\src\\home-control\\home-control\\wwwroot'
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5157/",
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
