const User = require('../models/user.model');

function getLoginPage(req, res) {
  res.render('shared/login');
}

async function login(req, res) {
  const userId = req.body.userid;
  const userPassword = req.body.password;

  const user = new User(userId, userPassword);

  const userExist = await user.findUser();
  if (!userExist) {
    res.redirect('/login');
    return;
  }

  if (userPassword !== userExist.password) {
    res.redirect('/login');
    return;
  }

  req.session.user = { id: userExist._id, userId: userExist.userId };
  req.session.isLoggedIn = true;
  req.session.isAdmin = userExist.isAdmin;
  req.session.save(function () {
    res.redirect('/home');
  });
}

module.exports = { getLoginPage: getLoginPage, login: login };
