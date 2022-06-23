const TambahJual = {
  data() {
    return {
      cart: {},
    };
  },
  methods: {
    async addProductToCart(event) {
      const productId = event.target.dataset.idproduct;

      const response = await fetch('/admin/cart/tambah', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      this.cart = data.cart;
    },
  },
};

Vue.createApp(TambahJual).mount('body');
