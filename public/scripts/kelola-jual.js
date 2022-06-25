const KelolaJual = {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  methods: {
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
  },
};

Vue.createApp(KelolaJual).mount('main');
