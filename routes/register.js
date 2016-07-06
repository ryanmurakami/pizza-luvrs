'use strict';

module.exports = (handlers) => {
  return {
    method: 'GET',
    path: '/register',
    config: {
      handler: handlers.register,
      auth: false
    }
  };
};
