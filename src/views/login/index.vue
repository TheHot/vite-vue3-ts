<template>
  <div class="login-container h-screen flex justify-center items-center overflow-hidden">
    <el-card class="login-card">
      <template #header>
        <div class="header text-center">
          <span>Login Form</span>
        </div>
      </template>
      <div class="login-form flex flex-col justify-between">
        <div class="form">
          <el-input v-model="state.user" placeholder="用户名" :prefix-icon="User" />
          <el-input
            v-model="state.pwd"
            placeholder="密码"
            :prefix-icon="Lock"
            show-password
            @keyup.enter="Login"
          />
        </div>
        <el-button type="primary" size="large" @click="Login">
          登录
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { Lock, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { checkToken, login } from '@/api'
import { reactive } from 'vue'
import { setStorage, setSession } from '../../utils'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  user: '',
  pwd: ''
})

const Login = async() => {
  const { user, pwd } = state
  if (user.trim() === '' || pwd.trim() === '') {
    ElMessage.error('用户名及密码不能为空!')
  } else {
    const { code, success, message, data }: any = await login({ account: user, password: pwd })
    if (success) {
      ElMessage.success('登录成功!')
      setStorage('qg_token', data)
      setStorage('user_info', { nick: user })
      // 获取用户等级
      const { data: level }: any = await checkToken(data)
      // 1 - admin，2 - user
      setSession('level', level)
      router.push('/')
    } else {
      ElMessage.error(`${code} ${message}`)
    }
  }
}

</script>

<style lang="postcss">
.login-container {
  background-color: #ebeeef;

  & .login-card {
    flex-direction: column;
    width: 340px;
    margin-top: -30px;
    & .header {
      padding: 18px 20px;
      height: 80px;
      line-height: 44px;
      font-size: 26px;
      color: #fff;
      background-color: rgb(3 55 156 / 40%);
    }
    & .login-form {
      height: 150px;
      & .form > div {
        padding-bottom: 18px;
      }
    }
    & .el-card__header {
      padding: 0;
      background-image: url('../../assets/login_form.jpg');
      background-repeat: no-repeat;
      background-size: 100%;
    }
  }
}
</style>
