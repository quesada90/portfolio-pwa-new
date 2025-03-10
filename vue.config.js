const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // Configure PWA
  pwa: {
    name: 'Javier Quesada Portfolio',
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    
    // Workbox options
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      
      // Cache configuration
      runtimeCaching: [
        // Cache images
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            },
          },
        },
        // Cache Google Fonts
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets',
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
          },
        },
        // Cache Unsplash API
        {
          urlPattern: /^https:\/\/api\.unsplash\.com/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'unsplash-api',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 24 * 60 * 60, // 24 hours
            },
            networkTimeoutSeconds: 10,
          },
        },
        // Cache Unsplash images
        {
          urlPattern: /^https:\/\/images\.unsplash\.com/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'unsplash-images',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
            },
          },
        },
        // Cache JS and CSS
        {
          urlPattern: /\.(?:js|css)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-resources',
          },
        },
      ],
    },

    // Configure manifest
    manifestOptions: {
      icons: [
        {
          'src': './img/icons/android-chrome-192x192.png',
          'sizes': '192x192',
          'type': 'image/png'
        },
        {
          'src': './img/icons/android-chrome-512x512.png',
          'sizes': '512x512',
          'type': 'image/png'
        },
        {
          'src': './img/icons/apple-touch-icon-60x60.png',
          'sizes': '60x60',
          'type': 'image/png'
        },
        {
          'src': './img/icons/apple-touch-icon-76x76.png',
          'sizes': '76x76',
          'type': 'image/png'
        },
        {
          'src': './img/icons/apple-touch-icon-120x120.png',
          'sizes': '120x120',
          'type': 'image/png'
        },
        {
          'src': './img/icons/apple-touch-icon-152x152.png',
          'sizes': '152x152',
          'type': 'image/png'
        },
        {
          'src': './img/icons/apple-touch-icon-180x180.png',
          'sizes': '180x180',
          'type': 'image/png'
        },
        {
          'src': './img/icons/msapplication-icon-144x144.png',
          'sizes': '144x144',
          'type': 'image/png'
        },
        {
          'src': './img/icons/mstile-150x150.png',
          'sizes': '150x150',
          'type': 'image/png'
        }
      ]
    }
  }
})
