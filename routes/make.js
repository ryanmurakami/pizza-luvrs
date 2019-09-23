module.exports = handlers => ({
  method: 'GET',
  path: '/make/{target}',
  handler: handlers.make
})
