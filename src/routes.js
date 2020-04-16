import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import BaseApp from '@/pages/index.vue'
import Login from '@/pages/Login/Form.vue'

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
        component: () => import('@/pages/DeliveryOrder/List.vue'),
        meta: {
          title: 'List Delivery Order'
        }
      },
      {
        path: 'delivery_order/add',
        component: () => import('@/pages/DeliveryOrder/Form.vue'),
        meta: {
          title: 'Add Delivery Order'
        }
      },
      {
        path: 'delivery_order/print/:doNo',
        component: () => import('@/pages/DeliveryOrder/Print.vue'),
        meta: {
          title: 'Print Delivery Order'
        }
      },
      {
        path: 'invoice',
        component: () => import('@/pages/Invoice/List.vue'),
        meta: {
          title: 'List Invoice'
        }
      },
      {
        path: 'invoice/print/:invNo',
        component: () => import('@/pages/Invoice/Print.vue'),
        meta: {
          title: 'Print Invoice'
        }
      },
      {
        path: 'invoice/receipt/print/',
        component: () => import('@/pages/Invoice/ReceiptPrint.vue'),
        meta: {
          title: 'Print Invoice'
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
