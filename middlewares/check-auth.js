function checkAuth(req, res, next) {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.isAdmin = req.session.isAdmin;
  next();
}

module.exports = checkAuth;
