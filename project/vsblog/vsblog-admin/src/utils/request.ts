import axios from 'axios'
import router from '@/router'
import { ElLoading, ElMessage } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import type { APIResponse } from '../types/ApiResponse'

const instance = axios.create({
  baseURL: 'http://localhost:8088',
  timeout: 10000,
  // 通过 paramsSerializer 自定义查询参数的序列化方式
  // entries包含key,val组成的数组, filter过滤undefined, map创建新数组构建url
  paramsSerializer: (params) => {
    return Object.entries(params || {})
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&')
  }
})
// 允许携带Cookie
instance.defaults.withCredentials = true
// 全屏加载
let loadingInstance: LoadingInstance | null = null

const loadingClose = () => {
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }
}

// interceptors
instance.interceptors.request.use(
  (config) => {
    // 发送请求前
    if (!loadingInstance) {
      loadingInstance = ElLoading.service({
        lock: true,
        text: 'vsblog加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    // sa-token自动设置set-cookie
    return config
  },
  (error) => {
    loadingClose()
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    loadingClose()
    const res: APIResponse = response.data
    console.log('接收到服务端数据: ', res)
    if (res.flag === false) {
      ElMessage.error('操作失败: ' + res.message)
      return Promise.reject(res.message)
    }
    return res?.data
  },
  (error) => {
    loadingClose()
    ElMessage.error('内部错误: ' + error)
    return Promise.reject(error)
  }
)

export default instance
