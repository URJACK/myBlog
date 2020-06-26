import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
import mavonEditor from "mavon-editor"

import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'

import "./axios"
import "./permission"

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(mavonEditor)
Vue.prototype.$axios = axios

console.log(process.env);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
