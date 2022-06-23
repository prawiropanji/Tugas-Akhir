const Product = require('../models/produk.model');

async function getKelolaProdukPage(req, res) {
  const products = await Product.getAllProduct();

  res.render('admin/produk/kelola-produk', { products });
}

function getTambahProduk(req, res) {
  res.render('admin/produk/tambah-produk');
}

async function tambahProduk(req, res) {
  const product = new Product(
    req.body.name,
    req.body.price,
    req.body.stock,
    req.body.category,
    req.file.filename
  );
  await product.saveProduct();
  res.redirect('/admin/kelola-produk');
}

async function kelolaProduk(req, res, next) {
  let product;
  try {
    product = await Product.getProductById(req.params.id);
  } catch (error) {
    return next(error);
  }

  res.render('admin/produk/detail-produk', { product });
}

async function ubahProduk(req, res) {
  let product;
  if (req.file) {
    product = new Product(
      req.body.name,
      req.body.price,
      req.body.stock,
      req.body.category,
      req.file.filename
    );
  } else {
    product = new Product(
      req.body.name,
      req.body.price,
      req.body.stock,
      req.body.category
    );
  }

  await product.updateProduct(req.params.id);
  res.redirect('/admin/kelola-produk');
}

async function hapusProduk(req, res) {
  await Product.deleteProduct(req.params.id);
  res.redirect('/admin/kelola-produk');
}

module.exports = {
  getKelolaProdukPage: getKelolaProdukPage,
  getTambahProduk: getTambahProduk,
  tambahProduk: tambahProduk,
  kelolaProduk: kelolaProduk,
  ubahProduk: ubahProduk,
  hapusProduk: hapusProduk,
};
