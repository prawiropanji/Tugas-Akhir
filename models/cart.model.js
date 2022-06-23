class Cart {
  constructor(items = [], totalPrice = 0) {
    this.items = items;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    //jika item yang akan ditambahkan telah ada pada cart
    if (
      this.items.find(function (element) {
        return element.name === product.name;
      })
    ) {
      this.items.map(function (element) {
        if (element.name === product.name) {
          element.quantity += 1;
          return element;
        }
        return element;
      });
      this.totalPrice += +product.price;
      return;
    }

    let quantity = 1;
    const data = { ...product, quantity };
    this.items.push(data);

    this.totalPrice += +product.price;
  }
}

module.exports = Cart;
