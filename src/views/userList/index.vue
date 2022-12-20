<template>
  <div class="user-list-container">
    <div class="nav">
      <div class="search">
        <el-input
          v-model="state.search"
          placeholder="Search"
          :suffix-icon="Search"
          @input="query"
        />
        <el-button @click="query">
          查询
        </el-button>
        <el-button type="primary" @click="openDrawer">
          添加用户
        </el-button>
      </div>
      <div class="btn" />
    </div>
    <el-divider />
    <main>
      <el-table :data="state.tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="nick" label="昵称" width="180" />
        <el-table-column prop="uid" label="UID" width="180" />
        <el-table-column prop="uid" label="添加日期" width="200">
          <template #default="{row}">
            {{ dayjs.unix(row.login_time).format('YYYY年MM月DD日 HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="login_time"
          align="center"
          label="时长"
          width="120"
        >
          <template #default="{row}">
            {{ dayjs().diff(dayjs.unix(row.login_time), 'day') + '天' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          label="状态"
          width="120"
        >
          <template #default="{row}">
            <el-tag class="ml-2" effect="dark" :type="row.status ? 'success' : 'danger'">
              {{ row.status ? '正常' : '失效' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户操作" min-width="260">
          <template #default="{row}">
            <el-button
              v-if="row.status"
              size="small"
              :type="row.is_study ? 'danger' : 'success'"
              @click="handleStudy(row.uid, row.is_study)"
            >
              {{ row.is_study ? '停止学习' : '开始学习' }}
            </el-button>
            <el-button
              v-if="row.status"
              type="primary"
              size="small"
              @click="getScor(row.token)"
            >
              分数查询
            </el-button>
            <el-button type="danger" size="small" @click="delUser(row.uid, row.nick)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
  </div>
  <!-- QRCode Dialog -->
  <el-dialog
    v-model="dialogVisible"
    width="400px"
    top="20vh"
    title="QG_APP扫码登录"
    center
    @close="handleTimer"
  >
    <div class="flex justify-center flex-col items-center">
      <canvas ref="qrcode" />
      <div class="wait">
        <template v-if="waitqr">
          等待扫码中<span class="dotting" />
        </template>
        <span v-else>
          扫码完成
        </span>
      </div>
    </div>
  </el-dialog>
  <!-- 分数展示 -->
  <ShowScore :score="state.currUserScore" v-model="state.showScore" />
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { reactive, ref, nextTick } from 'vue'
import dayjs from 'dayjs'
import Debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import { getLink, checkQrCode, getToken, getUsers, deleteUser, getScore, study, stopStudy, getExpiredUsers } from '@/api'
import QRCode from 'qrcode'
import ShowScore from './components/show-score/index.vue'

// 声明响应式数据类型
interface State {
  search: string
  tableData: object[]
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
const qrcode = ref(null)
const waitqr = ref(true)
let _tableData: any = []
let Timer: any = null

// 获取用户列表
const getUserList = async() => {
  const { data, success }: any = await getUsers()
  // 添加初始状态
  const userList = data.map((item: any) => {
    item.status = true
    return item
  })
  if (success) {
    _tableData = cloneDeep(userList)
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
  _tableData = cloneDeep(_tableData.concat(userList))
  state.tableData = state.tableData.concat(userList)
}

getUserList()

// 查询分数
type ApiString = (parmars: string) => void
const getScor: ApiString = async(token) => {
  const { data, success } = await getScore(token)
  state.currUserScore = success ? data : ''
  state.showScore = true
}

// 查询用户列表
const query = Debounce((str: string) => {
  state.tableData = !str.trim()
    ? _tableData
    : _tableData.filter((data: any) => data.nick.includes(str))
}, 500)

// 添加用户
const openDrawer = async() => {
  dialogVisible.value = true
  // await qr dom render
  await nextTick()
  const canvas = qrcode.value
  // code, sign, url
  const { url, code, sign } = await getLink()
  QRCode.toCanvas(canvas, url || 'Test', { margin: 0, scale: 6 })
  const check = setInterval(async() => {
    const { data, success }: any = await checkQrCode(code)
    if (success) {
      clearInterval(check)
      const token: any = await getToken(data.split('=')[1], sign)
      if (token.success) {
        ElMessage.success('用户添加成功！')
        await getUserList()
        dialogVisible.value = false
      }
    }
  }, 5000)
  Timer = check
}

// 删除用户
function delUser(uid: string, nick: string) {
  ElMessageBox.confirm(
    `是否删除${nick}?`,
    '提示',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(async() => {
      const { success }: any = await deleteUser(uid)
      if (!success) return
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
      getUserList()
    })
    .catch()
}

// 开始学习
async function handleStudy(uid: string, isStudy: boolean) {
  const { success }: any = isStudy ? await stopStudy(uid) : await study(uid)
  success && await getUserList()
}

const handleTimer = () => {
  clearInterval(Timer)
}

</script>

<style lang="postcss" scoped>
.user-list-container {
  height: 100%;
  background-color: #fff;
  padding: 20px;

  & .nav {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &>div {
      flex: 1;
    }

    & .search {
      display: flex;
      align-items: center;

      & .el-input {
        width: 200px;
        margin-right: 20px;
      }
    }

    & .btn {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
    }
  }
}

.wait {
  color: green;
  font-size: 16px;
  margin-top: 20px;
}
</style>
