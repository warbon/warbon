export default {
  ssr: false,
  target: 'static',

  head: {
    title: 'Wilfredo Arbon — Senior Software Engineer',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Interactive terminal-style portfolio of Wilfredo Arbon, Senior Software Engineer and backend/full-stack developer.'
      },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  components: false,

  buildModules: [],

  modules: [],

  build: {}
}
