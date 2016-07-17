'use strict';

const async = require('async'),
  userStore = require('../data/users'),
  pizzaStore = require('../data/pizzas'),
  toppingsStore = require('../data/toppings');

function getPizza (req, reply) {
  async.parallel([
    toppingsStore.getAllToppings,
    (callback) => {
      pizzaStore.getPizza(req.params.pizzaId, callback);
    }
  ], (err, data) => {
    let context = {
      toppings: data[0],
      pizza: data[1],
      auth: req.auth
    };
    return reply.view('pizza', context);
  });
}

function postPizza (req, reply) {
  let data = req.payload,
    name = data.name,
    toppings = data.toppings,
    username = data.username,
    img = data.img;
  pizzaStore.createPizza(name, toppings, img, username, (err, pizza) => {
    if (err) {
      console.log('error on putting s3 object: ' + err);
      return reply(Boom.badImplementation('Could not create pizza.'));
    }
    return reply();
  });
}

module.exports = (req, reply) => {
  if (req.method === 'get') {
    getPizza(req, reply);
  } else if (req.method === 'post') {
    postPizza(req, reply);
  }
};
