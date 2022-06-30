const KelolaJual = {
  data() {
    return {
      currentDate: new Date(),
      id: null,
    };
  },
  methods: {
    async setVoid(event) {
      const formData = new FormData(document.querySelector('form'));
      const reason = formData.get('reason');

      const id = event.target.dataset.id;
      await fetch(`/admin/kelola-transaksi-penjualan/${id}/void`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: reason }),
      });

      this.toggleVoidForm();
    },
    toggleVoidForm() {
      const modalElement = document.querySelector('.modal');
      modalElement.classList.toggle('open-modal');
    },
    async deleteSale(event) {
      const id = event.target.dataset.id;

      const response = await fetch(
        `/admin/kelola-transkasi-penjualan/${id}/hapus`,
        {
          method: 'DELETE',
        }
      );

      const resBody = await response.json();

      document.querySelector('.modal').classList.toggle('open-modal');

      document.getElementById(id).remove();
    },

    async rejectVoid(event) {
      const id = event.target.dataset.id;

      await fetch(`/admin/kelola-transkasi-penjualan/${id}/patch`, {
        method: 'PATCH',
      });

      document.getElementById(id).remove();
    },
    toggleModal(event) {
      const accountId = event.target.dataset.id;
      this.id = accountId;
      const modalElement = document.querySelector('.modal');
      modalElement.classList.toggle('open-modal');
    },
  },
};

Vue.createApp(KelolaJual).mount('main');
