<template>
  <van-popup class="mobile-menu-popup" v-model:show="isShow" position="left">
    <div class="mobile-menu-container">
      <nav class="flex items-center justify-between">
        <div class="left flex items-center">
          <img src="../../../assets/vite_logo.png">
          <span>QG Admin</span>
        </div>
        <van-icon name="clear" color="#fff" @click="isShow = false" />
      </nav>
      <main>
        <div path="/userList" class="menu-item" @click="push('/userList')">
          <van-icon name="user-o" />
          <span>强国用户</span>
        </div>
        <div v-if="isAdmin" class="system">
          <div class="menu-title">
            系统
          </div>
          <div path="/config" class="menu-item" @click="push('/config')">
            <van-icon name="setting-o" />
            <span>配置文件</span>
          </div>
          <div path="/log" class="menu-item" @click="push('/log')">
            <van-icon name="records" />
            <span>日志查看</span>
          </div>
          <div path="/restart" class="menu-item" @click="handleRestart">
            <van-icon name="replay" />
            <span>面板重启</span>
          </div>
        </div>
      </main>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'
import { showConfirmDialog, showNotify } from 'vant'
import { useRouter } from 'vue-router'
import { getSession } from '@/utils'
import { restart } from '@/api'

const router = useRouter()
const isAdmin = ref(false)
const level = getSession('level')

if (level === 1) {
  isAdmin.value = true
}

const emit = defineEmits(['update:show'])

type Props = {
  show: boolean
  path: string
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
  path: ''
})

const isShow = computed({
  get() {
    return props.show
  },
  set(val) {
    emit('update:show', val)
  }
})

watch(() => props.show, (val) => {
  nextTick(() => {
    const domList = document.querySelectorAll('.menu-item')
    domList.forEach((item: any) => {
      if (item.attributes.path.value === props.path) {
        if (val) {
          item.classList.add('active')
        } else {
          item.classList.remove('active')
        }
      }
    })
  })
}, { immediate: true })

const push = (path: string) => {
  router.push(path)
  isShow.value = false
}

// 重启面板
function handleRestart() {
  showConfirmDialog({
    title: '提示',
    message: '是否要重启面板?'
  }).then(async() => {
    const { success }: any = await restart()
    if (!success) return
    showNotify({
      type: 'success',
      message: '面板正在重启，请稍后登录！'
    })
    router.push('/login')
  }).catch()
}

</script>

<style lang="postcss">
.mobile-menu-popup.van-popup {
  height: 100%;
  width: 80%;
}
</style>
<style lang="postcss" scoped>
.mobile-menu-container {
  & nav {
    box-sizing: border-box;
    height: 46px;
    padding: 0 18px;
    background-color: #3b5998;
    color: hsla(0, 0%, 100%, .75);

    & img {
      width: 40px;
      padding-right: 4px;
    }
  }

  & main {
    padding: 18px;

    & .menu-title {
      color: #869099;
      font-size: 13px;
      padding-top: 28px;
      padding-left: 10px;
      padding-bottom: 4px;
    }

    & .menu-item {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 8px 10px;
      font-size: 14px;
      font-weight: 500;
      color: #495057;
      border-radius: 4px;

      & .van-icon {
        font-size: 16px;
        color: #3b5998;
        margin-right: 10px;
      }
    }

    & .menu-item.active {
      color: #000;
      background-color: #d8e0f0;
    }
  }
}
</style>
