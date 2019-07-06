module.exports = handlers => ({
  method: 'GET',
  path: '/register',
  handler: handlers.register,
  options: {
    auth: false
  }
})
