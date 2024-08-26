// axios模块(请求地址，请求相应拦截器配置)
import axios from 'axios'
import { Message, Loading } from 'element-ui'
const instance = axios.create({
  // baseURL: 'http://1.94.180.58:80',    used as test server
  baseURL: 'https://cloud.myemc.net.cn',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
})

// loading默认单例模式
let loading
// 请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 响应节流和loading, 禁止背景点击, 防止多次无效触发
  loading = Loading.service({
    lock: true,
    text: 'myEmc努力加载中',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return config
}, error => {
  // 对请求错误做些什么
  loading.close()
  Message.error(error)
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数
  loading.close()
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数
  loading.close()
  Message.error(error)
  return Promise.reject(error)
})

export default instance
