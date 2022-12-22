import { createRouter, createWebHashHistory } from 'vue-router'
import { checkToken } from '@/api'
import { getStorage, setSession } from '@/utils'
import {
  routes,
  routesMobile
} from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: window.screen.width < 800 ? routesMobile : routes
})

router.beforeEach(async(to) => {
  let isAuthenticated = false
  if (to.name !== 'Login') {
    const token = getStorage('qg_token')
    if (token) {
      const { data }: any = await checkToken(token)
      if (data !== -1) {
        isAuthenticated = true
        setSession('level', data)
      }
    }
  }
  if (
    // 检查用户是否已登录
    !isAuthenticated &&
    // ❗️ 避免无限重定向
    to.name !== 'Login'
  ) {
    // 将用户重定向到登录页面
    return { name: 'Login' }
  }
})

export default router
