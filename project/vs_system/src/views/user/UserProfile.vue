<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/index.js'
import _ from 'lodash'
import DataContainer from '@/components/DataContainer.vue'
import { userAvatarUploadService } from '@/api/user.js'

// 响应式数据和组件实例
const formModel = ref({})
const formRef = ref()
const uploadRef = ref()
const router = useRouter()
const userStore = useUserStore()
const rules = {
  username: [
    { required: true, message: '请填写用户名', trigger: 'blur' },
    { min: 2, max: 16, message: '用户名必须是2-16位字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请填写密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须为6-15位非空字符',
      trigger: 'blur'
    }
  ],
  tel: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号不合法', trigger: 'blur' }
  ]
}
const formChangedStatus = ref(false)
const imgRef = ref({
  url: '',
  raw: null
})

watch(
  formModel,
  (newVal) => {
    // 只能用深度遍历属性值比较，引用比较无法相等
    // console.log('equal or not', _.isEqual(userStore.user, newVal))
    if (_.isEqual(userStore.user, newVal)) formChangedStatus.value = false
    else formChangedStatus.value = true
  },
  { deep: true }
)

// 初始化
const initialize = async () => {
  formModel.value = { ...userStore.user }
  imgRef.value.url = formModel.value.profile
  await userStore.getUserCategoriesAsync({})
}
initialize()

// 图片上传相关
const handleUpload = async (obj) => {
  if (obj.file.size / 1024 / 1024 > 5) return
  console.log('图片合法，正在上传, received: ', obj)
  const formData = new FormData()
  formData.append('file', obj.file)
  imgRef.value.url = await userAvatarUploadService(formData)
  console.log('接收到上传图片url: ', imgRef.value.url)
  formModel.value.profile = imgRef.value.url
  ElMessage.success('上传成功')
}
const handleChange = (file) => {
  // 接收到文件
  imgRef.value.url = URL.createObjectURL(file.raw)
  imgRef.value.raw = file.raw
  // 验证图片合法性
  if (
    imgRef.value.raw.type !== 'image/jpg' &&
    imgRef.value.raw.type !== 'image/jpeg' &&
    imgRef.value.raw.type !== 'image/png'
  ) {
    ElMessage.error('文件格式非法')
    uploadRef.value.clearFiles()
    imgRef.value.url = formModel.value.profile
  } else if (imgRef.value.raw.size / 1024 / 1024 > 5) {
    ElMessage.error('文件不允许超过5MB')
    uploadRef.value.clearFiles()
    imgRef.value.url = formModel.value.profile
  }
}

// 表单相关
const handleSubmit = async () => {
  await formRef.value.validate()
  await userStore.setUserListAsync(
    userStore.dataEvent.updateEvent,
    formModel.value
  )
  ElMessage.success('修改成功，请重新登录')
  userStore.removeLoginUser()
  await router.push('/login')
}
const handleReset = () => {
  formModel.value = { ...userStore.user }
  imgRef.value.url = formModel.value.profile
  ElMessage.warning('重置成功')
}
</script>

<template>
  <DataContainer title="用户资料">
    <el-row>
      <el-col :span="8" :offset="4">
        <el-form :model="formModel" :rules="rules" ref="formRef">
          <el-form-item
            label="用户名: "
            label-width="100"
            required
            prop="username">
            <el-input
              clearable
              name="username"
              v-model="formModel.username"
              placeholder="更新用户名" />
          </el-form-item>
          <el-form-item
            label="密码: "
            label-width="100"
            required
            prop="password">
            <el-input
              disabled
              type="password"
              name="password"
              v-model="formModel.password"
              placeholder="更新密码" />
          </el-form-item>
          <el-form-item label="角色分类: " label-width="100">
            <el-select v-model="formModel.role" clearable>
              <el-option
                v-for="category in userStore.userCategories"
                :key="category.cid"
                :value="category.cid"
                :label="category.role"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话: " label-width="100" required prop="tel">
            <el-input
              clearable
              name="tel"
              v-model="formModel.tel"
              placeholder="更新电话信息" />
          </el-form-item>
          <el-form-item label="地址: " label-width="100">
            <el-input
              name="addr"
              v-model="formModel.addr"
              clearable
              placeholder="更新地址信息" />
          </el-form-item>
          <div class="submitArea">
            <el-button
              type="primary"
              @click="handleSubmit"
              :disabled="!formChangedStatus"
              >提交修改</el-button
            >
            <el-button
              type="warning"
              @click="handleReset"
              :disabled="!formChangedStatus"
              >取消修改</el-button
            >
          </div>
        </el-form>
      </el-col>
      <el-col :span="12" :offset="-4">
        <el-upload
          ref="uploadRef"
          :http-request="handleUpload"
          :on-change="handleChange"
          :show-file-list="false">
          <template #default>
            <el-image
              :src="imgRef.url"
              v-if="imgRef.url"
              style="width: 100%; height: 100%" />
            <el-icon
              v-else
              style="
                width: 100%;
                height: 300px;
                border: 1px solid grey;
                margin-top: 30px;
              "
              ><Plus
            /></el-icon>
          </template>
        </el-upload>
      </el-col>
    </el-row>
  </DataContainer>
</template>

<style lang="scss" scoped>
.el-col {
  overflow: hidden;
}
.el-form {
  margin-top: 30px;
  .el-form-item {
    justify-content: center;
    margin-bottom: 40px;
    .el-select {
      width: 300px;
    }
    .el-input {
      width: 300px;
    }
  }
}
.submitArea {
  margin-top: -50px;
  .el-button {
    margin: 0 30px;
  }
}
</style>
