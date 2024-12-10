<script setup lang="ts">
import { ArticleDetailDTO } from '@/types/dto/ArticleDetailDTO'
import { ArticleAdminViewVO } from '@/types/vo/ArticleAdminViewVO'
import { CategoryVO } from '@/types/vo/CategoryVO'
import { TagVO } from '@/types/vo/TagVO'
import { computed, inject, ref } from 'vue'
import { Check, Close, Plus } from '@element-plus/icons-vue'
import { ImageObject } from '@/types/dto/ImageObject'
import { genFileId, UploadFile, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { uploadArticleImage } from '@/api/article'

// 组件实例化和响应式数据
const isVisible = ref<boolean>(false)
const previewVisible = ref<boolean>(false)
const isUploaded = ref<boolean>(false)
const articlePropertiesForm = ref<ArticleAdminViewVO>({} as ArticleAdminViewVO) // 文章表单
const imgRef = ref<ImageObject>({} as ImageObject)
const upload = ref<UploadInstance>()

// 父组件数据接收(传入子方法默认类型为未知，需要显示断言)
const tags: Array<TagVO> | undefined = inject('tags')
const categories: Array<CategoryVO> | undefined = inject('categories')
const submitArticle = inject('handleSubmit') as (article: ArticleDetailDTO) => void

// 文章类型显示
const computedTypeName = computed(() => {
  switch (articlePropertiesForm.value.type) {
    case 1:
      return '原创'
    case 2:
      return '转载'
    case 3:
      return '翻译'
    default:
      return ''
  }
})

// 文章状态显示
const computedStatusName = computed(() => {
  switch (articlePropertiesForm.value.status) {
    case 1:
      return '公开'
    case 2:
      return '私密'
    case 3:
      return '草稿'
    default:
      return ''
  }
})

// 文章类型更新
const handleTypeChange = (typeId: string) => {
  articlePropertiesForm.value.type = Number(typeId)
}

// 文章状态更新
const handleStatusChange = (statusId: string) => {
  articlePropertiesForm.value.status = Number(statusId)
}

// 控制弹窗显示
const dialogShow = (row: ArticleDetailDTO) => {
  articlePropertiesForm.value = { ...row }
  isVisible.value = true
}

// 文章表单提交
const handleSubmit = async () => {
  ElMessageBox.confirm('请确认文章封面已经上传', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      submitArticle(articlePropertiesForm.value)
      isVisible.value = false
      emit('submit')
    })
    .catch(() => {})
}

// 图片上传检查
const handleChange = (file: UploadFile) => {
  // 接收到文件
  imgRef.value.url = URL.createObjectURL(file.raw as UploadRawFile)
  imgRef.value.file = file.raw as UploadRawFile
  // 验证图片合法性
  if (
    imgRef.value.file.type !== 'image/jpg' &&
    imgRef.value.file.type !== 'image/jpeg' &&
    imgRef.value.file.type !== 'image/png'
  ) {
    ElMessage.error('文件格式非法')
    upload.value!.clearFiles()
    imgRef.value.url = ''
  } else if (imgRef.value.file.size / 1024 / 1024 > 5) {
    ElMessage.error('文件不允许超过5MB')
    upload.value!.clearFiles()
    imgRef.value.url = ''
  }
  isUploaded.value = false
}

// 图片自动替换
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const newFile = files[0] as UploadRawFile
  newFile.uid = genFileId()
  upload.value!.handleStart(newFile)
}

// 上传图片至服务器
const handleUploadImage = async () => {
  const formData = new FormData()
  formData.append('file', imgRef.value.file as Blob)
  imgRef.value.url = await uploadArticleImage(formData)
  console.log('接收到上传图片url: ', imgRef.value.url)
  articlePropertiesForm.value.articleCover = imgRef.value.url
  ElMessage.success('上传成功')
  isUploaded.value = true
}

// 发送信号
const emit = defineEmits(['submit'])

// 父组件暴露方法
defineExpose({
  dialogShow
})

// 打开窗体将图片渲染
const handleOpenUpload = () => {
  imgRef.value.url = articlePropertiesForm.value.articleCover
  // console.log('文章修改表单: ', articlePropertiesForm.value)
}

