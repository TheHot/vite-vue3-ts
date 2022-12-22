<template>
  <div class="mobile-user-list-container">
    <div v-for="user in state.tableData" class="user-card" :key="user.uid">
      <div class="nav flex justify-between items-center">
        <div>
          {{ user.nick }}
        </div>
        <div>
          <van-icon :name="user.status ? 'smile-o' : 'warning-o'" :color="user.status ? 'green' : 'red'" size="20" />
        </div>
      </div>
      <div class="box">
        <div class="box-item">
          <div>UID</div>
          <span>{{ user.uid }}</span>
        </div>
        <div class="box-item">
          <div>添加时间</div>
          <span>{{ dayjs.unix(user.login_time).format('YYYY年MM月DD日 HH:mm:ss') }}</span>
        </div>
        <div class="box-item">
          <div>挂机时长</div>
          <span>{{ dayjs().diff(dayjs.unix(user.login_time), 'day') + '天' }}</span>
        </div>
      </div>
      <div class="footer flex justify-between">
        <div v-if="user.status">
          <van-button
            :type="user.is_study ? 'warning' : 'success'"
            size="mini"
            @click="handleStudy(user.uid, user.is_study)"
          >
            {{ user.is_study ? '停止学习' : '开始学习' }}
          </van-button>
          <van-button type="primary" size="mini" @click="getScor(user.token)">
            分数查询
          </van-button>
        </div>
        <div v-else />
        <van-button type="danger" size="mini" @click="delUser(user.uid, user.nick)">
          删除
        </van-button>
      </div>
    </div>
  </div>
  <!-- 分数展示 -->
  <ShowScore :score="state.currUserScore" v-model="state.showScore" />
  <div class="add-user" @click="openPopup">
    <van-icon name="plus" size="25" />
  </div>
  <!-- 添加用户窗口 -->
  <van-popup class="qrcode" v-model:show="dialogVisible" @close="handleTimer">
    <div class="flex justify-between flex-col items-center">
      <nav class="flex justify-end" style="width: 100%;">
        <van-icon name="cross" size="20" @click="dialogVisible = false" />
      </nav>
      <div class="qrcode flex flex-col justify-between items-center flex-auto">
        <div class="flex-auto flex items-center">
          <canvas ref="qrcode" />
        </div>
        <div class="wait">
          <template v-if="waitqr">
            等待扫码中<span class="dotting" />
          </template>
          <span v-else>
            扫码完成
          </span>
        </div>
      </div>
      <div class="link" style="width: 100%;">
        <van-button block type="primary" @click="handleScheme">
          调用APP跳转登录
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
import { showConfirmDialog, showNotify } from 'vant'
import ShowScore from './components/show-score/index.vue'
import dayjs from 'dayjs'
import QRCode from 'qrcode'
import { getLink, checkQrCode, getToken, getUsers, deleteUser, getScore, study, stopStudy, getExpiredUsers } from '@/api'

// 声明响应式数据类型
interface State {
  search: string
  tableData: any
  currUserScore: string
  showScore: boolean
}

const state: State = reactive({
  search: '',
  tableData: [],
  currUserScore: '',
  showScore: false
})
const dialogVisible = ref(false)
const waitqr = ref(true)
const qrcode = ref(null)
let Timer: any = null
let scheme = ''

// 获取用户列表
const getUserList = async() => {
  const { data, success }: any = await getUsers()
  // 添加初始状态
  const userList = data.map((item: any) => {
    item.status = true
    return item
  })
  if (success) {
    state.tableData = userList
  }
  await getExpiredUserList()
}

// 获取token过期用户
const getExpiredUserList = async() => {
  const { data, success }: any = await getExpiredUsers()
  if (!success || (success && !data)) return
  // 添加初始状态
  const userList = data.map((item: any) => {
    item.status = false
    item.login_time = item.loginTime
    return item
  })
  state.tableData = state.tableData.concat(userList)
}

getUserList()

// 开始学习
async function handleStudy(uid: string, isStudy: boolean) {
  const { success }: any = isStudy ? await stopStudy(uid) : await study(uid)
  success && await getUserList()
}

// 删除用户
function delUser(uid: string, nick: string) {
  showConfirmDialog({
    title: '提示',
    message: `是否删除${nick}?`
  }).then(async() => {
    const { success }: any = await deleteUser(uid)
    if (!success) return
    showNotify({
      type: 'success',
      message: 'Delete completed'
    })
    getUserList()
  }).catch()
}

// 查询分数
type ApiString = (parmars: string) => void
const getScor: ApiString = async(token) => {
  const { data, success } = await getScore(token)
  state.currUserScore = success ? data : ''
  state.showScore = true
}

// 打开添加用户弹窗
const openPopup = async() => {
  dialogVisible.value = true
  // await qr dom render
  await nextTick()
  const canvas = qrcode.value
  // code, sign, url
  const { url, code, sign } = await getLink()
  scheme = url
  QRCode.toCanvas(canvas, url || 'Test', { margin: 0, scale: 4 })
  const check = setInterval(async() => {
    const { data, success }: any = await checkQrCode(code)
    if (success) {
      clearInterval(check)
      const token: any = await getToken(data.split('=')[1], sign)
      if (token.success) {
        showNotify({
          type: 'success',
          message: '用户添加成功！'
        })
        await getUserList()
        dialogVisible.value = false
      }
    }
  }, 5000)
  Timer = check
}

const handleTimer = () => {
  clearInterval(Timer)
}

// 判断微信环境
const isWechat = () => {
  if (/MicroMessenger/i.test(window.navigator.userAgent)) {
    return true
  } else {
    return false
  }
}

function handleScheme() {
  const element = document.createElement('a')
  element.href = 'dtxuexi://appclient/page/study_feeds?url=' + escape(scheme)
  element.click()
}

</script>

<style lang="postcss" scoped>
.mobile-user-list-container {
  & .user-card {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 6px;
    margin: 20px 16px;
    padding: 10px 16px;
    font-size: 14px;

    & .box {
      font-size: 12px;
      padding: 14px 0;

      & .box-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      & .box-item:not(:last-child) {
        padding-bottom: 8px;
      }
    }

    & .footer {}
  }
}
.add-user {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  right: 30px;
  bottom: 40px;
  cursor: pointer;
  color: #fff;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
  transition: .3s cubic-bezier(.25,.8,.5,1);
  background-color: #1989fa;
}
</style>
<style lang="postcss">
.qrcode.van-popup {
  width: 100%;
  height: 50vh;
  border-radius: 8px;
  & > div {
    height: 100%;
  }
  & nav {
    margin-top: 12px;
    padding: 0 16px;
  }
  & .qrcode, & .link {
    width: 100%;
    padding: 0 16px;
  }
  & .link {
    padding: 12px 16px;
  }
}
</style>
