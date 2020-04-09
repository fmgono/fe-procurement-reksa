import DeliveryOrderForm from '@/pages/DeliveryOrder/DeliveryOrderForm.vue'
import DeliveryOrderList from '@/pages/DeliveryOrder/DeliveryOrderList.vue'
import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import BaseApp from '@/pages/index.vue'
import Login from '@/pages/Login/Login.vue'

export default [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'baseApp',
    component: BaseApp,
    children: [
      {
        path: '/',
        component: Dashboard
      },
      {
        path: 'delivery_order',
        component: DeliveryOrderList
      },
      {
        path: 'delivery_order/add',
        component: DeliveryOrderForm
      }
    ]
  }
]
