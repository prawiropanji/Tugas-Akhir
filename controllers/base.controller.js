const Sale = require('../models/sale.model');
const formatIDCurrency = require('../utils/currency-format');
const Laporan = require('../models/laporan.model');

function redirectHomePage(req, res) {
  res.redirect('/home');
}

async function getLandingPage(req, res) {
  // const sales = await Sale.getAllSale();

  let totalIncome = await Laporan.getTotalIncomeByDay(new Date());

  if (totalIncome.length > 0) {
    totalIncome = formatIDCurrency(totalIncome[0].totalPrice);
  } else {
    totalIncome = formatIDCurrency(0);
  }

  let countSale = await Laporan.getAmountOfSaleByDay(new Date());
  if (countSale.length > 0) {
    countSale = countSale[0].countSale;
  } else {
    countSale = 0;
  }

  const voidList = await Sale.getVoid();
  const voidAmount = voidList.length;

  res.render('shared/home', { voidAmount, totalIncome, countSale });
}

module.exports = {
  getLandingPage: getLandingPage,
  redirectHomePage: redirectHomePage,
};
