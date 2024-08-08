import { goodsRequest } from '@/api/goods.js'

export default {
  namespaced: true,
  state () {
    return {
      banner: [], // 主页banner图列表
      list: [], // 主页商品信息列表
      cartItems: [], // 用户购物车商品信息列表
      bill: [] // 已付款账单列表
    }
  },
  mutations: {
    // 根据异步获取到的后台数据，同步更新vuex本地仓库数据
    get_banner (state, data) {
      state.banner = data
    },
    get_goods_list (state, data) {
      state.list = data
    },
    get_cart_items (state, data) {
      state.cartItems = data
    },
    get_bill (state, data) {
      state.bill = data
    }
  },
  actions: {
    // 此类方法查询后台数据并同步到本地vuex中
    // 获取banner列表(主页渲染)
    async get_banner_async (context) {
      const obj = await goodsRequest.fetchBanner()
      // 将获取到的最新列表数据同步更新到仓库banner中
      context.commit('get_banner', obj.data)
    },
    // 获取所有商品列表(主页渲染)
    async get_list_async (context) {
      const obj = await goodsRequest.fetchGoods()
      // 将获取到的最新列表数据同步更新到仓库list中
      context.commit('get_goods_list', obj.data)
    },
    // 获取用户购物车列表(购物车渲染)
    async get_cart_items_async (context, postData) {
      const obj = await goodsRequest.fetchCartItems(postData)
      // 将获取到的最新列表数据同步更新到仓库cartItems中
      context.commit('get_cart_items', obj.data)
    },
    // 获取已付款订单列表
    async get_bill_async (context, postData) {
      const obj = await goodsRequest.fetchPaidItems(postData)
      context.commit('get_bill', obj.data)
    },
    // 此类方法仅对后台数据操作，但需要配合上述查询方法将后台最新数据同步到本地vuex中
    // 加购商品
    async add_goods_async (context, postData) {
      await goodsRequest.addGoods(postData)
    },
    // 商品数量改变
    async goods_amount_change_async (context, postData) {
      await goodsRequest.goodsAmountChange(postData)
    },
    // 移除某个商品
    async remove_cart_item_async (context, postData) {
      await goodsRequest.removeCartItem(postData)
    },
    // 移除多个商品(带返回值)
    async remove_multi_items_async (context, postData) {
      return await goodsRequest.removeCartItemMltps(postData)
    },
    // 商品状态改变(checkbox)
    async item_status_change_async (context, postData) {
      await goodsRequest.itemStatusChange(postData)
    },
    // 商品所有状态改变(checkbox)
    async items_status_all_change_async (context, postData) {
      await goodsRequest.statusChangeAll(postData)
    },
    // 提交订单
    async pay_bill_async (context, postData) {
      await goodsRequest.payBill(postData)
    }
  }
}
