module.exports = {
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
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Cotamos Front' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
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

