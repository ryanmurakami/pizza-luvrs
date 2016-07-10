'use strict';

const toppingStore = require('../data/toppings');

module.exports = (req, reply) => {
  toppingStore.getAllToppings((err, toppings) => {
    return reply(toppings);
  });
};
