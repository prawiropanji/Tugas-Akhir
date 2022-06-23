function redirectHomePage(req, res) {
  res.redirect('/home');
}

function getLandingPage(req, res) {
  res.render('shared/home');
}

module.exports = {
  getLandingPage: getLandingPage,
  redirectHomePage: redirectHomePage,
};
