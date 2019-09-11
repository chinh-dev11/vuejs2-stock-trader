import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import { routes } from './routes';
import store from './store/store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history' // hash mode by default
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
