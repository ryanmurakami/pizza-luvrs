module.exports = handlers => ({
  method: 'POST',
  path: '/user',
  handler: handlers.user,
  options: {
    auth: false
  }
})
