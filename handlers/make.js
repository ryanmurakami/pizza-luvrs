const toppingStore = require('../data/toppings')

async function makePizza (req, h) {
  const toppings = await toppingStore.getAll()
  const context = {
    toppings: toppings,
    auth: req.auth
  }
  return h.view('pizza.make.hbs', context)
}

module.exports = (req, h) => {
  switch (req.params.target) {
    case 'pizza':
      return makePizza(req, h)
  }
}
