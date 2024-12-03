<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import { userAvatarUploadService } from '@/api/user.js'
import { useUserStore } from '@/stores/index'

// 组件实例和数据初始化
const userStore = useUserStore()
const eventRef = ref(0)
const isVisible = ref(false)
const title = ref('')
const formRef = ref()
const formModel = ref({
  username: null,
  password: null,
  tel: null,
  addr: null,
  profile: null,
  role: null
})
const imgRef = ref({
  url: '',
  raw: null
})
const upload = ref()
defineProps({
  list: {
    type: Array,
    required: true
  }
})
const rules = {
  username: [
    { required: true, message: '用户名必填', trigger: 'blur' },
    { min: 2, max: 16, message: '用户名必须是2-16位字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
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

// 控制抽屉显示隐藏
const drawerShow = (flag, row) => {
  if (flag === userStore.dataEvent.createEvent) title.value = '数据新增'
  else if (flag === userStore.dataEvent.updateEvent) title.value = '数据更新'
  eventRef.value = flag // 识别表单为新增或更新事件
  formModel.value = { ...row }
  // 图片预览（如果存在）
  imgRef.value.url = formModel.value.profile
  isVisible.value = true
}

// 图片上传预览
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
    upload.value.clearFiles()
    imgRef.value.url = ''
  } else if (imgRef.value.raw.size / 1024 / 1024 > 5) {
    ElMessage.error('文件不允许超过5MB')
    upload.value.clearFiles()
    imgRef.value.url = ''
  }
}
// 自动替换
const handleExceed = (newFiles) => {
  upload.value.clearFiles()
  const newFile = newFiles[0]
  newFile.uid = genFileId()
  upload.value.handleStart(newFile)
}
// 上传图片至服务器
// 单独的选择文件按钮可以让button绑定upload的点击事件: upload.$el.querySelector('input').click()，用于图片浏览
const uploadFile = async () => {
  // 图片合法，添加token上传
  const formData = new FormData()
  formData.append('file', imgRef.value.raw)
  console.log('正在上传...')
  imgRef.value.url = await userAvatarUploadService(formData)
  console.log('接收到上传图片url: ', imgRef.value.url)
  formModel.value.profile = imgRef.value.url
  ElMessage.success('上传成功')
}

// 表单提交前校验
const submitVerify = async () => {
  await formRef.value.validate()
  emit('onSubmit', eventRef.value, formModel.value)
  isVisible.value = false
}

// 对外暴露方法控制抽屉显示隐藏
defineExpose({
  drawerShow
})
const emit = defineEmits(['onSubmit'])
</script>

<template>
  <el-drawer v-model="isVisible" direction="rtl" :show-close="false">
    <!--    具名头部插槽-->
    <template #header>
      <h1 class="title">{{ title }}</h1>
    </template>

    <!--    匿名主体表单插槽-->
    <el-form ref="formRef" :model="formModel" :rules="rules">
      <!--      基本信息-->
      <el-form-item label="用户名: " label-width="100" prop="username" required>
        <el-input v-model="formModel.username" name="username" placeholder="新增用户名" />
      </el-form-item>
      <el-form-item label="密码: " prop="password" label-width="100" required>
        <el-input v-model="formModel.password" name="password" placeholder="请填写密码" />
      </el-form-item>
      <!--      多表查询表单-->
      <el-form-item label="分类: " label-width="100">
        <el-select v-model="formModel.role" style="width: 200px" clearable>
          <el-option
            v-for="category in list"
            :key="category.cid"
            :value="category.cid"
            :label="category.role" />
        </el-select>
      </el-form-item>
      <el-form-item label-width="100" label="电话: " prop="tel">
        <el-input v-model="formModel.tel" name="tel" placeholder="必填电话信息" />
      </el-form-item>
      <el-form-item label-width="100" label="住址: ">
        <el-input v-model="formModel.addr" name="addr" placeholder="选填住址信息" />
      </el-form-item>
      <!--      图片文件上传-->
      <el-form-item label-width="100" label="头像: ">
        <!--        action为默认上传至服务器，可通过URL.createObjectURL创建本地预览，再统一提交-->
        <el-upload
          ref="upload"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleChange"
          :on-exceed="handleExceed">
          <!--      文件自定义默认内容-->
          <template #default>
            <div style="width: 300px; height: 100px">
              <el-image v-if="imgRef.url" :src="imgRef.url" />
              <el-icon v-else style="height: 200px; border: 1px solid grey; width: 100%"
                ><Plus
              /></el-icon>
            </div>
          </template>
          <!--     文件提示说明文字-->
          <template #tip>
            <div class="el-upload__tip text-red">jpg/png files with a size less than 5Mb</div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>

    <!--    具名底部插槽-->
    <template #footer>
      <el-button type="info" @click="upload.$el.querySelector('input').click()">选择图片</el-button>
      <el-button type="success" @click="uploadFile">上传图片</el-button>
      <el-button type="primary" @click="submitVerify">提交</el-button>
      <el-button @click="(isVisible = false)">取消</el-button>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.title {
  font-size: 40px;
  color: #66b1ff;
}
.el-form-item {
  margin-bottom: 30px;
  .el-input {
    width: 300px;
  }
}
</style>
