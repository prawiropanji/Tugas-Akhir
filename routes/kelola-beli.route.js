const express = require('express');

const kelolaBeliControllers = require('../controllers/kelola-beli.controller');

const router = express.Router();

router.get(
  '/kelola-transaksi-pembelian',
  kelolaBeliControllers.getKelolaBeliPage
); // /admin/kelola-transaksi-pembelian

router.get(
  '/kelola-transaksi-pembelian/tambah',
  kelolaBeliControllers.getTambahBeli
);

router.post(
  '/kelola-transaksi-pembelian/tambah',
  kelolaBeliControllers.tambahBeli
);

router.get(
  '/kelola-transaksi-pembelian/:id',
  kelolaBeliControllers.getDetailBeli
);

router.patch(
  '/kelola-transaksi-pembelian/:id',
  kelolaBeliControllers.updateBeli
);

router.delete(
  '/kelola-transaksi-pembelian/:id',
  kelolaBeliControllers.deletePurchase
);
module.exports = router;
