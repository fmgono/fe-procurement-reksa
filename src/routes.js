import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import BaseApp from '@/pages/index.vue'
import Login from '@/pages/Login/Login.vue'

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/',
    name: 'baseApp',
    component: BaseApp,
    children: [
      {
        path: '/',
        component: Dashboard,
        meta: {
          title: 'Dashboard'
        }
      },
      {
        path: 'delivery_order',
        component: () => import('@/pages/DeliveryOrder/DeliveryOrderList.vue'),
        meta: {
          title: 'List Delivery Order'
        }
      },
      {
        path: 'delivery_order/add',
        component: () => import('@/pages/DeliveryOrder/DeliveryOrderForm.vue'),
        meta: {
          title: 'Add Delivery Order'
        }
      },
      {
        path: '*',
        component: () => import('@/pages/404.vue'),
        meta: {
          title: '404 Not Found!'
        }
      }
    ]
  }
]
