'use strict';

module.exports = (handlers) => {
  return {
    method: 'POST',
    path: '/user',
    config: {
      handler: handlers.user,
      auth: false
    }
  };
};
