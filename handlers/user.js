const { get } = require('lodash')

const userStore = require('../data/users')
const pizzaStore = require('../data/pizzas')

async function postUser (req, h) {
  const user = await userStore.create(req.payload.username.toLowerCase(), req.payload.password)
  const sid = String(Math.random())
  await req.server.app.cache.set(sid, user, 0)
  req.cookieAuth.set({ sid: sid, user: user })
  return h.redirect('/login')
}

async function getUser (req, h) {
  const username = get(req, 'params.username') || get(req, 'auth.credentials.user.username')
  const pizzas = await pizzaStore.getForUser(username)
  const context = {
    username: username,
    auth: req.auth,
    pizzas: pizzas
  }

  return h.view('user', context)
}

module.exports = (req, h) => {
  if (req.method === 'get') {
    return getUser(req, h)
  }
  if (req.method === 'post') {
    return postUser(req, h)
  }
}
