import Vue from 'vue'
import App from './App.vue'

import {router} from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import VueCookies from 'vue-cookies'

Vue.use(Vuelidate)
Vue.use(VueCookies)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
