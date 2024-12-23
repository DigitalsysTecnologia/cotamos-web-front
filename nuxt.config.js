module.exports = {
  env: {
    baseUrl: process.env.NODE_ENV == 'development' ? 'http://localhost:8080/api/v1' : 'https://backend.cotamos.com/gateway/api/v1'
  },
  generate: {
    routes: [
      '/wl/seguro-vida',
      '/wl/seguro-viagem',
      '/wl/carro-facil'
    ]
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Cotamos.Com - Sua corretora On-Line',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'description',
        content: 'Cotamos - Corretora On-Line'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/img/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  plugins: [
    '~/plugins/vue-localstorage.js',
    '~/plugins/vue-mask.js',
    '~/plugins/vue-scrollto.js',
    '~/plugins/vue-validator.js',
  ],
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

    }
  }
}
