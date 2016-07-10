'use strict';

const toppingStore = require('../data/toppings');

function makePizza (req, reply) {
  toppingStore.getAllToppings((err, toppings) => {
    let context = {
      toppings: toppings,
      auth: req.auth
    };
    return reply.view('pizza.make.hbs', context);
  });
}

module.exports = (req, reply) => {
  switch (req.params.target) {
    case 'pizza':
      makePizza(req, reply);
      break;
  }
};
