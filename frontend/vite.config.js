import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    port: 5178, // Replace with your desired port number
    strictPort: true, // Optional: true exits if the port is already in use instead of choosing the next available port
  }
})
