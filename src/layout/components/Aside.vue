<template>
  <el-scrollbar class="scrollbar-wrapper">
    <div class="logo flex items-center">
      <img src="../../assets/vite_logo.png">
      <span>QG Admin</span>
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#282c34"
      :default-active="activeMenu"
      text-color="#fff"
    >
      <el-menu-item
        index="/userList"
        @click="push('/userList')"
      >
        <el-icon><UserFilled /></el-icon>
        <span>强国用户</span>
      </el-menu-item>
      <el-sub-menu v-if="isAdmin">
        <template #title>
          <el-icon><SetUp /></el-icon>
          <span>系统配置</span>
        </template>

        <el-menu-item index="/config" @click="push('/config')">
          <el-icon><Setting /></el-icon>
          <span>配置文件</span>
        </el-menu-item>
        <el-menu-item index="2-2" @click="handleRestart">
          <el-icon><Odometer /></el-icon>
          <span>面板重启</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-if="isAdmin" index="/log" @click="push('/log')">
        <el-icon><Tickets /></el-icon>
        <span>日志查看</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import {
  UserFilled,
  Tickets,
  Odometer,
  SetUp,
  Setting
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getSession } from '@/utils'
import { restart } from '@/api'

const isAdmin = ref(false)

const level = getSession('level')

if (level === 1) {
  isAdmin.value = true
}

const router = useRouter()
const route = useRoute()
const push = (path: any) => {
  router.push(path)
}

const activeMenu = computed(() => {
  const { path } = route
  return path
})

// 重启面板
function handleRestart() {
  ElMessageBox.confirm(
    '是否要重启面板?',
    '提示',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(async() => {
      const { success }: any = await restart()
      if (!success) return
      ElMessage({
        type: 'success',
        message: '面板正在重启，请稍后登录！'
      })
      router.push('/login')
    })
    .catch()
}
</script>

<style lang="postcss" scoped>
.scrollbar-wrapper {
  height: 100%;
  background-color: #282c34;
  overflow-x: hidden!important;
  .logo {
    height: 60px;
    padding: 0 20px;
    & img {
      width: 42px;
      padding-right: 4px;
    }
    & span {
      color: #fff;
    }
  }
  & .el-menu {
    border: none;
  }
}
</style>
