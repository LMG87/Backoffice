import { createRouter, createWebHashHistory } from 'vue-router'
import dashboardRouter from '@/modules/dashboard/router'
import authRouter from '@/modules/auth/router'
import isAuthenticatedGuard from '@/modules/auth/router/auth-guard'

const routes = [
  {
    path: '/',
    beforeEnter: [ isAuthenticatedGuard ],
    ...dashboardRouter
  },
  {
    path: '/auth',
    ...authRouter
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
