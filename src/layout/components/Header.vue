<template>
  <div class="layout-header">
    <div class="left">
      <BreadCrumb />
    </div>
    <div class="right">
      <el-dropdown @visible-change="(flag: boolean) => state.dropVisible = flag">
        <div class="flex items-center">
          <el-avatar :size="35" :src="user" />
          <span style="padding:0 4px 0 8px;">{{ state.userInfo.nick }}</span>
          <el-icon class="transform transition-all" :class="{'rotate-180': state.dropVisible}" size="14">
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              注销登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import user from '@/assets/user.png'
import { reactive } from 'vue'
import { getStorage } from '@/utils'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import BreadCrumb from '@/components/bread-crumb/index.vue'

const state = reactive({
  userInfo: getStorage('user_info'),
  dropVisible: false
})

const router = useRouter()

function logout() {
  window.localStorage.removeItem('qg_token')
  router.push('/login')
}

</script>

<style lang="postcss" scoped>
.layout-header {
  height: 100%;
  display: flex;
  align-items: center;
  & > div {
    flex: 1;
  }
  & .right {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
}
</style>
