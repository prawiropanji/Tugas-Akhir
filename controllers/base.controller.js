const Sale = require('../models/sale.model');
const formatIDCurrency = require('../utils/currency-format');
const Laporan = require('../models/laporan.model');

function redirectHomePage(req, res) {
  res.redirect('/home');
}

async function getLandingPage(req, res) {
  // const sales = await Sale.getAllSale();

  let totalIncome = await Laporan.getTotalIncomeByDay(new Date());
  totalIncome = formatIDCurrency(totalIncome[0].totalPrice);

  let countSale = await Laporan.getAmountOfSaleByDay(new Date());
  countSale = countSale[0].countSale;

  // const saleAmount = sales.length;

  const voidList = await Sale.getVoid();
  const voidAmount = voidList.length;

  res.render('shared/home', { voidAmount, totalIncome, countSale });
}

module.exports = {
  getLandingPage: getLandingPage,
  redirectHomePage: redirectHomePage,
};
