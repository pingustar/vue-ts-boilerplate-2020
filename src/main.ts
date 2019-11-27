import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
// @ts-ignore
import vSelect from 'vue-select';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.component('v-select', vSelect);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
