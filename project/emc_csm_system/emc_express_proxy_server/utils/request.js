const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://cloud.myemc.net.cn/csm',
    headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器
instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数
    return response.data
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数
    console.log('响应失败')
    return Promise.reject(error)
})

module.exports = instance