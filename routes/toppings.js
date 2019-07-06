module.exports = handlers => ({
  method: 'GET',
  path: '/toppings',
  handler: handlers.toppings,
  options: {
    auth: {
      mode: 'try'
    }
  }
})
