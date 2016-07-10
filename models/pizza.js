'use strict';

module.exports = function (name, toppings, img, username) {
  this.id = name.replace(/ /g, '-');
  this.name = name;
  this.toppings = toppings;
  this.img = img;
  this.username = username;
  this.created = (new Date()).getTime();
}
