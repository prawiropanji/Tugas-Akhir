const db = require('../data/database');
const mongodb = require('mongodb');
const currencyFormatter = require('currency-formatter');

class Product {
  constructor(name, price, stock, category, image) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.imageFileName = image;

    this.imageUrl = `/images/${image}`;
  }

  static async getAllProduct() {
    let products = await db.getDb().collection('products').find().toArray();
    //format setiap harga
    const result = products.map(function (product) {
      let price = currencyFormatter.format(+product.price, {
        locale: 'id-ID',
      });

      price = price + ',00';

      return { ...product, price };
    });
    return result;
  }

  static async getProductById(id, isItemForCart) {
    const objectId = mongodb.ObjectId(id);

    const product = !isItemForCart
      ? await db.getDb().collection('products').findOne({ _id: objectId })
      : await db
          .getDb()
          .collection('products')
          .findOne({ _id: objectId }, { projection: { name: 1, price: 1 } });

    return product;
  }

  async saveProduct() {
    const product = {
      name: this.name,
      price: this.price,
      stock: this.stock,
      category: this.category,
      imageFileName: this.imageFileName,
      imageUrl: this.imageUrl,
    };
    await db.getDb().collection('products').insertOne(product);
  }

  async updateProduct(id) {
    const objectId = mongodb.ObjectId(id);

    const productData = {
      name: this.name,
      price: this.price,
      stock: this.stock,
      category: this.category,
      imageFileName: this.imageFileName,
      imageUrl: this.imageUrl,
    };

    if (!productData.imageFileName) {
      delete productData.imageFileName;
      delete productData.imageUrl;
    }

    await db
      .getDb()
      .collection('products')
      .updateOne({ _id: objectId }, { $set: productData });
  }

  static async deleteProduct(id) {
    const objectId = mongodb.ObjectId(id);
    await db.getDb().collection('products').deleteOne({ _id: objectId });
  }
}

module.exports = Product;
