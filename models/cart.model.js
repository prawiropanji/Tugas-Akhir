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

  ridItem(product) {
    if (
      this.items.find(function (element) {
        return element.name === product.name;
      })
    ) {
      const itemsFiltered = this.items.filter(function (element) {
        if (element.quantity === 1) {
          return;
        }
        return element;
      });

      const hasil = itemsFiltered.map(function (element) {
        if (element.name === product.name) {
          element.quantity -= 1;
          return element;
        }
        return element;
      });

      this.items = hasil;

      const deductionPrice = this.totalPrice === 0 ? 0 : product.price;

      this.totalPrice -= deductionPrice;
    }
  }
}

module.exports = Cart;
