const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [ 'vuetify' ],
  pwa: {
    manifestOptions: {
      name: 'SECRET TODO - SECRET, TODO, diary, make dream',
      short_name: 'SECRET-TODO',
      description: ' todo diary for make your dream',
      theme_color: '#aa1d2b',
      icons: [
        {
          src: './public/img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './public/img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: './public/img/icons/android-chrome-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: './public/img/icons/android-chrome-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }]
    },
    start_url: '.',
    orientation: 'portrait',
    display: 'fullscreen',
    background_color: '#aa1d2b'
  }
})
