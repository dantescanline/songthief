export function ensureLoggedIn(req, res, next) {
  console.log('checking user is logged in')
  if (!req.user) {
    res.status(401)
    return res.send({ message: 'not logged in' })
  }
  next()
}

export function ensureAdmin(req, res, next) {
  if (!req.user || req.user.admin === false) {
    res.status(403)
    return res.send({ message: 'not admin user' })
  }
  next()
}
