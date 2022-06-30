const Sale = require('../models/sale.model');
const Laporan = require('../models/laporan.model');
const Purchase = require('../models/purchase.model');
const formatIDCurrency = require('../utils/currency-format');
const dateFormat = require('../utils/date-format');

async function getLaporanLabaRugi(req, res) {
  let totalExpenses = await Purchase.getExpensesByMonth(new Date());
  totalExpenses = formatIDCurrency(totalExpenses);

  const result = await Laporan.getTotalIncomeByMonth(new Date());

  let totalPrice = 0;
  if (result.length > 0) {
    totalPrice = formatIDCurrency(result[0].totalPrice);
  }

  const currentMonth = new Date().toLocaleString('id-ID', {
    month: 'long',
    year: 'numeric',
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

  res.render('admin/laporan/laporan-laba-rugi', {
    currentMonth,
    totalPrice,
    salesByProduct,
    selectedYMDate: currentYMDate,
  });
}

async function getLaporanJualPage(req, res) {
  const result = await Laporan.getTotalIncomeByMonth(new Date());

  let totalPrice = 0;
  if (result.length > 0) {
    totalPrice = formatIDCurrency(result[0].totalPrice);
  }

  let sales = await Laporan.getSalesForEachProductByMonth(new Date());

  const currentMonth = new Date().toLocaleString('id-ID', {
    month: 'long',
    year: 'numeric',
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
    year: 'numeric',
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

  res.render('admin/laporan/laporan-jual', {
    sales,
    currentMonth,
    totalPrice,
    salesByProduct,
    selectedYMDate,
  });
}

async function getLaporanLabaRugiUserSelected(req, res) {
  const selectedMonth = req.query['selected-month'];

  const result = await Laporan.getTotalIncomeByMonth(new Date(selectedMonth));

  let totalPrice = 0;
  if (result.length > 0) {
    totalPrice = formatIDCurrency(result[0].totalPrice);
  }

  const currentMonth = new Date(selectedMonth).toLocaleString('id-ID', {
    month: 'long',
    year: 'numeric',
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

  const currentYMDate = dateFormat.ymFormat(new Date(selectedMonth));

  res.render('admin/laporan/laporan-laba-rugi', {
    currentMonth,
    totalPrice,
    salesByProduct,
    selectedYMDate: currentYMDate,
  });
}

module.exports = {
  getLaporanJualPage: getLaporanJualPage,
  getLaporanJualUserSelected,
  getLaporanLabaRugi,
  getLaporanLabaRugiUserSelected,
};
