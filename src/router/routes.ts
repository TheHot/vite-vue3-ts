import { RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'
import LayoutMobile from '../mobile/layout/index.vue'
import Login from '../views/login/index.vue'
import MobileLogin from '@/mobile/views/login/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    meta: {
      title: '首页'
    },
    redirect: '/userList',
    children: [
      {
        path: 'userList',
        name: 'userList',
        meta: {
          title: '强国用户'
        },
        component: () => import('@/views/userList/index.vue')
      },
      {
        path: 'config',
        name: 'config',
        meta: {
          title: '配置文件'
        },
        component: () => import('@/views/config/index.vue')
      },
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '日志查看'
        },
        component: () => import('@/views/log/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const routesMobile: RouteRecordRaw[] = [
  {
    path: '/',
    component: LayoutMobile,
    redirect: '/userList',
    children: [
      {
        path: 'userList',
        name: 'userList',
        meta: {
          title: '强国用户'
        },
        component: () => import('@/mobile/views/userList/index.vue')
      },
      {
        path: 'config',
        name: 'config',
        meta: {
          title: '配置文件'
        },
        component: () => import('@/mobile/views/config/index.vue')
      },
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '日志查看'
        },
        component: () => import('@/mobile/views/log/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: MobileLogin
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export {
  routes,
  routesMobile
}
