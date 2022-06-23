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
  },
};

Vue.createApp(KelolaProduk).mount('form');
