'use strict';

module.exports = (handlers) => {
  return {
    method: 'GET',
    path: '/pizza/{pizzaId}',
    config: {
      handler: handlers.pizza,
      auth: { mode: 'try' },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  };
};
