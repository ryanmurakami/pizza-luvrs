'use strict';

module.exports = function (id, name, toppings, img, username) {
  this.id = id;
  this.name = name;
  this.toppings = toppings;
  this.img = img;
  this.username = username;
  this.created = (new Date()).getTime();
}
