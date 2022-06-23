const express = require('express');

const imageUploadMiddleware = require('../middlewares/image-upload');
const kelolaProdukControllers = require('../controllers/kelola-produk.controller');

const router = express.Router();

router.get('/kelola-produk', kelolaProdukControllers.getKelolaProdukPage); // /admin/kelola-produk
router.get('/kelola-produk/tambah', kelolaProdukControllers.getTambahProduk); //admin/kelola-produk/tambah
router.post(
  '/kelola-produk/tambah',
  imageUploadMiddleware.single('image'),
  kelolaProdukControllers.tambahProduk
); //admin/kelola-produk/tambah

router.get('/kelola-produk/:id', kelolaProdukControllers.kelolaProduk); //admin/kelola-produk/:id
router.post(
  '/kelola-produk/:id/ubah',
  imageUploadMiddleware.single('image'),
  kelolaProdukControllers.ubahProduk
);
router.get('/kelola-produk/:id/hapus', kelolaProdukControllers.hapusProduk);

module.exports = router;
