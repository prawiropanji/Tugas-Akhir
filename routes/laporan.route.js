const express = require('express');

const laporanControllers = require('../controllers/laporan.controller');

const router = express.Router();

router.get('/laporan', laporanControllers.getLaporanJualPage);

router.get('/laporan/pilih', laporanControllers.getLaporanJualUserSelected);

module.exports = router;
