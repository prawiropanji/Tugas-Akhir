const Sale = require('../models/sale.model');
const formatIDCurrency = require('../utils/currency-format');

function redirectHomePage(req, res) {
  res.redirect('/home');
}

async function getLandingPage(req, res) {
  const sales = await Sale.getAllSale();
  let totalSaleIncome = 0;
  sales.forEach(function (sale) {
    totalSaleIncome += sale.totalPrice;
  });

  totalSaleIncome = formatIDCurrency(totalSaleIncome);

  const saleAmount = sales.length;

  const voidList = await Sale.getVoid();
  const voidAmount = voidList.length;

  res.render('shared/home', { voidAmount, totalSaleIncome, saleAmount });
}

module.exports = {
  getLandingPage: getLandingPage,
  redirectHomePage: redirectHomePage,
};
