const toppingStore = require('../data/toppings')

module.exports = () => {
  const toppings = toppingStore.getAll()
  return toppings
}
