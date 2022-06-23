const express = require('express');

const kelolaAkunControllers = require('../controllers/kelola-akun.controller');

const router = express.Router();

router.get('/kelola-akun', kelolaAkunControllers.getKelolaAkunPage); // /admin/kelola-akun
router.delete('/kelola-akun/:id', kelolaAkunControllers.deleteAkun);
router.get('/kelola-akun/daftar', kelolaAkunControllers.getDaftarAkun);
router.post('/kelola-akun/daftar', kelolaAkunControllers.daftarAkun);

module.exports = router;
