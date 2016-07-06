module.exports = (req, reply) => {
  req.cookieAuth.clear();
  return reply.redirect('/');
};
