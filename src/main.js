import Vue from 'vue'
import VueRouter from 'vue-router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'

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
  const userAuth = JSON.parse(localStorage.getItem('userAuth'))
  const token = userAuth ? userAuth.token : null
  if (to.name != 'login') {
    if (token == null) {
      next({ name: 'login' })
    } else {
      axios
        .get(`${process.env.VUE_APP_BASE_API_URL}api/user?token=${token}`)
        .then(() => next())
        .catch(() => {
          localStorage.removeItem('userAuth')
          next({ name: 'login' })
        })
    }
  } else {
    token != null ? next({ name: 'baseApp' }) : next()
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
