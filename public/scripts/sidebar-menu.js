const Menu = {
  data() {
    return {
      test: 'hello world',
    };
  },
  methods: {
    toggleMenu() {
      document.querySelector('#main-header nav').classList.toggle('open-menu');
    },
  },
};

Vue.createApp(Menu).mount('#main-header');
