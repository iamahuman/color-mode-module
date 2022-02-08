import colorModeModule from '..'

export default {
  target: 'static',
  components: true,
  css: [
    '@/assets/main.css'
  ],
  buildModules: [
    '@nuxtjs/svg',
    [colorModeModule, {
      themeColors: {
        dark: '#091a28',
        light: '#f3f5f4',
        sepia: '#f1e7d0'
      }
    }]
  ]
}
