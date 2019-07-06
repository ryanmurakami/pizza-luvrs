const { find } = require('lodash')

module.exports = (toppingId, toppings) => {
  const topping = find(toppings, (topping) => {
    return topping.id === toppingId
  })
  return topping ? topping.name : toppingId
}
