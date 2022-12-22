<template>
  <div class="mobile-layout-container">
    <!-- 导航栏 -->
    <van-nav-bar class="nav" fixed safe-area-inset-top>
      <template #left>
        <div class="nav-left flex items-center">
          <van-icon
            name="wap-nav"
            size="18px"
            color="#000"
            @click="showAside = true"
          />
          <!-- 路由 mate 信息 -->
          <span>{{ title }}</span>
        </div>
      </template>
      <template #right>
        <div class="nav-right" @click="showAction = true">
          <van-icon name="user-circle-o" color="#000" />
          <span>{{ userInfo.nick }}</span>
          <van-icon
            class="transform transition-all"
            :class="{'rotate-180': showAction}"
            name="arrow-down"
            color="#000"
            size="12"
          />
        </div>
      </template>
    </van-nav-bar>
    <!-- 容器 -->
    <main>
      <router-view />
    </main>
  </div>
  <Aside v-model:show="showAside" :path="path" />
  <van-action-sheet
    v-model:show="showAction"
    :actions="actions"
    cancel-text="取消"
    close-on-click-action
    @select="actionSelect"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { showConfirmDialog } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import Aside from './components/Aside.vue'
import { getStorage } from '@/utils'

const currentRoute = useRoute()
const router = useRouter()
const title = ref(currentRoute.meta.title)
const showAside = ref(false)
const path = ref()
const userInfo = ref(getStorage('user_info'))
const showAction = ref(false)

const actions = [
  { name: '注销登录', type: 'logout' }
]

watch(() => currentRoute.path, () => {
  title.value = currentRoute.meta.title
  path.value = currentRoute.path
}, { immediate: true })

const actionSelect = (val: any) => {
  if (val.type === 'logout') {
    logout()
  }
}

function logout() {
  showConfirmDialog({
    title: '提示',
    message: '是否要注销登录？'
  }).then(async() => {
    window.localStorage.removeItem('qg_token')
    router.push('/login')
  }).catch()
}

</script>

<style lang="postcss" scoped>
.mobile-layout-container {
  position: relative;
  height: 100%;
  background-color: #f0f3f8;

  & .nav {
    & .nav-left {
      & .van-icon {
        margin-right: 10px;
      }
    }
    & .nav-right {
      display: flex;
      align-items: center;
      & span {
        padding-left: 6px;
        padding-right: 4px;
      }
    }
  }

  & main {
    left: 0;
    right: 0;
    top: 46px;
    position: absolute;
    height: calc(100% - 46px);
  }
}
</style>
