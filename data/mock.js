'use strict';

const pizzas = require('./pizzas'),
  Pizza = require('../models/pizza'),
  users = require('./users'),
  transfile = require('../lib/transfile');

module.exports.insertData = () => {
  users.createUser('ryan', 'pass', () => {});
  users.createUser('jim', 'pass', () => {});
  users.createUser('kathy', 'pass', () => {});

  const files = transfile(__dirname + '/mock_pizzas/');
  for (let key in files) {
    let pizza = files[key];
    pizzas.importPizza(pizza.name, pizza.toppings, pizza.img, pizza.username);
  }

  // prep toppings
  require('./toppings.js').initToppings();
};
