import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import { useUserStore } from '@/stores'
import router from '@/router'
const baseURL = 'http://localhost:8085'
let loadingInstance: LoadingInstance | null = null

// 类型声明
interface ApiResponse<T = any> {
  code: number
  data: T
  msg: string
}

const instance = axios.create({
  baseURL,
  timeout: 10000
})

const loadingClose = () => {
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }
}

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 发送请求前
    if (!loadingInstance) {
      loadingInstance = ElLoading.service({
        lock: true,
        text: 'gms加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    // 1. 请求前携带仓库token
    const userStore = useUserStore()
    // 将仓库token附加在请求头的token字段携带给服务器
    if (userStore.token) {
      // TODO: config.headers.Authorization = `Bearer ${token}`
      config.headers.Authorization = userStore.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    loadingClose()
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    const res: ApiResponse = response.data
    // 2xx 范围内的状态码都会触发该函数
    console.log('response data: ', res)

    // 响应成功：业务处理失败
    if (res.code === 0) {
      ElMessage.error('error: ' + res.msg)
      loadingClose()
      return Promise.reject(res.msg)
    }

    // 响应成功
    loadingClose()
    return res.data
  },
  function (error) {
    const userStore = useUserStore()
    const code: number = error.response.status
    const msg: string = error.response.data.msg
    // 响应错误: 超出 2xx 范围的状态码都会触发该函数(处理401错误)
    console.log('响应错误码: ', error.response.status)
    console.log('响应错误信息: ', error)
    if (code === 502 || code === 500) {
      ElMessage.error('服务错误: ' + error)
    } else if (code === 401) {
      ElMessage.error('401token失效: ' + msg)
      userStore.removeLoginUser()
      router.replace('/login')
    } else if (code === 403) {
      userStore.removeLoginUser()
      ElMessage.error(code + msg)
    }
    loadingClose()
    return Promise.reject(error)
  }
)

export default instance
