const db = require('../data/database');
const mongodb = require('mongodb');

class User {
  constructor(id, password, name, phone, isAdmin) {
    this.userId = id;
    this.password = password;
    this.name = name;
    this.phone = phone;
    this.isAdmin = isAdmin;
  }

  async findUser() {
    const userExist = await db
      .getDb()
      .collection('users')
      .findOne({ userId: this.userId });

    return userExist;
  }

  async signup() {
    const userData = {
      userId: this.userId,
      password: this.password,
      name: this.name,
      phone: this.phone,
      isAdmin: this.isAdmin,
    };
    await db.getDb().collection('users').insertOne(userData);
  }

  static async getAllAccountDetail() {
    const accountDetails = await db
      .getDb()
      .collection('users')
      .find()
      .project({ password: 0 })
      .toArray();
    return accountDetails;
  }

  static async deleteAccount(id) {
    const objectId = mongodb.ObjectId(id);

    await db.getDb().collection('users').deleteOne({ _id: objectId });
  }
}

module.exports = User;
