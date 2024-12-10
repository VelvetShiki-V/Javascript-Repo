<script setup lang="ts">
import { ref } from 'vue'
import { ArticleAdminViewVO } from '@/types/vo/ArticleAdminViewVO'
import { ArticleDetailDTO } from '@/types/dto/ArticleDetailDTO'
import { EventType } from '@/enums/DataEvent'
import UploadDialog from './UploadDialog.vue'

// 组件实例和数据初始化
const uploadDialog = ref()
const eventRef = ref(0)
const isVisible = ref(false)
const title = ref('')
const articleDetailFormRef = ref()
const articleDetailForm = ref<ArticleDetailDTO>({} as ArticleDetailDTO)
const rules = {
  articleTitle: [{ required: true, message: '标题不能为空', trigger: 'blur' }]
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
        <el-button type="success" @click="saveDraft">保存草稿</el-button>
        <el-button type="primary" @click="saveOrUpdate">发布文章</el-button>
        <el-button type="info" @click="(isVisible = false)">取消</el-button>
      </el-form-item>

      <!-- 富文本MD编辑器 -->
      <mavon-editor
        :ref="articleDetailFormRef"
        v-model="articleDetailForm.articleContent"
        style="max-height: 100%" />
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
