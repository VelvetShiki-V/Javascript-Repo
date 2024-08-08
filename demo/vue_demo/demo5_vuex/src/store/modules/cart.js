import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
    // 异步获取数据
      list: []
    }
  },
  mutations: {
    update_list (state, newList) {
      state.list = newList
    },
    // mutations和actions仅能接收一个参数
    update_count (state, obj) {
      state.list.find(item => item.id === obj.id).count = obj.count
    },
    del (state, id) {
      state.list = state.list.filter(item => item.id !== id)
    },
    del_all (state) {
      if (confirm('你确定要删除所有吗?')) state.list = []
    },
    modify (state, id) {
      state.list.find(item => item.id === id).isChecked = !(state.list.find(item => item.id === id).isChecked)
    },
    modify_all (state, flag) {
      state.list.forEach(item => { item.isChecked = flag })
    }
  },
  actions: {
    // 获取列表
    async get_list (context) {
      await axios.get('http://localhost:3000/cart').then(result => context.commit('update_list', result.data))
    },
    // 修改数量
    async update_count_async (context, obj) {
      // 利用axios.patch将指定id对象的count属性值更改为新值(请求参数id + 参数为需要修改的属性新值)
      // await axios.patch(`http://localhost:3000/cart/${obj.id}`, { count: obj.count })
      // 异步远程更新后再更新本地
      context.commit('update_count', obj)
    }
  },
  getters: {
    isAll (state) {
      return state.list.every(item => item.isChecked === true)
    },
    // 计算商品总数(也可以用getters提供)
    all (state) {
      return state.list.reduce((sum, cur) => sum + cur.count, 0) || 0
    },
    // 已选商品数
    selected (state) {
      return state.list.reduce((sum, cur) => {
        if (cur.isChecked) return sum + cur.count
        else return sum
      }, 0)
    },
    // 总金额
    total (state) {
      return state.list.reduce((sum, cur) => {
        if (cur.isChecked) return sum + cur.count * cur.price
        return sum
      }, 0)
    }
  }
}
