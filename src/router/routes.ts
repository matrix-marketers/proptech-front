import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },

  {
    path: '/classes',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requireAuth: true
    },
    children: [{ path: '', component: () => import('src/pages/ClassesPage.vue') }]
  },

  {
    path: '/students',
    meta: {
      requireAuth: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/StudentPage.vue') }]
  },

  {
    path: '/account-signin',
    name: 'account-signin',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/LoginPage.vue') }]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/RegisterPage.vue') }]
  }
]

export default routes
