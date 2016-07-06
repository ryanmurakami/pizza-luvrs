'use strict';

module.exports = (handlers) => {
  return {
    method: 'GET',
    path: '/make/{target}',
    config: {
      handler: handlers.make
    }
  };
};
