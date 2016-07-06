'use strict';

module.exports = (handlers) => {
  return {
    method: ['GET', 'POST'],
    path: '/login',
    config: {
      handler: handlers.login,
      auth: { mode: 'try' },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  };
};
