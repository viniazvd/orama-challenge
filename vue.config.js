module.exports = {
  // https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        // @import "./node_modules/foundation-sites/scss/foundation.scss";
        @import "./src/styles/index.scss";
        `
      }
    }
  }
}
