const TambahJual = {
  data() {
    return {
      cart: {},
      nama: 'panji',
    };
  },
  methods: {
    toggleMenu() {
      document.querySelector('#main-header nav').classList.toggle('open-menu');
    },

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
    async ridCartProduct(event) {
      const productId = event.target.dataset.idproduct;

      const response = await fetch('/admin/cart/kurang', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      this.cart = data.cart;
    },

    async setSale() {
      const inputSaleFormElement = document.querySelector('form');
      const formData = new FormData(inputSaleFormElement);

      if (!formData.get('payment')) {
        window.alert('pilih metode pembayaran');
        return;
      }

      const paymentMethod = { payment: formData.get('payment') };

      const response = await fetch('/admin/kelola-transaksi-penjualan/tambah', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentMethod),
      });

      bodyRes = await response.json();

      if (bodyRes.errorMessage) {
        alert(bodyRes.errorMessage);
        return;
      }

      this.cart = { items: [], totalPrice: 0 };

      window.alert('Menambahkan Transaksi Penjualan');

      const radioInputElements = document.querySelectorAll('input');
      for (const radioInputElement of radioInputElements) {
        radioInputElement.checked = false;
      }
    },
  },
  async created() {
    const response = await fetch('/admin/cart');
    const resBody = await response.json();

    this.cart = resBody.cart;
  },
};

Vue.createApp(TambahJual).mount('body');
