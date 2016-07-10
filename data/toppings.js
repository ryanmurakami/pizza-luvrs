'use strict';

const Topping = require('../models/topping'),
  _ = require('lodash');

const toppings = {};

function initToppings (callback) {
  createTopping('Dough Crust', 'dough_crust.png', 'dough_crust.png');
  createTopping('Marinara Sauce', 'marinara_sauce.png', 'marinara_sauce.png');
  createTopping('Mozzarella Cheese', 'mozzarella_cheese.png', 'mozzarella_cheese.png');
  createTopping('Cheddar Cheese', 'cheddar.png', 'cheddar_cheese.png');
  createTopping('Mushrooms', 'mushroom.png', 'mushrooms.png');
  createTopping('Pepperoni', 'pepperoni.png', 'pepperonis.png');
  createTopping('Laser Beams', 'laser_beam.png', 'laser_beams.png');
  createTopping('Banana Peppers', 'banana_pepper.png', 'banana_peppers.png');
  createTopping('Ham', 'ham.png', 'hams.png');
  createTopping('Green Peppers', 'green_pepper.png', 'green_peppers.png');
  createTopping('Rainbows', 'rainbow.png', 'rainbows.png');
  createTopping('Money', 'money.png', 'moneys.png');
  if (callback) callback();
}

function getTopping (toppingId, callback) {
  callback(null, toppings[toppingId]);
}

function getAllToppings (callback) {
  callback(null, _.values(toppings));
}

function createTopping (name, preview_image, image) {
  let id = name.replace(/ /g, '_').toLowerCase(),
    topping = new Topping(id, name, preview_image, image);

  toppings[id] = topping;
}

module.exports.getTopping = getTopping;
module.exports.getAllToppings = getAllToppings;
module.exports.initToppings = initToppings;
