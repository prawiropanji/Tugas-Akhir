const express = require('express');

const laporanControllers = require('../controllers/laporan.controller');

const router = express.Router();

router.get('/laporan', laporanControllers.getLaporanJualPage);

router.get('/laporan/pilih', laporanControllers.getLaporanJualUserSelected);

router.get('/laporan/laba-rugi', laporanControllers.getLaporanLabaRugi);

router.get(
  '/laporan/laba-rugi/pilih',
  laporanControllers.getLaporanLabaRugiUserSelected
);

module.exports = router;
