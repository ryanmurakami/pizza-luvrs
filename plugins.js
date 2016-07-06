'use strict';

module.exports.registerPlugins = (server, callback) => {
  server.register([
      require('inert'),
      require('vision'),
      require('hapi-auth-cookie')
  ], (err) => {
    if (err) callback(err);

    server.views({
      engines: {
        hbs: require('handlebars')
      },
      layout: true,
      relativeTo: __dirname,
      path: './templates',
      partialsPath: './templates/partials',
      helpersPath: './templates/helpers'
    });

    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    const redirectPath = '/login';

    server.auth.strategy('session', 'cookie', true, {
      password: 'password-should-be-32-characters',
      cookie: 'pzz4lyfe',
      redirectTo: redirectPath,
      appendNext: true,
      isSecure: false,
      validateFunc: (request, session, callback) => {
        cache.get(session.sid, (err, cached) => {
          if (err) {
            return callback(err, false);
          }

          if (!cached) {
            return callback(null, false);
          }

          return callback(null, true, cached.account);
        });
      }
    });

    // mock data
    require('./data/mock.js').insertData();

    // prep toppings
    require('./data/toppings.js').initToppings();

    callback();
  });
};
