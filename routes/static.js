module.exports = handlers => ({
  method: 'GET',
  path: '/assets/{param*}',
  handler: {
    directory: {
      path: 'assets'
    }
  },
  options: {
    auth: false
  }
})
