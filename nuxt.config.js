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
  css: ['~/assets/styles/styles.scss'],
  plugins: ['~/plugins/portal-plugin', '~/plugins/click-outside-directive'],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],
  modules: [
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCOBV61EKZhLjzWIiWanUP-nCCrxvfCxTU',
          authDomain: 'apico-vue.firebaseapp.com',
          projectId: 'apico-vue',
          storageBucket: 'apico-vue.appspot.com',
          messagingSenderId: '839853563421',
          appId: '1:839853563421:web:4ae5bff9f69f2fc92230f4',
          measurementId: 'G-4YDS2P6VQN',
          databaseURL: 'https://apico-vue-default-rtdb.firebaseio.com/',
        },
        services: {
          auth: true,
          database: true,
          storage: true,
        },
      },
    ],
  ],
  axios: {},
  router: {
    prefetchLinks: false,
  },
  build: {},
}
