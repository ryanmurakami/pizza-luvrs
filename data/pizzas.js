'use strict';

const _ = require('lodash'),
  Pizza = require('../models/pizza.js'),
  pizzas = {};

function createPizza (name, toppings, img, username, callback) {
  let id = name.replace(/ /g, '-'),
    pizza = new Pizza(id, name, toppings, img, username);
  pizzas[id] = pizza;
  callback(null, pizza);
}

function getPizzaForUser (username, callback) {
  let userPizzas = _.filter(pizzas, (pizza) => {
    return pizza.username === username;
  });
  callback(null, userPizzas);
}

function getPizzas (callback) {
  callback(null, pizzas);
}

function getRecentPizzas (callback) {
  let recentPizzas = _.orderBy(pizzas, ['created'], ['desc']);
  callback(null, _.values(recentPizzas).splice(0, 5));
}

function getPizza (pizzaId, callback) {
  if (!pizzas[pizzaId]) callback('Pizza not found');
  else callback(null, pizzas[pizzaId]);
}

module.exports.createPizza = createPizza;
module.exports.getPizzaForUser = getPizzaForUser;
module.exports.getPizzas = getPizzas;
module.exports.getPizza = getPizza;
module.exports.getRecentPizzas = getRecentPizzas;
