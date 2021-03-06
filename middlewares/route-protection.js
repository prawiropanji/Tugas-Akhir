function routeProtection(req, res, next) {
  if (!req.session.isLoggedIn && req.path === '/') {
    res.redirect('/login');
    return;
  }

  if (!req.session.isLoggedIn) {
    return res.status(401).render('shared/errors/401');
  }

  next();
}

module.exports = routeProtection;
