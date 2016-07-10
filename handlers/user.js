'use strict';

const userStore = require('../data/users'),
  pizzaStore = require('../data/pizzas');

function postUser (req, reply) {
  userStore.createUser(req.payload.username, req.payload.password, (user) => {
    let sid = String(Math.random());
    req.server.app.cache.set(sid, user, 0, (err) => {
      if (err) return reply(Boom.baddImplementation(err));
      req.cookieAuth.set({ sid: sid, user: user });
      return reply.redirect('/login');
    });
  });
}

function getUser (req, reply) {
  let username = req.params.username || req.auth.credentials.user.username;
  pizzaStore.getPizzaForUser(username, (err, pizzas) => {
    let context = {
      username: username,
      auth: req.auth,
      pizzas: pizzas
    };
    return reply.view('user', context);
  });
}

function putUser (req, reply) {

}

module.exports = (req, reply) => {
  if (req.method === 'get') {
    getUser(req, reply);
  }
  if (req.method === 'post') {
    postUser(req, reply);
  }
  if (req.method === 'put') {
    putUser(req, reply);
  }
};
