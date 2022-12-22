<template>
  <div class="login-container h-screen flex flex-col justify-center items-center overflow-hidden">
    <div class="logo">
      <img src="../../../assets/vite_logo.png">
    </div>
    <div class="form">
      <van-cell-group inset>
        <van-field
          v-model="state.user"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          autocomplete="off"
          :rules="[{required: true, message: '请填写用户名'}]"
        />
        <van-field
          v-model="state.pwd"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          autocomplete="off"
          :rules="[{required: true, message: '请填写密码'}]"
        />
      </van-cell-group>
    </div>
    <div class="login">
      <van-button block type="primary" @click="Login">
        登录
      </van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { showNotify } from 'vant'
import { checkToken, login } from '@/api'
import { reactive } from 'vue'
import { setStorage, setSession } from '@/utils'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  user: '',
  pwd: ''
})

const Login = async() => {
  const { user, pwd } = state
  if (user.trim() === '' || pwd.trim() === '') {
    showNotify({
      type: 'warning',
      message: '用户名及密码不能为空!'
    })
  } else {
    const { code, success, message, data }: any = await login({ account: user, password: pwd })
    if (success) {
      showNotify({
        type: 'success',
        message: '登录成功!',
        duration: 1000
      })
      setStorage('qg_token', data)
      setStorage('user_info', { nick: user })
      // 获取用户等级
      const { data: level }: any = await checkToken(data)
      // 1 - admin，2 - user
      setSession('level', level)
      router.push('/')
    } else {
      showNotify({ type: 'danger', message: `${code} ${message}` })
    }
  }
}
</script>

<style lang="postcss">
.login-container {
  background-color: #ebeeef;
  padding-bottom: 150px;
  & .logo {
    width: 150px;
    margin-bottom: 32px;
  }
  & .form, & .login {
    width: 100%;
  }
  & .login {
    padding: 0 16px;
    margin-top: 28px;
  }
}
</style>
