const express = require('express');

const jualControllers = require('../controllers/kelola-jual.controller');

const router = express.Router();

router.get('/kelola-transaksi-penjualan', jualControllers.getKelolaJualPage);

router.get('/kelola-transaksi-penjualan/tambah', jualControllers.getTambahJual);

router.post('/cart/tambah', jualControllers.addProductToCart);

module.exports = router;
