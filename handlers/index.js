'use strict';

const pizzaStore = require('../data/pizzas.js');

module.exports = (req, reply) => {
  pizzaStore.getRecentPizzas((err, pizzas) => {
    const context = {
      auth: req.auth,
      pizzas: pizzas
    };

    return reply.view('index', context);
  });
};
