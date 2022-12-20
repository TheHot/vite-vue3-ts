import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getStorage } from '@/utils'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

type TAxiosOption = {
    baseURL: string
    timeout: number
}

export interface IResponseData<T> {
  success: boolean
  message?:string
  data:T
  code: string
  error?:string
}

class Http {
  service: AxiosInstance
  constructor(config:TAxiosOption) {
    this.service = axios.create(config)
    this.service.defaults.withCredentials = true
    this.service.interceptors.request.use(
      (value) => {
        NProgress.start()
        if (value.headers !== undefined) {
          value.headers.Authorization = 'Bearer ' + getStorage('qg_token')
        }
        return value
      }, () => {
        console.log('请求异常')
      })
    this.service.interceptors.response.use((value) => {
      NProgress.done()
      return value
    }, (error) => {
      if (error.message === 'Request failed with status code 401') {
        window.location.hash = '/login'
      }
    })
  }

  get<T>(url: string, params?: object, _object = {}): Promise<IResponseData<T>> {
    return this.service.get(url, { params, ..._object })
  }

  post<T>(url: string, data?: object, _object:AxiosRequestConfig = {}): Promise<IResponseData<T>> {
    return this.service.post(url, data, _object)
  }

  put<T>(url: string, params?: object, _object = {}): Promise<IResponseData<T>> {
    return this.service.put(url, params, _object)
  }

  delete<T>(url: string, params?: any, _object = {}): Promise<IResponseData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
}

export default Http
