'use strict';

module.exports = (handlers) => {
  return {
    method: 'GET',
    path: '/',
    config: {
      handler: handlers.index,
      auth: { mode: 'try' },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  };
};
