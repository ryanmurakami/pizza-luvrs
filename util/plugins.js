const Cookie = require('@hapi/cookie')
const Handlebars = require('handlebars')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')

const mockData = require('../data/mock')

module.exports.register = async (server, logger) => {
  // register plugins
  await server.register([
    Inert,
    Vision,
    Cookie
  ])

  // setup template rendering
  server.views({
    engines: {
      hbs: Handlebars
    },
    layout: true,
    relativeTo: __dirname,
    path: '../templates',
    partialsPath: '../templates/partials',
    helpersPath: '../templates/helpers'
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

  // logging

  server.events.on('log', (_, event) => {
    if (event.error) {
      logger.error(`Server error: ${event?.error?.message || 'unknown'}`);
    } else {
      logger.info(`Server event: ${event}`)
    }
  })

  server.events.on('request', (_, event) => {
    if (event?.tags?.includes('unauthenticated')) return
    if (event?.tags?.includes('error')) {
      logger.error(`Request error: ${event?.data || event?.error?.message || 'unknown'}`);
    } else {
      logger.info(`Request event: ${event}`)
    }
  })

  // setup data
  mockData.hydrate()
}
