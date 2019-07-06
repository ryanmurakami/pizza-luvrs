const handlers = require('../handlers')

const routes = [
  require('./login'),
  require('./login.post'),
  require('./logout'),
  require('./main'),
  require('./make'),
  require('./pizza'),
  require('./pizza.post'),
  require('./register'),
  require('./static'),
  require('./toppings'),
  require('./user'),
  require('./user.post')
]

module.exports.register = server => {
  const handledRoutes = []

  for (const route of routes) {
    handledRoutes.push(route(handlers))
  }

  server.route(handledRoutes)
}
