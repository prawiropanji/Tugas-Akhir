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

  static async getAllPurchase() {
    const purchases = await db.getDb().collection('purchases').find().toArray();
    const formatedData = purchases.map(function (purchase) {
      let monthPurchase = new Date(purchase.date).getMonth();
      const datePurchase = new Date(purchase.date).getDate();
      const yearPurchase = new Date(purchase.date).getFullYear();
      const date = `${datePurchase}-${++monthPurchase}-${yearPurchase}`;
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
