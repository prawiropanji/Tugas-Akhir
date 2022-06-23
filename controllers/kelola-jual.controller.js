const Product = require('../models/produk.model');
const Cart = require('../models/cart.model');
const session = require('express-session');

function getKelolaJualPage(req, res) {
  console.log(req.session.cart);
  res.render('admin/jual/kelola-jual');
}

async function getTambahJual(req, res) {
  const products = await Product.getAllProduct();

  res.render('admin/jual/tambah-jual', { products });
}

async function addProductToCart(req, res) {
  const product = await Product.getProductById(req.body.productId, true);

  let cart;
  //jika session cart ada isinya
  if (req.session.cart) {
    const priorCart = req.session.cart;
    cart = new Cart(priorCart.items, priorCart.totalPrice);
  }

  //jika session cart kosong
  if (!req.session.cart) {
    cart = new Cart();
  }

  cart.addItem(product);
  req.session.cart = cart;
  res.status(200).json({ cart: cart, message: 'success' });
}

module.exports = {
  getKelolaJualPage: getKelolaJualPage,
  getTambahJual: getTambahJual,
  addProductToCart: addProductToCart,
};
