'use strict';

const pizzas = require('./pizzas.js'),
  users = require('./users.js'),
  transfile = require('../lib/transfile.js');

module.exports.insertData = () => {
  users.createUser('ryan', 'pass', () => {});
  users.createUser('jim', 'pass', () => {});
  users.createUser('kathy', 'pass', () => {});

  const files = transfile(__dirname + '/mock_pizzas/');
  for (let key in files) {
    let pizza = files[key];
    pizzas.createPizza(pizza.name, pizza.toppings, pizza.img, pizza.username, () => {});
  }
};
