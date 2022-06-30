const db = require('../data/database');
const mongodb = require('mongodb');
const currencyFormatter = require('currency-formatter');

const dateFormatter = require('../utils/date-format');

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
      const date = dateFormatter.indonesiafullDateFormat(sale.date);
      const time = new Date(sale.date).toLocaleTimeString('id-ID');
      return { ...sale, date, time };
    });

    return formatedData;
  }

  static async getSaleThisMonth() {
    const currentDate = new Date();

    let result = await db
      .getDb()
      .collection('sales')
      .find({
        date: {
          $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
          $lt: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
          ),
        },
      })
      .toArray();

    result = result.map(function (sale) {
      const date = dateFormatter.indonesiafullDateFormat(sale.date);

      return { ...sale, date };
    });

    return result;
  }

  static async getSaleThisDay() {
    const currentDate = new Date();

    let result = await db
      .getDb()
      .collection('sales')
      .find({
        date: {
          $gte: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          ),
          $lt: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
          ),
        },
      })
      .toArray();

    result = result.map(function (sale) {
      const date = dateFormatter.indonesiafullDateFormat(sale.date);
      const time = new Date(sale.date).toLocaleTimeString('id-ID');
      return { ...sale, time, date };
    });

    return result;
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

  static async void(id, alasan) {
    const objectId = mongodb.ObjectId(id);
    await db
      .getDb()
      .collection('sales')
      .updateOne({ _id: objectId }, { $set: { void: { reason: alasan } } });
  }

  static async getVoid() {
    const listVoid = await db
      .getDb()
      .collection('sales')
      .find({ void: { $ne: false } })
      .toArray();

    const formatedData = listVoid.map(function (sale) {
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

  static async rejectVoid(id) {
    const objectId = mongodb.ObjectId(id);
    await db
      .getDb()
      .collection('sales')
      .updateOne({ _id: objectId }, { $set: { void: false } });
  }

  static async deleteSale(id) {
    const objectId = mongodb.ObjectId(id);
    await db.getDb().collection('sales').deleteOne({ _id: objectId });
  }

  async saveSale() {
    const data = {
      products: this.products,
      totalPrice: this.totalPrice,
      date: new Date(),
      paymentMethod: this.paymentMethod,
      cashier: this.cashier,
      void: false,
    };
    await db.getDb().collection('sales').insertOne(data);
  }
}

module.exports = Sale;
