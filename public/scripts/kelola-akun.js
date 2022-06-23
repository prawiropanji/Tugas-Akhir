const KelolaAkun = {
  data() {
    return {
      test: 'hello world',
    };
  },
  methods: {
    async deleteAccount(event) {
      const accountId = event.target.dataset.id;
      const response = await fetch(`/admin/kelola-akun/${accountId}`, {
        method: 'DELETE',
      });

      event.target.parentElement.parentElement.remove();
    },
  },
};

Vue.createApp(KelolaAkun).mount('table');
