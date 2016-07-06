'use strict';

module.exports = (handlers) => {
  return {
    method: 'GET',
    path: '/assets/{param*}',
    config: {
      auth: false,
      handler: {
        directory: {
          path: 'assets'
        }
      }
    }
  };
};
