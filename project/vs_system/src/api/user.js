import request from '@/utils/request'

// 用户创建
const userRegisterService = async (form) => {
  console.log('用户注册信息: ', form)
  await request.post('/users/registry', form)
}
// 用户登录
const userLoginService = async (form) => {
  console.log('用户登录信息: ', form)
  return await request.post('/users/login', form) // return获取token
}
// 用户更新
const userUpdateService = async (form) => {
  console.log('用户更新信息: ', form)
  await request.put('/users', form)
}
// 用户删除
const userDeleteService = async (uids) => {
  console.log('用户待删除ids: ', uids)
  await request.delete('/users/' + uids)
}
// 用户列表查询
const getUserService = async (params) => {
  console.log('用户查询: ', params)
  return await request.get('/users', { params })
}

// 角色列表查询
const getUserCategoriesService = async (params) => {
  console.log('用户分类查询: ', params)
  return await request.get('/users/category', { params })
}
// 角色新增
const userCategoryCreateService = async (form) => {
  console.log('用户角色新增: ', form)
  await request.post('/users/category', form)
}
// 角色修改
const userCategoryUpdateService = async (form) => {
  console.log('用户角色修改: ', form)
  await request.put('/users/category', form)
}
// 角色删除
const userCategoriesDeleteService = async (cids) => {
  console.log('用户角色删除: ', cids)
  await request.delete('/users/category/' + cids)
}

// 文件上传
const userAvatarUploadService = async (formData) => {
  console.log('用户图片文件上传')
  // console.log('用户图片文件上传, 携带数据: ', formData.get('file'))
  return await request.post('/upload', formData)
  /*  完整写法: return await request.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })*/
}

export {
  userRegisterService,
  userLoginService,
  getUserService,
  userUpdateService,
  userDeleteService,
  getUserCategoriesService,
  userCategoryCreateService,
  userCategoryUpdateService,
  userCategoriesDeleteService,
  userAvatarUploadService
}
