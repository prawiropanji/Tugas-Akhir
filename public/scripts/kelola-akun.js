const KelolaAkun = {
  data() {
    return {
      id: '',
    };
  },
  methods: {
    async deleteAccount(event) {
      const accountId = event.target.dataset.id;
      const response = await fetch(`/admin/kelola-akun/${accountId}`, {
        method: 'DELETE',
      });

      document.querySelector('.modal').classList.toggle('open-modal');

      document.getElementById(accountId).remove();

      // event.target.parentElement.parentElement.remove();
    },
    toggleModal(event) {
      const accountId = event.target.dataset.id;
      this.id = accountId;
      const modalElement = document.querySelector('.modal');
      modalElement.classList.toggle('open-modal');
    },
  },
};

Vue.createApp(KelolaAkun).mount('main');
