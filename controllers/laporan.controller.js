const Sale = require('../models/sale.model');
const Laporan = require('../models/laporan.model');
const Purchase = require('../models/purchase.model');
const formatIDCurrency = require('../utils/currency-format');
const dateFormat = require('../utils/date-format');

async function getLaporanLabaRugi(req, res) {
  let totalExpenses = await Purchase.getExpensesByMonth(new Date());

  let totalPrice = await Laporan.getTotalIncomeByMonth(new Date());

  //calculate incomeStatement
  const incomeStatement = totalPrice - totalExpenses;

  //format currency for expenses and income
  if (totalExpenses) {
    totalExpenses = formatIDCurrency(totalExpenses);
  } else {
    totalExpenses = 0;
  }

  if (totalPrice) {
    totalPrice = formatIDCurrency(totalPrice);
  } else {
    totalPrice = 0;
  }

  const currentMonth = new Date().toLocaleString('id-ID', {
    month: 'long',
    year: 'numeric',
  });

  //income
  let salesByProduct = [];

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

  salesByProduct = salesByProduct.map(function (sale) {
    const totalSoldPrice = formatIDCurrency(sale.totalSoldPrice);
    return { ...sale, totalSoldPrice };
  });

  //expenses
  let purchasedByProduct = [];

  const purchaseByProductTotalPrice =
    await Purchase.getExpensesEachPurchasedItemByMonth(new Date());

  const purchaseByProductTotalQuantity =
    await Purchase.getQuantityEachPurchasedItemByMonth(new Date());

  //join purchaseByProductTotalPrice &  purcahseByProductTotalQuantity
  for (const element1 of purchaseByProductTotalPrice) {
    purchasedByProduct.push({
      ...element1,
      ...purchaseByProductTotalQuantity.find(function (element2) {
        return element2._id === element1._id;
      }),
    });
  }

  purchasedByProduct = purchasedByProduct.map(function (purchase) {
    const totalExpenses = formatIDCurrency(purchase.totalExpenses);
    return { ...purchase, totalExpenses };
  });

  const currentYMDate = dateFormat.ymFormat(new Date());

  res.render('admin/laporan/laporan-laba-rugi', {
    currentMonth,
    totalPrice,
    salesByProduct,
    selectedYMDate: currentYMDate,
    totalExpenses,
    purchasedByProduct,
    incomeStatement,
  });
}

async function getLaporanLabaRugiUserSelected(req, res) {
  const selectedMonth = req.query['selected-month'];

  let totalExpenses = await Purchase.getExpensesByMonth(
    new Date(selectedMonth)
  );

  let totalPrice = await Laporan.getTotalIncomeByMonth(new Date(selectedMonth));

  //calculate incomeStatement
  const incomeStatement = totalPrice - totalExpenses;

  //format currency for expenses and income
  if (totalExpenses) {
    totalExpenses = formatIDCurrency(totalExpenses);
  } else {
    totalExpenses = 0;
  }

  if (totalPrice) {
    totalPrice = formatIDCurrency(totalPrice);
  } else {
    totalPrice = 0;
  }

  const currentMonth = new Date(selectedMonth).toLocaleString('id-ID', {
    month: 'long',
    year: 'numeric',
  });

  //income
  let salesByProduct = [];

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

  salesByProduct = salesByProduct.map(function (sale) {
    const totalSoldPrice = formatIDCurrency(sale.totalSoldPrice);
    return { ...sale, totalSoldPrice };
  });

  //expenses
  let purchasedByProduct = [];

  const purchaseByProductTotalPrice =
    await Purchase.getExpensesEachPurchasedItemByMonth(new Date(selectedMonth));

  const purchaseByProductTotalQuantity =
    await Purchase.getQuantityEachPurchasedItemByMonth(new Date(selectedMonth));

  //join purchaseByProductTotalPrice &  purcahseByProductTotalQuantity
  for (const element1 of purchaseByProductTotalPrice) {
    purchasedByProduct.push({
      ...element1,
      ...purchaseByProductTotalQuantity.find(function (element2) {
        return element2._id === element1._id;
      }),
    });
  }

  purchasedByProduct = purchasedByProduct.map(function (purchase) {
    const totalExpenses = formatIDCurrency(purchase.totalExpenses);
    return { ...purchase, totalExpenses };
  });

  const currentYMDate = dateFormat.ymFormat(new Date(selectedMonth));

  res.render('admin/laporan/laporan-laba-rugi', {
    currentMonth,
    totalPrice,
    salesByProduct,
    selectedYMDate: currentYMDate,
    totalExpenses,
    purchasedByProduct,
    incomeStatement,
  });
}

async function getLaporanJualPage(req, res) {
  let totalPrice = await Laporan.getTotalIncomeByMonth(new Date());

  if (totalPrice) {
    totalPrice = formatIDCurrency(totalPrice);
  } else {
    totalPrice = 0;
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

  let totalPrice = await Laporan.getTotalIncomeByMonth(new Date(selectedMonth));

  if (totalPrice) {
    totalPrice = formatIDCurrency(totalPrice);
  } else {
    totalPrice = 0;
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

module.exports = {
  getLaporanJualPage: getLaporanJualPage,
  getLaporanJualUserSelected,
  getLaporanLabaRugi,
  getLaporanLabaRugiUserSelected,
};
