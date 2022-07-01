const db = require('../data/database');
const formatIDCurrency = require('../utils/currency-format');
const dateFormat = require('../utils/date-format');

class Laporan {
  static async getAmountOfSaleByDay(dateObj) {
    return await db
      .getDb()
      .collection('sales')
      .aggregate([
        {
          $match: {
            date: {
              $gte: new Date(
                dateObj.getFullYear(),
                dateObj.getMonth(),
                dateObj.getDate()
              ),
              $lt: new Date(
                dateObj.getFullYear(),
                dateObj.getMonth(),
                dateObj.getDate() + 1
              ),
            },
          },
        },
        { $group: { _id: null, countSale: { $sum: 1 } } },
      ])
      .toArray();
  }

  static async getTotalIncomeByDay(dateObj) {
    return await db
      .getDb()
      .collection('sales')
      .aggregate([
        {
          $match: {
            date: {
              $gte: new Date(
                dateObj.getFullYear(),
                dateObj.getMonth(),
                dateObj.getDate()
              ),
              $lt: new Date(
                dateObj.getFullYear(),
                dateObj.getMonth(),
                dateObj.getDate() + 1
              ),
            },
          },
        },
        { $group: { _id: null, totalPrice: { $sum: '$totalPrice' } } },
      ])
      .toArray();
  }

  static async getTotalIncomeByMonth(dateObj) {
    let result = await db
      .getDb()
      .collection('sales')
      .aggregate([
        {
          $match: {
            date: {
              $gte: new Date(dateObj.getFullYear(), dateObj.getMonth(), 1),
              $lt: new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 1),
            },
          },
        },
        { $group: { _id: null, totalPrice: { $sum: '$totalPrice' } } },
      ])
      .toArray();

    if (result.length > 0) {
      result = result[0].totalPrice;
    } else {
      result = 0;
    }

    return result;
  }

  static async getSalesForEachProductByMonth(dateObj) {
    let result = await db
      .getDb()
      .collection('sales')
      .aggregate([
        {
          $match: {
            date: {
              $gte: new Date(dateObj.getFullYear(), dateObj.getMonth(), 1),
              $lt: new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 1),
            },
          },
        },
        {
          $unwind: '$products',
        },
      ])
      .toArray();

    result = result.map(function (e) {
      let totalPrice = e.products.price * e.products.quantity;
      totalPrice = formatIDCurrency(totalPrice);
      let date = dateFormat.indonesiafullDateFormat(e.date);
      return { ...e, totalPrice, date };
    });

    return result;
  }

  static async getTotalPriceOfEachProductSoldByMonth(dateObj) {
    return await db
      .getDb()
      .collection('sales')
      .aggregate([
        {
          $match: {
            date: {
              $gte: new Date(dateObj.getFullYear(), dateObj.getMonth(), 1),
              $lt: new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 1),
            },
          },
        },
        {
          $unwind: '$products',
        },
        {
          $addFields: {
            prodTotPrice: {
              $multiply: [{ $toInt: '$products.price' }, '$products.quantity'],
            },
          },
        },
        {
          $group: {
            _id: '$products.name',
            totalSoldPrice: { $sum: '$prodTotPrice' },
          },
        },
      ])
      .toArray();
  }

  static async getTotalQuantityOfEachProductSoldByMonth(dateObj) {
    return await db
      .getDb()
      .collection('sales')
      .aggregate([
        {
          $match: {
            date: {
              $gte: new Date(dateObj.getFullYear(), dateObj.getMonth(), 1),
              $lt: new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 1),
            },
          },
        },
        {
          $unwind: '$products',
        },
        {
          $group: {
            _id: '$products.name',
            totalSoldQuantity: { $sum: '$products.quantity' },
          },
        },
      ])
      .toArray();
  }
}

module.exports = Laporan;
