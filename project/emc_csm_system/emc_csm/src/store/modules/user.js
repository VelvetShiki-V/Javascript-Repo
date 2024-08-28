import { storage } from '@/utils/storage'
import { emcRequest } from '@/api/crud'
// import { Loading, Message } from 'element-ui'
// let eventSource

export default {
  namespaced: true,
  state () {
    return {
      // 响应式仓库数据
      userInfo: storage.getToken()
    }
  },
  mutations: {
    fetch_token (state, userInfo) {
      // 持久化仓库数据
      storage.setToken(userInfo)
      // 存储仓库数据
      state.userInfo = storage.getToken()
    },
    remove_token (state) {
      state.userInfo = null
      storage.removeToken()
    }
  },
  actions: {
    // 验证是否管理员
    async admin_verify_async (context, loginData) {
      return await emcRequest.postAdminVerift(loginData)
    },
    // SSE登录获取token
    async fetch_token_async (context, loginData) {
      const ret = await emcRequest.postLogin(loginData)
      context.commit('fetch_token', {
        user: loginData.user,
        token: ret.data
      })
      // const load = Loading.service({
      //   lock: true,
      //   text: 'myEmc努力加载中',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      // // 创建事件流
      // const requestUrl = `https://cloud.myemc.net.cn/admin/user/login?user=${loginData.user}&password=${loginData.password}`
      // const sessionTokenPromise = new Promise((resolve, reject) => {
      //   // 监听具名事件: session/token; 若监听的event为内置值, 则可以使用onmessage进行默认监听
      //   eventSource = new EventSource(requestUrl)
      //   eventSource.addEventListener('session/token', (e) => {
      //     console.log('event: ', e)
      //     console.log('received stream data: ', e.data)
      //     context.commit('fetch_token', {
      //       user: loginData.user,
      //       token: e.data
      //     })
      //     load.close()
      //     resolve('receive token success')
      //   })
      //   // 监听错误处理
      //   eventSource.onerror = err => {
      //     console.log('stream data received false: ', err)
      //     Message.error('登录失败: SSE type error') // FIXME?
      //     load.close()
      //     eventSource.close()
      //     reject(err)
      //   }
      // })
      // // 持续监听
      // await sessionTokenPromise
    },
    // 登出: logout请求 + token清理 + 关闭监听事件
    async logout_async (context, logoutData) {
      await emcRequest.postLogout(logoutData)
    },
    // token验证
    async token_verify_async (context, postData) {
      return await emcRequest.postVerify(postData)
    }
  }
}
