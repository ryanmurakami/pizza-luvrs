'use strict';

const handlers = require('./handlers'),
  transfile = require('./lib/transfile');

module.exports.registerRoutes = (server) => {
  const files = transfile(__dirname + '/routes/'),
    routes = [];

  for (let key in files) {
    routes.push(files[key](handlers));
  }

  server.route(routes);
};
