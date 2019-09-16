import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App.vue';
import { routes } from './routes';
import store from './store/store';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options = {
  root: 'https://vuejs2-stock-trader-57490.firebaseio.com/'
};

Vue.filter('currency', value => {
  return '$' + value.toLocaleString();
});

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
