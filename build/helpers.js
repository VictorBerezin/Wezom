const path = require('path');

const paths = require('./paths');

/**
 * Provide sass resources for global usage
 */
exports.provideSassResources = () => [
  path.resolve(paths.src, 'assets/scss/utils/_variables.scss'),
  path.resolve(paths.src, 'assets/scss/utils/_mixins.scss'),
  path.resolve(paths.modules, 'bootstrap/scss/_functions.scss'),
  path.resolve(paths.modules, 'bootstrap/scss/_variables.scss'),
  path.resolve(paths.modules, 'bootstrap/scss/_mixins.scss'),
];
