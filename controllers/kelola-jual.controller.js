const Product = require('../models/produk.model');
const Cart = require('../models/cart.model');
const Sale = require('../models/sale.model');

async function getKelolaJualPage(req, res) {
  const sales = await Sale.getAllSale();
  res.render('admin/jual/kelola-jual', { sales });
}

async function getTambahJual(req, res) {
  const products = await Product.getAllProduct();

  res.render('admin/jual/tambah-jual', { products });
}

async function getCart(req, res) {
  // console.log(req.session.cart);
  res.status(200).json({ cart: req.session.cart, message: 'get cart success' });
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
  res.status(200).json({ cart: cart, message: 'add cart success' });
}

async function ridCartProduct(req, res) {
  const product = await Product.getProductById(req.body.productId, true);

  let cart;
  if (req.session.cart) {
    const priorCart = req.session.cart;
    cart = new Cart(priorCart.items, priorCart.totalPrice);

    cart.ridItem(product);
    req.session.cart = cart;
    res.status(200).json({ cart: cart, message: 'rid cart succes' });
  }
}

async function setTambahJual(req, res) {
  // console.log(req.session.cart.items);
  if (req.session.cart.items.length === 0) {
    req.session.flashedData = {
      errorMessage: 'Keranjang masih kosong!',
    };

    res.json(req.session.flashedData);
    return;
  }

  req.session.flashedData = null;

  const saleData = {
    products: req.session.cart.items,
    totalPrice: req.session.cart.totalPrice,
    paymentMethod: req.body.payment,
    cashier: req.session.user.userId,
  };

  const sale = new Sale(saleData);
  await sale.saveSale();

  req.session.cart = { items: [], totalPrice: 0 };

  res.status(200).json({ message: 'save sale success' });
}

async function getDetailJual(req, res) {
  const sale = await Sale.getSaleById(req.params.id);
  console.log(sale);
  res.render('admin/jual/detail-jual', { sale });
}

module.exports = {
  getKelolaJualPage: getKelolaJualPage,
  getTambahJual: getTambahJual,
  getCart: getCart,
  addProductToCart: addProductToCart,
  ridCartProduct: ridCartProduct,
  setTambahJual: setTambahJual,
  getDetailJual: getDetailJual,
};