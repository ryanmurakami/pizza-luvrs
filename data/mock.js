const pizzas = require('./pizzas')
const users = require('./users')
const toppings = require('./toppings')

const mockPizzas = [
  require('./mock_pizzas/best_pizza.json'),
  require('./mock_pizzas/filthy_rich.json'),
  require('./mock_pizzas/foul_wizard.json'),
  require('./mock_pizzas/lazer_pie.json'),
  require('./mock_pizzas/meat_haters.json'),
  require('./mock_pizzas/red_forever.json')
]

module.exports.hydrate = async () => {
  users.create('ryan', 'pass', () => {})
  users.create('jim', 'pass', () => {})
  users.create('kathy', 'pass', () => {})

  await pizzas.init()
  for (const pizza of mockPizzas) {
    pizzas.batchImport(pizza.name, pizza.toppings, pizza.img, pizza.username)
  }

  // prep toppings
  toppings.init()
}
