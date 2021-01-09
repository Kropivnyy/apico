export default {
  mode: 'spa',
  target: 'static',
  generate: {
    routes: ['/favorites', '/login', '/register'],
    fallback: true,
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#349A89' },
  css: ['~/assets/variables.css', '~/assets/base.css'],
  plugins: [],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],
  modules: ['@nuxtjs/axios'],
  axios: {},
  router: {
    prefetchLinks: false,
  },
  build: {},
}
