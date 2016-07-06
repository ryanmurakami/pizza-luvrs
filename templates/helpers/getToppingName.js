'use strict';

const _ = require('lodash');

module.exports = (toppingId, toppings) => {
  let topping = _.find(toppings, (topping) => {
    return topping.id === toppingId;
  });
  return topping ? topping.name : toppingId;
}
