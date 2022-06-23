const User = require('../models/user.model');

async function getKelolaAkunPage(req, res) {
  const accountDetails = await User.getAllAccountDetail();

  res.render('admin/akun/kelola-akun', { accountDetails });
}

async function deleteAkun(req, res, next) {
  try {
    await User.deleteAccount(req.params.id);
  } catch (error) {
    next(error);
    return;
  }

  res.json({ message: 'delete successful' });
}

function getDaftarAkun(req, res) {
  let flashData = req.session.flashedData;
  if (!req.session.flashedData) {
    flashData = {
      userId: '',
      password: '',
      name: '',
      phone: '',
    };
  }
  req.session.flashedData = null;
  res.render('admin/akun/buat-akun', { flashData });
}

async function daftarAkun(req, res) {
  const isAdmin = req.body.role === 'admin' ? true : false;

  const user = new User(
    req.body.userid,
    req.body.password,
    req.body.name,
    req.body.phone,
    isAdmin
  );

  //cek apakah userid sudah terdaftarkan

  if (await user.findUser()) {
    req.session.flashedData = {
      errorMessage: 'user ID sudah terdaftar',
      ...user,
    };
    req.session.save(function () {
      res.redirect('/admin/kelola-akun/daftar');
    });
    return;
  }

  //cek apakah password sesuai dengan konfrimasi password
  if (req.body['confirm-password'] !== req.body.password) {
    req.session.flashedData = {
      errorMessage: 'password dan konfrimasi password tidak sesuai',
      ...user,
    };
    req.session.save(function () {
      res.redirect('/admin/kelola-akun/daftar');
    });
    return;
  }

  //daftar akun baru
  await user.signup();
  res.redirect('/admin/kelola-akun');
}

module.exports = {
  getKelolaAkunPage: getKelolaAkunPage,
  deleteAkun: deleteAkun,
  getDaftarAkun: getDaftarAkun,
  daftarAkun: daftarAkun,
};
