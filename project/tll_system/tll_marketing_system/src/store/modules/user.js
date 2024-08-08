import { userRequest } from '@/api/register'
import { storage } from '@/utils/storage'

// vuex刷新会丢失，需要持久化存储（类localStorage）
export default {
  namespaced: true,
  state () {
    return {
      // 每个页面都需要使用用户数据
      userInfo: storage.getToken()
    }
  },
  mutations: {
    // 将异步获取的用户信息存入vuex本地仓库
    fetch_token (state, userInfo) {
      // 持久化仓库数据
      storage.setToken(userInfo)
      // 存储仓库数据
      state.userInfo = storage.getToken()
    },
    // 清理本地用户数据: vuex仓库信息 + localStorage用户信息缓存
    remove_token (state) {
      state.userInfo = null
      storage.removeToken()
    }
  },
  actions: {
    // 登录成功异步获取token
    async fetch_token_async (context, postData) {
      const res = await userRequest.postLogin(postData)
      context.commit('fetch_token', {
        // 将响应data关键信息存入
        uid: res.uid,
        token: res.token,
        username: res.username
      })
    }
  }
}
