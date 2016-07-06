'use strict';

const handlers = require('./handlers.js'),
  transfile = require('./lib/transfile.js');

module.exports.registerRoutes = (server) => {
  const files = transfile(__dirname + '/routes/'),
    routes = [];

  for (let key in files) {
    routes.push(files[key](handlers));
  }

  server.route(routes);
};
