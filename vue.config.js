const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [ 'vuetify' ],
  pwa: {
    manifestOptions: {
      name: 'SECRET TODO - SECRET, TODO, diary, make dream',
      short_name: 'SECRET-TODO',
      theme_color: '#aa1d2b',
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: './img/icons/android-chrome-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }]
    },
    description: 'todo diary for make your dream',
    start_url: "/",
    scope: "/",
    orientation: 'portrait',
    display: 'fullscreen',
    background_color: '#aa1d2b',
    lang: "ko",
    dir: "auto"
  }
})
