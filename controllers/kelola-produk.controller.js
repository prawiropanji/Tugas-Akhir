const Product = require('../models/produk.model');

async function getKelolaProdukPage(req, res) {
  const products = await Product.getAllProduct();

  res.render('admin/produk/kelola-produk', { products });
}

function getTambahProduk(req, res) {
  res.render('admin/produk/tambah-produk', {
    product: null,
    errorMessage: null,
  });
}

async function tambahProduk(req, res) {
  // validation
  const enteredValue = {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
  };
  if (Object.is(NaN, +req.body.price)) {
    res.render('admin/produk/tambah-produk', {
      product: enteredValue,
      errorMessage: 'Input harga harus berupa angka',
    });
    return;
  }

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

  res.render('admin/produk/detail-produk', { product, errorMessage: null });
}

async function ubahProduk(req, res) {
  const originProduct = await Product.getProductById(req.params.id);

  // validation
  if (Object.is(NaN, +req.body.price)) {
    res.render('admin/produk/detail-produk', {
      product: originProduct,
      errorMessage: 'Input harga harus berupa angka',
    });
    return;
  }

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
  // res.redirect('/admin/kelola-produk');
  res.status(200).json({ message: 'delete success' });
}

module.exports = {
  getKelolaProdukPage: getKelolaProdukPage,
  getTambahProduk: getTambahProduk,
  tambahProduk: tambahProduk,
  kelolaProduk: kelolaProduk,
  ubahProduk: ubahProduk,
  hapusProduk: hapusProduk,
};
