import DeliveryOrderForm from '@/pages/DeliveryOrder/DeliveryOrderForm.vue'
import DeliveryOrderList from '@/pages/DeliveryOrder/DeliveryOrderList.vue'
// import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import BaseApp from '@/pages/index.vue'
import Login from '@/pages/Login/Login.vue'

export default [
  {
    path: '/',
    component: BaseApp,
    children: [
      {
        path: '/delivery_order',
        component: DeliveryOrderList
      },
      {
        path: '/delivery_order/add',
        component: DeliveryOrderForm
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/delivery_order',
  //   name: 'Delivery Order List',
  //   component: DeliveryOrderList
  // },
  // {
  //   path: '/delivery_order/add',
  //   name: 'Delivery Order Entries',
  //   component: DeliveryOrderForm
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '*',
    redirect: '/login'
  }
]
