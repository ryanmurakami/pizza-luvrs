module.exports = (req, h) => {
  req.cookieAuth.clear()
  return h.redirect('/')
}
