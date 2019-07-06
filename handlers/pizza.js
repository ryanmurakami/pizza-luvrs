const Boom = require('@hapi/boom')

const pizzaStore = require('../data/pizzas')
const toppingsStore = require('../data/toppings')

async function getPizza (req, h) {
  const toppings = await toppingsStore.getAll()
  const pizza = await pizzaStore.get(req.params.pizzaId)
  const context = {
    auth: req.auth,
    pizza,
    toppings
  }

  return h.view('pizza', context)
}

async function postPizza (req) {
  const data = req.payload
  const name = data.name
  const toppings = data.toppings
  const username = data.username
  const img = data.img

  try {
    return pizzaStore.create(name, toppings, img, username)
  } catch (err) {
    console.error(`Error on putting s3 object: ${err}`)
    return Boom.badImplementation('Could not create pizza.')
  }
}

module.exports = (req, h) => {
  if (req.method === 'get') {
    return getPizza(req, h)
  } else if (req.method === 'post') {
    return postPizza(req)
  }
}
