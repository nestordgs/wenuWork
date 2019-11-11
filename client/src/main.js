import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faFilter, faStar, faStarAndCrescent, faStarHalf, faStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons';
import VCharts from 'v-charts';

import middlware from './middleware';
import App from './App.vue';
import router from './router';
import store from './store';

import './services/Filters';

import './assets/css/styles.css';
import 'vue-snotify/styles/simple.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const options = {
  toast: {
    timeout: 5000,
    position: SnotifyPosition.rightTop,
    showProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
  },
};

library.add(faFilter, faStar, faStarAndCrescent, faStarHalf, faStarHalfAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VCharts);
Vue.use(Snotify, options);

middlware(router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
