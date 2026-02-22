import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/nahati-anytime-laundry/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'android-chrome-192x192.png', 'android-chrome-512x512.png'],
      manifest: {
        name: 'Nahati Anytime Laundry',
        short_name: 'Nahati Laundry',
        description: '24/7 professional laundry pickup and delivery in Kampala. Fast, reliable, and affordable garment care.',
        theme_color: '#14b8a6',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/nahati-anytime-laundry/',
        start_url: '/nahati-anytime-laundry/',
        icons: [
          { src: '/nahati-anytime-laundry/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/nahati-anytime-laundry/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/nahati-anytime-laundry/apple-touch-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any' }
        ]
      },
      workbox: {
        navigateFallback: '/nahati-anytime-laundry/index.html',
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: { cacheName: 'images-cache', expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 } }
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/nahati-anytime-laundry/'),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'app-cache' }
          }
        ]
      }
    })
  ],
})
