import Vue from 'vue'
import VueRouter from 'vue-router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import App from './App.vue'
import Routes from './routes'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes: Routes,
  mode: 'history',
  base: process.env.BASE_URL
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
