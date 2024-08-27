import request from '@/utils/request'

// 获取所有表名
async function postFetchAll (postData) {
  console.log('获取所有表 发送表单: ' + JSON.stringify(postData))
  return await request.post('/tables', postData)
}

// 获取单个表格结构
async function postFetchSchema (postData) {
  console.log('获取单个表结构 发送表单: ' + JSON.stringify(postData))
  return await request.post('/schema', postData)
}

// 获取单个表格数据
async function postBrowse (postData) {
  console.log('获取单个表数据 发送表单：' + JSON.stringify(postData))
  return await request.post('/browse', postData)
}

// 插入
async function postCreate (postData) {
  console.log('准备发送, payload: ' + JSON.stringify(postData))
  request.post('/set', postData)
}

// 更新
async function postUpdate (postData) {
  console.log('准备发送, payload: ' + JSON.stringify(postData))
  await request.post('/update', postData)
}

// 删除
async function postDelete (postData) {
  console.log('准备发送, payload: ' + JSON.stringify(postData))
  await request.post('/delete', postData)
}

// 登出
async function postLogout (postData) {
  console.log('logout发送表单' + JSON.stringify(postData))
  await request.post('/admin/user/logout', postData)
}

// token验证
async function postVerify (postData) {
  console.log('verify发送表单: ' + JSON.stringify(postData))
  return await request.post('/admin/user/verify', postData)
}

// 管理员验证
async function postAdminVerift (postData) {
  console.log('adminVerify发送表单: ' + JSON.stringify(postData))
  return await request.post('/admin/user/verifyadm', postData)
}

export const emcRequest = {
  postFetchAll,
  postFetchSchema,
  postCreate,
  postUpdate,
  postDelete,
  postBrowse,
  postLogout,
  postVerify,
  postAdminVerift
}
