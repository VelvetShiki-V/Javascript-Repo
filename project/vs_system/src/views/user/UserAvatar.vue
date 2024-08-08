<script setup>
import { ref } from 'vue'
import DataContainer from '@/components/DataContainer.vue'
import { Plus } from '@element-plus/icons-vue'
import { userAvatarUploadService } from '@/api/user.js'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const fileList = ref([
  {
    url: 'http://www.velvetshiki.cn/images/b8068960732a491a8a147d0d2e189dbd.jpg'
  },
  {
    url: 'http://www.velvetshiki.cn/images/529393c576c24fd289cbd16defcd3110.jpg'
  },
  {
    url: 'http://www.velvetshiki.cn/images/564286ece9d640f8bad12aba577f6320.jpg'
  },
  {
    url: 'http://www.velvetshiki.cn/images/69ab857d7f7b405ca883ee52ef406d62.jpg'
  },
  {
    url: 'http://www.velvetshiki.cn/images/6e55edd6a8e04492aaeb5e96589f2943.jpg'
  },
  {
    url: 'http://www.velvetshiki.cn/images/14.jpg'
  },
  {
    url: 'http://www.velvetshiki.cn/images/15.jpg'
  },
  {
    url: 'http://www.velvetshiki.cn/images/16.jpg'
  },
  {
    url: 'http://www.velvetshiki.cn/images/me.gif'
  },
  {
    url: 'http://www.velvetshiki.cn/images/19.png'
  }
])
const handleUpload = async (fileObj) => {
  if (fileObj.file.size / 1024 / 1024 > 5) return
  console.log('图片合法，正在上传, received: ', fileObj)
  const formData = new FormData()
  formData.append('file', fileObj.file)
  const url = await userAvatarUploadService(formData)
  console.log('接收到上传图片url: ', url)
  ElMessage.success('上传成功')
}
const handlePreview = (fileObj) => {
  console.log('打开了窗口: ', fileObj)
  dialogImageUrl.value = fileObj.url
  dialogVisible.value = true
}
</script>

<template>
  <DataContainer title="照片墙">
    <el-upload
      v-model:file-list="fileList"
      :http-request="handleUpload"
      list-type="picture-card"
      :on-preview="handlePreview">
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </DataContainer>
</template>
