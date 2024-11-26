import axios from "axios";
// import router from '../router'
// import store from '../store'
import type { APIResponse } from "../types/response";

const instance = axios.create({
    baseURL: 'http://velvetshiki.com:8088',
    timeout: 10000
})

// interceptors
instance.interceptors.request.use(config => {
    console.log("发起请求携带token: ", config.params('Cookie'))
    return config
}, error => Promise.reject(error))

instance.interceptors.response.use(response => {
    const res: APIResponse = response.data
    console.log("接收到服务端数据: ", res)
    switch (res.data.code) {
        case 401:
            console.log("用户未登录")
            router.push({ path: '/login'})
            break
        case 500:
            console.log('服务器内部错误: ', res.data.message);
            break
    }
    return res.data
}, error => Promise.reject(error))

export default instance