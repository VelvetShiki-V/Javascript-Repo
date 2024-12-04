<script setup lang="ts">
import { ref } from 'vue'
import { ArticleAdminViewVO } from '@/types/vo/ArticleAdminViewVO'
import { ArticleDetailDTO } from '@/types/dto/ArticleDetailDTO'
import { EventType } from '@/enums/DataEvent'
import { TagVO } from '@/types/vo/TagVO'
import { CategoryVO } from '@/types/vo/CategoryVO'

// 组件实例和数据初始化
const eventRef = ref(0)
const isVisible = ref(false)
const title = ref('')
const articleDetailFormRef = ref()
const articleDetailForm = ref<ArticleDetailDTO>({} as ArticleDetailDTO)
const rules = {
  articleTitle: [{ required: true, message: '标题不能为空', trigger: 'blur' }]
}

// 接收数据
defineProps({
  tags: {
    type: Array<TagVO>,
    required: true
  },
  categories: {
    type: Array<CategoryVO>,
    required: true
  }
})

// 控制抽屉显示隐藏
const drawerShow = (flag: number, row: ArticleAdminViewVO) => {
  if (flag === EventType.CREATE_EVENT) title.value = '数据新增'
  else if (flag === EventType.UPDATE_EVENT) {
    title.value = '数据更新'
  }
  eventRef.value = flag // 识别表单为新增或更新事件
  articleDetailForm.value = { ...row } // 可能存在问题
  isVisible.value = true
}

// 保存草稿
const saveDraft = () => {}
// 上传或更新文章
const saveOrUpdate = () => {}

// 对外暴露方法控制抽屉显示隐藏
defineExpose({
  drawerShow
})
const emit = defineEmits(['onSubmit'])
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

    <!--    具名底部插槽-->
    <!-- <template #footer>
      <el-button type="success" @click="saveDraft">保存草稿</el-button>
      <el-button type="primary" @click="saveOrUpdate">发布文章</el-button>
      <el-button @click="(isVisible = false)">取消</el-button>
    </template> -->
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
/* .mavon-editor {
  height: calc(100vh - 260px)
} */
</style>
