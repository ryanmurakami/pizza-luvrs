const Joi = require('joi')

module.exports = handlers => ({
  method: 'POST',
  path: '/login',
  handler: handlers.login,
  options: {
    auth: {
      mode: 'try'
    },
    validate: {
      payload: Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().min(3).max(30).required()
      })
    }
  }
})
