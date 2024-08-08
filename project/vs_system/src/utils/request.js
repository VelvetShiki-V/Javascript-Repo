import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
// const baseURL = 'http://localhost:8085'
const baseURL = 'http://www.velvetshiki.cn'
const instance = axios.create({
  baseURL,
  timeout: 20000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 发送请求前
    // 1. 请求前携带仓库token
    const userStore = useUserStore()
    // console.log('请求拦截，判断是否为预检请求', config)
    // 将仓库token附加在请求头的token字段携带给服务器
    if (userStore.token) {
      config.headers.token = userStore.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数
    console.log('response data: ', response.data)
    // 响应成功：业务处理失败
    if (response.data.code === 0) {
      ElMessage.error('error: ' + response.data.msg)
      return Promise.reject(response.data.msg)
    }
    return response.data.data
  },
  function (error) {
    // 响应错误: 超出 2xx 范围的状态码都会触发该函数(处理401错误)
    ElMessage.error('响应失败: ' + error)
    return Promise.reject(error)
  }
)

export default instance
