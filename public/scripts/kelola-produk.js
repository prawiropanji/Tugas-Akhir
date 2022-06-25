const KelolaProduk = {
  data() {
    return {
      test: 'hello world',
    };
  },
  methods: {
    viewImage(event) {
      const imagePreviewElement = document.getElementById('image-preview');
      const files = event.target.files;

      if (files.length === 0) {
        imagePreviewElement.style.display = 'none';
        return;
      }

      const urlGenerated = URL.createObjectURL(files[0]);
      imagePreviewElement.style.display = 'block';
      imagePreviewElement.src = urlGenerated;
    },
    async deleteProduct(event) {
      await fetch(`/admin/kelola-produk/${event.target.dataset.id}/hapus`);
      window.location.replace('/admin/kelola-produk');
    },
    toggleModal() {
      const modalElement = document.querySelector('.modal');
      modalElement.classList.toggle('open-modal');
    },
  },
};

Vue.createApp(KelolaProduk).mount('form');
