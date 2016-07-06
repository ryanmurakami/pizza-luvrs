'use strict';

module.exports = (handlers) => {
  return {
    method: 'POST',
    path: '/pizza',
    config: {
      handler: handlers.pizza
    }
  };
};
