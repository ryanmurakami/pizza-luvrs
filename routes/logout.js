module.exports = handlers => ({
  method: 'GET',
  path: '/logout',
  handler: handlers.logout
})
