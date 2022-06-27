const { render } = require('ejs');
const User = require('../models/user.model');

function getLoginPage(req, res) {
  res.render('shared/login', { errorMessage: null });
}

async function login(req, res) {
  const userId = req.body.userid;
  const userPassword = req.body.password;

  const user = new User(userId, userPassword);

  const userExist = await user.findUser();
  if (!userExist) {
    res.render('shared/login', { errorMessage: 'userID atau password salah' });
    return;
  }

  if (userPassword !== userExist.password) {
    res.render('shared/login', { errorMessage: 'userID atau password salah' });
    return;
  }

  req.session.user = { id: userExist._id, userId: userExist.userId };
  req.session.isLoggedIn = true;
  req.session.isAdmin = userExist.isAdmin;
  req.session.save(function () {
    if (userExist.isAdmin) {
      res.redirect('/home');
    } else {
      res.redirect('/admin/kelola-transaksi-penjualan');
    }
  });
}

function logout(req, res) {
  req.session.user = null;
  req.session.isAdmin = null;
  req.session.isLoggedIn = null;

  req.session.save(function () {
    res.redirect('/login');
  });
}

module.exports = { getLoginPage: getLoginPage, login: login, logout: logout };
