import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
// @ts-ignore
import VoerroTagsInput from '@voerro/vue-tagsinput';
import App from './App.vue';
import router from './router';
import store from './store';
import '../node_modules/@voerro/vue-tagsinput/dist/style.css';

Vue.component('tags-input', VoerroTagsInput);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
