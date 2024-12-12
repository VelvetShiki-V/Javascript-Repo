<script setup lang="ts">
import { ref } from 'vue'
import { ArticleAdminViewVO } from '@/types/vo/ArticleAdminViewVO'
import { ArticleDetailDTO } from '@/types/dto/ArticleDetailDTO'
import { EventType } from '@/enums/DataEvent'
import UploadDialog from './UploadDialog.vue'
import { uploadArticleImage } from '@/api/article'

// 组件实例和数据初始化
const urlsMap = ref<Map<string, string>>(new Map())
const uploadDialog = ref()
const eventRef = ref(0)
const isVisible = ref(false)
const title = ref('')
const articleDetailFormRef = ref()
const articleDetailForm = ref<ArticleDetailDTO>({} as ArticleDetailDTO)
const rules = {
  articleTitle: [{ required: true, message: '标题不能为空', trigger: 'blur' }]
}

// 文件图片预处理
const uploadImagesManually = async () => {
  // 匹配 <img> 标签
  const imgTagRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/g
  // 匹配 Markdown 格式图片
  const markdownImgRegex = /!\[.*?\]\((.*?)\)/g

  // 将本地图片存储为集合
  let image
  while (
    (image = imgTagRegex.exec(articleDetailForm.value.articleContent)) !== null ||
    (image = markdownImgRegex.exec(articleDetailForm.value.articleContent)) !== null
  ) {
    // images.push(image[1])
    urlsMap.value.set(image[1], '')
  }
  // 选择图片上传
  await filesSelect()
}

// 文件选择
const filesSelect = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // 创建一个隐藏的文件选择器
      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = true // 允许多文件选择
      input.accept = '.jpg,.png' // 限制文件格式

      // 设置文件选择器的事件监听
      input.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement
        if (target.files) {
          const files = Array.from(target.files)
          // 检查是否选择了目标目录下的文件（仅作展示，无法限制目录）
          files.forEach(async (file) => {
            // 建立原文件名与返回新url网址的映射
            console.log(`文件名: ${file.name}`)
            const formData = new FormData()
            formData.append('file', file)
            const url: string = await uploadArticleImage(formData)
            urlsMap.value.forEach((value, key) => {
              console.log(`key: ${key}, val: ${value}`)
              console.log('key是否包含文件名: ', key.includes(file.name))
              if (key.includes(file.name)) {
                console.log(`待替换原地址: ${key}, 新url地址: ${url}`)
                articleDetailForm.value.articleContent =
                  articleDetailForm.value.articleContent.replace(key, url)
                console.log('新的文章内容: ', articleDetailForm.value.articleContent)
              }
            })
          })
        } else {
          console.log('文件上传失败')
          resolve()
        }
        resolve()
      })
      // 手动触发文件选择器
      input.click()
    } catch (error) {
      reject(error)
    }
  })
}

// 控制抽屉显示隐藏
const drawerShow = (flag: number, row: ArticleAdminViewVO) => {
  if (flag === EventType.CREATE_EVENT) title.value = '新增文章'
  else if (flag === EventType.UPDATE_EVENT) {
    title.value = '更新文章'
  }
  eventRef.value = flag // 识别表单为新增或更新事件
  articleDetailForm.value = { ...row } // 可能存在问题
  isVisible.value = true
}

// 保存草稿按钮触发弹窗
const saveDraft = () => {}

// 上传文章按钮触发弹窗
const saveOrUpdate = () => {
  uploadDialog.value.dialogShow(articleDetailForm.value)
}

// 弹窗点击确认后向父组件传输数据
const onSubmit = () => {
  isVisible.value = false
}

// editor图片自动上传
const imageAttach = async (pos: number, $imgFile: File) => {
  console.log('接收到图片信息: ', pos, $imgFile)
  const formData = new FormData()
  formData.append('file', $imgFile)
  const url: string = await uploadArticleImage(formData)
  console.log('接收到上传图片url: ', url)
  // url替换
  articleDetailFormRef.value.$img2Url(pos, url)
  ElMessage.success('上传成功')
}

// 图片粘贴
const handlePasteImage = async (event: any) => {
  console.log(event.clipboardData.items)
}

// 父组件暴露方法
defineExpose({
  drawerShow
})
</script>

<template>
  <el-drawer v-model="isVisible" direction="rtl" :show-close="false" size="80%">
    <!--    具名头部插槽-->
    <template #header>
      <h1 class="title">{{ title }}</h1>
    </template>

    <!--    匿名主体表单插槽-->
    <el-form ref="formRef" :model="articleDetailForm" :rules="rules">
      <!--      文章标题-->
      <el-form-item label="文章标题 " label-width="100" prop="articleTitle" required>
        <el-input
          v-model="articleDetailForm.articleTitle"
          name="articleTitle"
          placeholder="请输入文章标题" />
        <div class="flex-grow"></div>
        <el-button type="success" @click="uploadImagesManually">手动上传图片</el-button>
        <el-button type="success" @click="saveDraft">保存草稿</el-button>
        <el-button type="primary" @click="saveOrUpdate">发布文章</el-button>
        <el-button type="info" @click="(isVisible = false)">取消</el-button>
      </el-form-item>

      <!-- 富文本MD编辑器 -->
      <mavon-editor
        ref="articleDetailFormRef"
        v-model="articleDetailForm.articleContent"
        style="max-height: 100%"
        @paste="handlePasteImage"
        @img-add="imageAttach" />
    </el-form>

    <UploadDialog ref="uploadDialog" @submit="onSubmit" />
  </el-drawer>
</template>

<style scoped>
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

.flex-grow {
  flex-grow: 1;
}
</style>
