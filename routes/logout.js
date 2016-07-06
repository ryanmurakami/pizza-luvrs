'use strict';

module.exports = (handlers) => {
  return {
    method: 'GET',
    path: '/logout',
    handler: handlers.logout
  };
};
