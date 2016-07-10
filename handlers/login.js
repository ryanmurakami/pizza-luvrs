'use strict';

const Joi = require('joi'),
  Boom = require('boom'),
  users = require('../data/users'),
  querystring = require('querystring');

module.exports = (req, reply) => {
  const loginSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required()
  });

  if (req.auth.isAuthenticated) {
    return reply.redirect('/');
  }

  if (req.method === 'post') {
    Joi.validate(req.payload, loginSchema, (err, val) => {
      if (err) return reply(Boom.badRequest(err));

      users.authenticateUser(req.payload.username.toLowerCase(), req.payload.password, (err, res, user) => {
        if (err || !res) return reply(Boom.unauthorized());
        let sid = String(Math.random());
        req.server.app.cache.set(sid, user, 0, (err) => {
          if (err) return reply(Boom.badImplementation(err));
          req.cookieAuth.set({ sid: sid, user: user });
          return reply.redirect(getNext(req.headers.referer) || '/');
        });
      });
    });
  } else if (req.method === 'get') {
    return reply.view('login');
  }
};

function getNext (referer) {
  let next = '';
  if (referer) {
    let refererSplit = referer.split('?');
    if (refererSplit[1]) {
      next = querystring.parse(refererSplit[1]).next;
    }
  }
  return next;
}
