const db = require('../data/database');

const mongodb = require('mongodb');

class Purchase {
  constructor(beliData) {
    this.name = beliData.name;
    this.price = beliData.price;
    this.unit = beliData.unit;
    this.quantity = beliData.quantity;
    this.description = beliData.description;
  }

  static async getExpensesByMonth(dateObj) {
    let result = await db
      .getDb()
      .collection('purchases')
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
          $addFields: {
            totalPrice: {
              $multiply: [{ $toInt: '$price' }, { $toInt: '$quantity' }],
            },
          },
        },
        { $group: { _id: null, totalExpenses: { $sum: '$totalPrice' } } },
      ])
      .toArray();

    return result[0].totalExpenses;
  }

  static async getAllPurchase() {
    const purchases = await db.getDb().collection('purchases').find().toArray();
    const formatedData = purchases.map(function (purchase) {
      const date = new Date(purchase.date).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      return { ...purchase, date };
    });
    return formatedData;
  }

  static async getPurchaseById(id) {
    const objectId = mongodb.ObjectId(id);
    return await db.getDb().collection('purchases').findOne({ _id: objectId });
  }

  async savePurchase() {
    const data = {
      name: this.name,
      price: this.price,
      unit: this.unit,
      description: this.description,
      quantity: this.quantity,
      date: new Date(),
    };
    await db.getDb().collection('purchases').insertOne(data);
  }

  async updatePurchase(id, data) {
    const objectId = new mongodb.ObjectId(id);
    await db
      .getDb()
      .collection('purchases')
      .updateOne({ _id: objectId }, { $set: data });
  }

  static async deletePurchase(id) {
    const objectId = new mongodb.ObjectId(id);
    await db.getDb().collection('purchases').deleteOne({ _id: objectId });
  }
}

module.exports = Purchase;
