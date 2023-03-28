import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/"},
      { find: "@styles", replacement: "/src/styles/" },
      { find: "@pages", replacement: "/src/pages/" },
      { find: "@components", replacement: "/src/components/" },
      { find: "@stores", replacement: "/src/stores/" },
      { find: "@assets", replacement: "/src/assets/" },
      { find: "@hooks", replacement: "/src/hooks/" },
    ]
  }
})
