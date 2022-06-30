const Sale = require('../models/sale.model');
const Laporan = require('../models/laporan.model');
const formatIDCurrency = require('../utils/currency-format');
const dateFormat = require('../utils/date-format');

async function getLaporanJualPage(req, res) {
  const result = await Laporan.getTotalIncomeByMonth(new Date());
  const totalPrice = formatIDCurrency(result[0].totalPrice);

  let sales = await Laporan.getSalesForEachProductByMonth(new Date());

  const currentMonth = new Date().toLocaleDateString('id-ID', {
    month: 'long',
  });

  const salesByProduct = [];

  const salesByProductTotalPrice =
    await Laporan.getTotalPriceOfEachProductSoldByMonth(new Date());

  const salesByProductTotalQuantity =
    await Laporan.getTotalQuantityOfEachProductSoldByMonth(new Date());

  //join salesByProductTotalQuantity & salesByProductTotalPrice
  for (const element1 of salesByProductTotalPrice) {
    salesByProduct.push({
      ...element1,
      ...salesByProductTotalQuantity.find(function (element2) {
        return element2._id === element1._id;
      }),
    });
  }

  const currentYMDate = dateFormat.ymFormat(new Date());

  res.render('admin/laporan/laporan-jual', {
    sales,
    currentMonth,
    totalPrice,
    salesByProduct,
    selectedYMDate: currentYMDate,
  });
}

async function getLaporanJualUserSelected(req, res) {
  const selectedMonth = req.query['selected-month'];

  const result = await Laporan.getTotalIncomeByMonth(new Date(selectedMonth));

  let totalPrice = 0;
  if (result.length > 0) {
    totalPrice = formatIDCurrency(result[0].totalPrice);
  }

  let sales = await Laporan.getSalesForEachProductByMonth(
    new Date(selectedMonth)
  );

  const currentMonth = new Date(selectedMonth).toLocaleDateString('id-ID', {
    month: 'long',
  });

  const salesByProduct = [];

  const salesByProductTotalPrice =
    await Laporan.getTotalPriceOfEachProductSoldByMonth(
      new Date(selectedMonth)
    );

  const salesByProductTotalQuantity =
    await Laporan.getTotalQuantityOfEachProductSoldByMonth(
      new Date(selectedMonth)
    );

  //join salesByProductTotalQuantity & salesByProductTotalPrice
  for (const element1 of salesByProductTotalPrice) {
    salesByProduct.push({
      ...element1,
      ...salesByProductTotalQuantity.find(function (element2) {
        return element2._id === element1._id;
      }),
    });
  }

  const selectedYMDate = dateFormat.ymFormat(new Date(selectedMonth));

  console.log(sales);

  res.render('admin/laporan/laporan-jual', {
    sales,
    currentMonth,
    totalPrice,
    salesByProduct,
    selectedYMDate,
  });
}

module.exports = {
  getLaporanJualPage: getLaporanJualPage,
  getLaporanJualUserSelected,
};