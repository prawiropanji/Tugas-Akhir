const KelolaBeli = {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  methods: {
    async updatePurchase(event) {
      const detailPurchaseFormElement = document.querySelector('form');

      const formData = new FormData(detailPurchaseFormElement);

      const purchaseData = {
        name: formData.get('name'),
        price: formData.get('price'),
        unit: formData.get('unit'),
        quantity: formData.get('quantity'),
        description: formData.get('description'),
      };

      let response;
      try {
        response = await fetch(
          `/admin/kelola-transaksi-pembelian/${event.target.dataset.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseData),
          }
        );
      } catch (error) {
        window.alert('something went wrong!');
        return;
      }

      if (!response.ok) {
        window.alert('something went wrong!');
        return;
      }

      window.location.replace('/admin/kelola-transaksi-pembelian');
    },

    async deletePurchase(event) {
      let response;
      try {
        response = await fetch(
          `/admin/kelola-transaksi-pembelian/${event.target.dataset.id}`,
          {
            method: 'DELETE',
          }
        );
      } catch (error) {
        window.alert('something went wrong!');
        return;
      }

      if (!response.ok) {
        window.alert('something went wrong!');
        return;
      }

      window.location.replace('/admin/kelola-transaksi-pembelian');
    },
    toggleModal() {
      const modalElement = document.querySelector('.modal');
      modalElement.classList.toggle('open-modal');
    },
  },
};

Vue.createApp(KelolaBeli).mount('main');
