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

router.beforeEach((to, from, next) => {
  const IS_AUTH = localStorage.getItem('token')
  if (to.name != 'login') {
    if (IS_AUTH == null) next({ name: 'login' })
    else next()
  } else {
    IS_AUTH != null ? next({ name: 'baseApp' }) : next()
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
