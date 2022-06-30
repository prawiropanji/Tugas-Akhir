const Beli = require('../models/purchase.model');
const formatIDCurrency = require('../utils/currency-format');

async function getKelolaBeliPage(req, res) {
  let purchases = await Beli.getAllPurchase();
  purchases = purchases.map(function (purchase) {
    const price = formatIDCurrency(+purchase.price);
    return { ...purchase, price };
  });

  res.render('admin/beli/kelola-beli', { purchases });
}

function getTambahBeli(req, res) {
  res.render('admin/beli/tambah-beli');
}

async function tambahBeli(req, res) {
  const inputData = {
    name: req.body.name,
    price: req.body.price,
    unit: req.body.unit,
    quantity: req.body.quantity,
    description: req.body.description,
  };
  const beli = new Beli(inputData);
  await beli.savePurchase();

  res.redirect('/admin/kelola-transaksi-pembelian');
}

async function getDetailBeli(req, res) {
  const purchaseData = await Beli.getPurchaseById(req.params.id);

  res.render('admin/beli/detail-beli', { purchaseData });
}

async function updateBeli(req, res) {
  const data = {
    name: req.body.name,
    price: req.body.price,
    unit: req.body.unit,
    quantity: req.body.quantity,
    description: req.body.description,
  };

  const beli = new Beli(data);
  await beli.updatePurchase(req.params.id, data);

  res.status(200).json({ message: 'update success' });
}

async function deletePurchase(req, res) {
  await Beli.deletePurchase(req.params.id);

  res.status(200).json({ message: 'delete success' });
}

module.exports = {
  getKelolaBeliPage: getKelolaBeliPage,
  getTambahBeli: getTambahBeli,
  tambahBeli: tambahBeli,
  getDetailBeli: getDetailBeli,
  updateBeli: updateBeli,
  deletePurchase: deletePurchase,
};
