const express = require('express');

const jualControllers = require('../controllers/kelola-jual.controller');

const router = express.Router();

router.get('/kelola-transaksi-penjualan', jualControllers.getKelolaJualPage);

router.get('/kelola-transaksi-penjualan/tambah', jualControllers.getTambahJual);
router.post(
  '/kelola-transaksi-penjualan/tambah',
  jualControllers.setTambahJual
);

router.delete(
  '/kelola-transkasi-penjualan/:id/hapus',
  jualControllers.deleteJual
);

router.patch(
  '/kelola-transkasi-penjualan/:id/patch',
  jualControllers.rejectVoid
);

router.get('/kelola-transaksi-penjualan/:id', jualControllers.getDetailJual);
router.post(
  '/kelola-transaksi-penjualan/:id/void',
  jualControllers.setVoidRequest
);

router.get('/permintaan-void', jualControllers.getListVoid);

router.get('/cart', jualControllers.getCart);

router.post('/cart/tambah', jualControllers.addProductToCart);
router.patch('/cart/kurang', jualControllers.ridCartProduct);

module.exports = router;
