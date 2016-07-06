'use strict';

module.exports = (handlers) => {
  return {
    method: 'GET',
    path: '/toppings',
    config: {
      handler: handlers.toppings,
      auth: { mode: 'try' }
    }
  };
};
