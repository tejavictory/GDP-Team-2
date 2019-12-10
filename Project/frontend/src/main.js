import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import '../semantic/dist/semantic.css'
import '../semantic/dist/semantic.js'
import * as CSV from 'csv-string';

window.axios = axios
// axios.defaults.baseURL = 'http://127.0.0.1:3333'
axios.defaults.baseURL = 'https://codewordcreed.herokuapp.com'

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(CSV)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
