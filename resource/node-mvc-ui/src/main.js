import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'
import VueJWT from 'vuejs-jwt'
import VueNotifications from 'vue-notifications'
import iziToast from 'izitoast'// https://github.com/dolce/iziToast

import './assets/styles/index.css';
import 'izitoast/dist/css/iziToast.min.css'

Vue.use(VueJWT);
Vue.use(VueSession, { persist: true });

Vue.config.productionTip = false;

function toast({ title, message, type, timeout }) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return iziToast[type]({ title, message, timeout })
}
Vue.use(VueNotifications, { success: toast, error: toast, info: toast, warn: toast });

Vue.prototype.$apiHost = 'http://localhost:8000';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
