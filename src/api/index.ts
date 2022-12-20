import Http from './request'
import { getStorage } from '@/utils'

const http = new Http({
  baseURL: '/',
  timeout: 30000
})

const base = import.meta.env.VITE_APP_BASE_URL

/** 用户接口 */

export async function getLink() {
  const data:any = await http.get(base + '/sign/')
  const resp: any = await http.get(base + '/login/user/qrcode/generate')
  const codeURL = 'https://login.xuexi.cn/login/qrcommit?showmenu=false&code=' +
    resp.data.result + '&appId=dingoankubyrfkttorhpou'
  return { url: codeURL, sign: data.data.data.sign, code: resp.data.result }
}

export async function checkToken(token: string) {
  if (token === null) {
    return false
  }
  const { data } = await http.post(base + '/auth/check/' + token)
  return data
}

export async function login(data: any) {
  const responseData = await http.post(base + '/auth/login', data)
  return responseData.data
}

export async function checkQrCode(code: any) {
  const data = new FormData()
  data.append('qrCode', code)
  data.append('goto', 'https://oa.xuexi.cn')
  data.append('pdmToken', '')
  const resp = await http.post(base + '/login/login/login_with_qr', data, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
  return resp.data
}

export async function getToken(code: any, sign: any) {
  const token = getStorage('qg_token')
  const resp = await http.post(base + '/user?register_id=' + token, {
    code,
    state: sign
  })
  return resp.data
}

export async function deleteUser(uid: string) {
  const resp = await http.delete(base + '/user?uid=' + uid)
  return resp.data
}

export async function getUsers() {
  const resp = await http.get(base + '/user')
  return resp.data
}

export async function getExpiredUsers() {
  const resp = await http.get(base + '/user/expired')
  return resp.data
}

type Data = {
  success: boolean
  data: string
  code: number
}
interface ReturnData {
  data: Data
}
export async function getScore(token: string): Promise<Data> {
  const resp: ReturnData = await http.get(base + '/score?token=' + token)
  return resp.data
}

export async function study(uid: string) {
  const resp = await http.post(base + '/study?uid=' + uid)
  return resp.data
}

export async function stopStudy(uid: string) {
  const resp = await http.post(base + '/stop_study?uid=' + uid)
  return resp.data
}

/** 面板配置 */

export async function getConfig() {
  const resp = await http.get(base + '/config/file')
  return resp.data
}

export async function restart() {
  const resp = await http.post(base + '/restart')
  return resp.data
}

export async function saveConfig(data: string) {
  const resp = await http.post(base + '/config/file', {
    data
  })
  return resp.data
}

export async function getLog() {
  const resp = await http.get(base + '/log')
  return resp.data
}
