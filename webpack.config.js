/**
 * This file for WebStorm only, it does not affect Nuxt.
 * https://github.com/nuxt/nuxt.js/issues/2936#issuecomment-369987598
 * @type {{resolve: {alias: {'@': *, '~': *}}}}
 */
module.exports = {
  resolve: {
    alias: {
      // '@': path.resolve(__dirname),
      '~': path.resolve(__dirname),
    },
  },
};