// 首次创建时引入
console.log('接收到父数据categories: ', categories)
console.log('接收到父数据tags: ', tags)
</script>

<template>
  <el-dialog v-model="isVisible" title="发布文章" width="800" center @open="handleOpenUpload">
    <!--    内容主体-->
    <el-form :model="articlePropertiesForm">
      <el-form-item label="文章分类" label-width="200px" required>
        <el-select
          v-model="articlePropertiesForm.categoryName"
          style="width: 200px"
          clearable
          filterable
          placeholder="Select">
          <el-option
            v-for="category in categories"
            :key="category.id"
            :value="category.categoryName"
            :label="category.categoryName" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章标签" label-width="200px" required>
        <!-- <el-input-tag v-model="articlePropertiesForm.tagNames" /> -->
        <el-select
          v-model="articlePropertiesForm.tagNames"
          style="width: 300px"
          multiple
          :multiple-limit="3"
          clearable
          filterable
          allow-create
          tag-type="success"
          tag-effect="dark"
          :empty-values="[]"
          default-first-option
          placeholder="请选择文章标签">
          <el-option v-for="tag in tags" :key="tag.id" :value="tag.tagName" :label="tag.tagName" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章类型" label-width="200px" required>
        <el-select
          :model-value="computedTypeName"
          style="width: 300px"
          placeholder="请选择文章类型"
          @change="handleTypeChange">
          <el-option label="原创" value="1" />
          <el-option label="转载" value="2" />
          <el-option label="翻译" value="3" />
        </el-select>
      </el-form-item>
      <!-- 转载url -->
      <el-form-item
        v-if="articlePropertiesForm.type === 2 || articlePropertiesForm.type === 3"
        label="原文网址"
        label-width="200px">
        <el-input
          v-model="articlePropertiesForm.originalUrl"
          placeholder="请输入原文网址"
          style="width: 300px"
          required />
      </el-form-item>
      <el-form-item label="文章状态" label-width="200px" required>
        <el-select
          :model-value="computedStatusName"
          style="width: 300px"
          placeholder="请选择文章状态"
          @change="handleStatusChange">
          <el-option label="公开" value="1" />
          <el-option label="私密" value="2" />
          <el-option label="草稿" value="3" />
        </el-select>
      </el-form-item>
      <!-- password -->
      <el-form-item v-if="articlePropertiesForm.status === 2" label="文章密码" label-width="200px">
        <el-input
          v-model="articlePropertiesForm.password"
          placeholder="请输入文章密码"
          style="width: 300px"
          required />
      </el-form-item>
      <el-form-item label="封面" label-width="200px">
        <!--        action为默认上传至服务器，可通过URL.createObjectURL创建本地预览，再统一提交-->
        <el-upload
          ref="upload"
          style="margin-right: 30px"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleChange"
          :on-exceed="handleExceed">
          <!--      文件自定义默认内容-->
          <template #default>
            <div style="width: 300px; height: 300px">
              <el-image
                v-if="imgRef.url"
                :src="imgRef.url"
                fit="contain"
                style="width: 300px; height: 300px" />
              <el-icon
                v-else
                style="width: 300px; height: 300px; border: 1px solid grey; width: 100%"
                ><Plus
              /></el-icon>
            </div>
          </template>
          <!--     文件提示说明文字-->
          <template #tip>
            <div class="el-upload__tip text-red">jpg/png files with a size less than 5Mb</div>
          </template>
        </el-upload>
        <el-button type="primary" @click="handleUploadImage"> 上传封面 </el-button>
      </el-form-item>
      <el-form-item label="置顶" label-width="200px">
        <el-switch
          v-model="articlePropertiesForm.isTop"
          :active-value="1"
          :inactive-value="0"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close" />
      </el-form-item>
      <el-form-item label="推荐" label-width="200px">
        <el-switch
          v-model="articlePropertiesForm.isFeatured"
          :active-value="1"
          :inactive-value="0"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close" />
      </el-form-item>
    </el-form>

    <!--    footer功能-->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="(isVisible = false)">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 图片预览 -->
  <el-dialog v-model="previewVisible">
    <img w-full :src="imgRef.url" alt="Preview Image" />
  </el-dialog>
</template>

<style scoped></style>
