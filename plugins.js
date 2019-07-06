const Cookie = require('@hapi/cookie')
const Good = require('@hapi/good')
const Handlebars = require('handlebars')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')

const GoodFile = require('./lib/good-file')
const mockData = require('./data/mock')

const goodOptions = {
  reporters: {
    file: [{
      module: '@hapi/good-squeeze',
      name: 'Squeeze',
      args: [{ response: '*', request: '*', error: '*' }]
    }, {
      module: '@hapi/good-squeeze',
      name: 'SafeJson'
    }, {
      module: GoodFile,
      args: ['./log/hapi_log']
    }]
  }
}

module.exports.register = async server => {
  // register plugins
  await server.register([
    Inert,
    Vision,
    Cookie,
    {
      plugin: Good,
      options: goodOptions
    }
  ])

  // setup template rendering
  server.views({
    engines: {
      hbs: Handlebars
    },
    layout: true,
    relativeTo: __dirname,
    path: './templates',
    partialsPath: './templates/partials',
    helpersPath: './templates/helpers'
  })

  // setup cache
  const cache = server.cache({
    segment: 'sessions',
    expiresIn: 24 * 60 * 60 * 1000
  })
  server.app.cache = cache

  // setup authentication/session handling
  const redirectPath = '/login'

  server.auth.strategy('session', 'cookie', {
    cookie: {
      isSecure: false,
      name: 'pzz4lyfe',
      password: 'password-should-be-32-characters'
    },
    redirectTo: redirectPath,
    appendNext: true,
    validateFunc: async (request, session) => {
      const cached = await cache.get(session.sid)
      if (!cached) {
        return { valid: false }
      }
      return {
        credentials: cached.account,
        valid: true
      }
    }
  })

  server.auth.default('session')

  // setup data
  mockData.hydrate()
}
