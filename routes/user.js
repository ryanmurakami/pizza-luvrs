'use strict';

module.exports = (handlers) => {
  return {
    method: ['GET', 'PUT'],
    path: '/user/{username?}',
    config: {
      handler: handlers.user,
      auth: { mode: 'try' },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  };
};
