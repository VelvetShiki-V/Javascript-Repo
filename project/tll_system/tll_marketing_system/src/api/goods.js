import request from '@/utils/request'
import { storage } from '@/utils/storage'

// 获取banner轮播图
async function fetchBanner () {
  return await request.get('/banner')
}

// 获取商品信息
async function fetchGoods () {
  return await request.get('/goods') // 必须返回，否则外部对象接收不到promise响应对象
}

// 商品加购
async function addGoods (postData) {
  return await request.post('/add_goods', {
    token: storage.getToken().token,
    uid: storage.getToken().uid,
    username: storage.getToken().username,
    gid: postData.gid,
    count: postData.count,
    supplements: postData.form
  })
}

// 获取购物车商品
async function fetchCartItems (postData) {
  return await request.post('/cart_item', postData)
}

// 购物车商品数量修改
async function goodsAmountChange (postData) {
  await request.post('/amount_change', postData)
}

// 购物车商品删除
async function removeCartItem (postData) {
  await request.post('/del_item', postData)
}

// 购物车商品多个删除
async function removeCartItemMltps (postData) {
  return await request.post('/del_multi', postData)
}

// 商品状态改变
async function itemStatusChange (postData) {
  await request.post('/status_change', postData)
}

// 商品状态全部改变
async function statusChangeAll (postData) {
  await request.post('/status_change_all', postData)
}

// 提交订单
async function payBill (postData) {
  await request.post('/pay', postData)
}

// 获取订单列表
async function fetchPaidItems (postData) {
  return await request.post('/get_paid', postData)
}

// 命名导出
export const goodsRequest = {
  fetchBanner,
  fetchGoods,
  addGoods,
  fetchCartItems,
  goodsAmountChange,
  removeCartItem,
  removeCartItemMltps,
  itemStatusChange,
  statusChangeAll,
  payBill,
  fetchPaidItems
}
