import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import middlware from './middleware';
import App from './App.vue';
import router from './router';
import store from './store';

import './services/Filters';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-snotify/styles/simple.css';

const options = {
  toast: {
    timeout: 5000,
    position: SnotifyPosition.rightTop,
    showProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
  },
};

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Snotify, options);

middlware(router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
