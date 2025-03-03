import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default {
  server: {
    proxy: {
      '/tasks': 'http://localhost:8081',  // Redirect API requests to the backend
    }
  }
};
