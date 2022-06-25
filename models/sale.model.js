const db = require('../data/database');
const mongodb = require('mongodb');
const currencyFormatter = require('currency-formatter');

class Sale {
  constructor(saleData) {
    this.products = saleData.products;
    this.totalPrice = saleData.totalPrice;
    this.paymentMethod = saleData.paymentMethod;
    this.cashier = saleData.cashier;
  }

  static async getAllSale() {
    const sales = await db.getDb().collection('sales').find().toArray();
    const formatedData = sales.map(function (sale) {
      const date = new Date(sale.date).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return { ...sale, date };
    });

    return formatedData;
  }

  static async getSaleById(id) {
    const objectId = mongodb.ObjectId(id);
    const sale = await db
      .getDb()
      .collection('sales')
      .findOne({ _id: objectId });
    sale.date = new Date(sale.date).toLocaleString('id-ID', { hour12: false });
    sale.totalPrice = currencyFormatter.format(sale.totalPrice, {
      locale: 'id-ID',
    });
    return sale;
  }

  async saveSale() {
    const data = {
      products: this.products,
      totalPrice: this.totalPrice,
      date: new Date(),
      paymentMethod: this.paymentMethod,
      cashier: this.cashier,
    };
    await db.getDb().collection('sales').insertOne(data);
  }
}

module.exports = Sale;
