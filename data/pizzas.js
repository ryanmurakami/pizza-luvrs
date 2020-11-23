const { filter, orderBy, values } = require('lodash')

const Pizza = require('../models/pizza')
const ImageStore = require('../lib/imageStore')
// const PizzaStore = require('./pizzaStore')

const pizzas = {}

async function init () {
  // await PizzaStore.initialize()
}

async function create (name, toppings, img, username) {
  const imgUrl = await ImageStore.save(name.replace(/ /g, '-'), img)
  const pizza = new Pizza(name, toppings, imgUrl, username)
  pizzas[pizza.id] = pizza
  return pizza
  // return PizzaStore.create(prepPizza(pizza))
}

// for mocks that don't need pizza images saved
function batchImport (name, toppings, imgUrl, username) {
  const pizza = new Pizza(name, toppings, imgUrl, username)
  pizzas[pizza.id] = pizza
  // PizzaStore.create(prepPizza(pizza))
}

async function getForUser (username) {
  const userPizzas = filter(pizzas, pizza =>
    pizza.username === username
  )
  return userPizzas
  // return PizzaStore.findAll({
  //   where: {
  //     username
  //   },
  //   raw: true
  // }).then(debriefPizzas)
}

async function getRecent () {
  const recentPizzas = orderBy(pizzas, ['created'], ['desc'])
  return values(recentPizzas).splice(0, 5)
  // return PizzaStore.findAll({
  //   order: [['created', 'DESC']],
  //   limit: 4,
  //   raw: true
  // }).then(debriefPizzas)
}

async function get (pizzaId) {
  if (!pizzas[pizzaId]) throw new Error('Pizza not found')
  return pizzas[pizzaId]
  // return PizzaStore.findOne({
  //   where: {
  //     id: pizzaId
  //   },
  //   raw: true
  // }).then(debriefPizza)
}

function prepPizza (pizza) {
  return {
    ...pizza,
    toppings: JSON.stringify(pizza.toppings)
  }
}

function debriefPizza (pizza) {
  return {
    ...pizza,
    toppings: JSON.parse(pizza.toppings)
  }
}

function debriefPizzas (pizzas) {
  return pizzas.map(debriefPizza)
}

module.exports = {
  batchImport,
  create,
  get,
  getForUser,
  getRecent,
  init
}
