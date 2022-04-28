import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

import { ElMessage } from 'element-plus'
import omit from 'omit'
import { useUserStore } from '@/stores/user'

export interface BaseResponseResult {
  errCode: string | number
  errMsg: string
}

const service = axios.create({
  baseURL: 'http://yapi.smart-xwork.cn/mock/100200/api/',
  timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {}
  }
  config.headers['Content-Type'] = 'application/json;charset=utf-8'

  const store = useUserStore()
  if (store.token) {
    // config.url += `${config.url?.indexOf('?') === -1 ? '?' : '&'}token=${store.token}`
    config.headers.token = store.token
  }

  console.log('request', config.method, config.url, config.data)

  return config
}, (error) => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((res: AxiosResponse<BaseResponseResult>) => {
  if (res.data.errCode === 0) {
    return omit(['errCode', 'errMsg'], res.data)
  } else {
    ElMessage({
      message: res.data.errMsg,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(res.data)
  }
},
(error) => {
  console.error(error)
  let { message } = error
  if (message === 'Network Error') {
    message = '后端接口连接异常'
  } else if (message.includes('timeout')) {
    message = '系统接口请求超时'
  } else if (message.includes('Request failed with status code')) {
    message = `系统接口${message.substr(message.length - 3)}异常`
  }

  ElMessage({
    message,
    type: 'error',
    duration: 5 * 1000,
  })
  return error
},
)

export default service

export function get<R, P>(url: string, params?: P, config?: AxiosRequestConfig): Promise<R> {
  if (params) {
    url += '?'
    for (const key in params) {
      const value = params[key]
      if (typeof value !== 'object' && value !== null && value !== undefined) {
        url += `${encodeURIComponent(key)}=${typeof value === 'string' ? encodeURIComponent(value) : value}&`
      }
    }
    url = url.substring(0, url.length - 1)
  }
  return service.get(url, config)
}

export const post = service.post.bind(service)
