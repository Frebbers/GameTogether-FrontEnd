import { defineConfig, loadEnv } from 'vite'
              import react from '@vitejs/plugin-react'
              import fs from 'fs'
              import path from 'path'
              import { fileURLToPath } from 'url'

              // Get __dirname equivalent in ES modules
              const __dirname = path.dirname(fileURLToPath(import.meta.url))

              export default defineConfig(({ mode }) => {
                // Load env file based on mode
                const env = loadEnv(mode, path.resolve(__dirname, '..'), '')

                // Use environment variables with fallbacks
                const apiUrl = env.API_URL || 'http://localhost:7191'
                const serverPort = parseInt(env.VITE_PORT || '443')
                const isDevelopment = env.ENVIRONMENT === 'Development'

                const serverConfig = {
                  port: serverPort,
                  proxy: {
                    '/api': {
                      target: apiUrl,
                      changeOrigin: true,
                      secure: false,
                    },
                  },
                }

                // Only add HTTPS configuration if not in development mode
                if (!isDevelopment) {
                  try {
                    serverConfig.https = {
                      key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
                      cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.pem')),
                    }
                  } catch (error) {
                    console.warn('SSL certificates not found, running without HTTPS')
                  }
                }

                return {
                  plugins: [react()],
                  define: { // a bit scuffed: literally just replaces occurences of import.meta.env.VITE_API_BASE in the code with the value given
                    'import.meta.env.VITE_API_BASE': JSON.stringify(env.VITE_API_BASE),
                  },
                  server: serverConfig,
                }
              })