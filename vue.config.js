module.exports = {
  // https://github.com/neutrinojs/webpack-chain/tree/v4#getting-started
  chainWebpack (config) {
    // Set up all the aliases we use in our app.
    config.resolve.alias.clear().merge(require('./aliases.config').webpack)

    config.resolve.extensions.add('.scss')
  },

  // https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
  css: {
    loaderOptions: {
      sass: { prependData: '@import "@styles/index.scss";' }
    }
  }
}
