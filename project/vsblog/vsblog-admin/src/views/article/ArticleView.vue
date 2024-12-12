<script setup lang="ts">
import { provide, ref } from 'vue'
import { useArticleStore } from '@/stores'
import { Edit, Delete } from '@element-plus/icons-vue'
import DataContainer from '@/components/DataContainer.vue'
import DataSelector from '@/views/article/components/DataSelector.vue'
import { Check, Close } from '@element-plus/icons-vue'
import { ArticleAdminVO } from '@/types/vo/ArticleAdminVO'
import { ArticleTopFeaturedDTO } from '@/types/dto/ArticleTopFeaturedDTO'
import { ConditionDTO } from '@/types/dto/ConditionDTO'
import { useTagStore } from '@/stores/modules/tag'
import { useCategoryStore } from '@/stores/modules/category'
import { saveOrUpdateArticle, updateTopFeaturedArticleById } from '@/api/article'
import { EventType } from '@/enums/DataEvent'
import { ArticleAdminViewVO } from '@/types/vo/ArticleAdminViewVO'
import FormDrawer from './components/FormDrawer.vue'
import { ArticleDetailDTO } from '@/types/dto/ArticleDetailDTO'
import { UploadFile, UploadInstance } from 'element-plus'
import { ArticleObject } from '@/types/dto/ArticleObject'

// 响应式数据
const uploadRef = ref<UploadInstance>()
const articleImportRef = ref<ArticleObject>({} as ArticleObject)
const articleDrawerRef = ref()
const dataLoading = ref<boolean>(true)
const articleStore = useArticleStore()
const tagStore = useTagStore()
const categoryStore = useCategoryStore()
const filterForm = ref<ConditionDTO>({ isDelete: 0, current: 1, size: 10 } as ConditionDTO) // 部分值初始（存在undefined）

// 初始化
const initialize = async () => {
  // 页面加载即获取后台数据
  await articleStore.getArticlesListAsync(filterForm.value)
  await tagStore.getAllTagsAsync(filterForm.value)
  await categoryStore.getAllCategoriesAsync(filterForm.value)
  dataLoading.value = false
}
initialize()

// 子孙组件数据提供
provide('tags', tagStore.pageTags.records)
provide('categories', categoryStore.pageCategories.records)

// 筛选函数
const handleQuery = async (form: ConditionDTO) => {
  filterForm.value = { ...filterForm.value, ...form }
  console.log('收到了条件表单: ', filterForm.value)
  await articleStore.getArticlesListAsync(filterForm.value)
}
const handleReset = async (form: ConditionDTO) => {
  filterForm.value = { ...form }
  await articleStore.getArticlesListAsync(filterForm.value)
}
// 分页函数
const handleChange = async () => {
  console.log('条件表单: ', filterForm.value)
  await articleStore.getArticlesListAsync(filterForm.value)
}

// 导入文章
const handleImport = async (file: UploadFile) => {
  // 分别获取文件名称作为title, 并获取文件内容作为content
  const fileName = file.name
  const fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
  articleImportRef.value.title = fileName.substring(0, fileName.lastIndexOf('.'))
  // 判断文件是否为文本类型
  if (fileType !== 'md' && fileType !== 'txt' && fileType !== 'html') {
    ElMessage.error('导入文章类型不支持! 导入类型为: ' + fileType)
    return
  }
  try {
    articleImportRef.value.content = await file!.raw!.text()
  } catch (error) {
    ElMessage.error('文件内容导入失败' + error)
    return
  }
  // 传入抽屉
  ElMessage.success('文件导入成功')
  articleDrawerRef.value.drawerShow(EventType.CREATE_EVENT, {
    articleTitle: articleImportRef.value.title,
    articleContent: articleImportRef.value.content
  } as ArticleAdminViewVO)
}

// 批量导出
const handleBatchExport = () => {}

// 批量删除
const handleBatchDelete = () => {}

// 新增文章
const handleCreate = () => {
  articleDrawerRef.value.drawerShow(EventType.CREATE_EVENT, {} as ArticleAdminViewVO)
}

// 编辑文章
const handleEdit = async (row: ArticleAdminVO) => {
  try {
    await articleStore.getArticleByIdAsync(row.id)
  } catch (e) {
    ElMessage('根据Id获取文章失败' + e)
  }
  articleDrawerRef.value.drawerShow(EventType.UPDATE_EVENT, articleStore.idArticle)
}

// 文章发布
const handleSubmit = async (article: ArticleDetailDTO) => {
  await saveOrUpdateArticle(article)
  console.log('待更新文章表单: ', article)
  // 刷新页面
  await articleStore.getArticlesListAsync(filterForm.value)
}
provide('handleSubmit', handleSubmit)

const handleDelete = (row: ArticleAdminVO) => {
  console.log(row)
}

// 推荐或置顶开关
const handleTopFeaturedChanged = async (row: ArticleAdminVO, type: number) => {
  const topFeaturedForm = ref<ArticleTopFeaturedDTO>({
    id: row.id,
    isFeatured: row.isFeatured,
    isTop: row.isTop
  })
  if (type === 1) topFeaturedForm.value.isFeatured = row.isFeatured === 1 ? 0 : 1
  else if (type === 2) topFeaturedForm.value.isTop = row.isTop === 1 ? 0 : 1
  try {
    await updateTopFeaturedArticleById(topFeaturedForm.value)
  } catch {
    ElMessage.error('推荐或置顶文章失败')
  }
  // 刷新页面
  await articleStore.getArticlesListAsync(filterForm.value)
}
</script>

<template>
  <DataContainer title="ArticleView">
    <!-- 具名插槽头部 -->
    <template #operation>
      <el-button type="primary" @click="handleCreate">创建文章</el-button>
      <el-upload
        ref="uploadRef"
        :on-change="handleImport"
        :show-file-list="false"
        :auto-upload="false">
        <el-button type="success">导入文章</el-button>
      </el-upload>
      <el-button type="warning" @click="handleBatchExport">批量导出</el-button>
      <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
    </template>

    <!-- 匿名插槽主体 -->
    <!-- filter -->
    <DataSelector
      :categories="categoryStore.pageCategories.records"
      :tags="tagStore.pageTags.records"
      @on-query="handleQuery"
      @on-reset="handleReset" />

    <!-- table -->
    <el-table
      v-loading="dataLoading"
      :data="articleStore.pageArticles.records"
      stripe
      style="width: 100%"
      height="500"
      :border="true"
      element-loading-text="Loading...">
      <!-- 索引-->
      <el-table-column type="index" width="50" align="center" label="No." />
      <el-table-column label="封面" width="300" align="center">
        <template #default="{ row }">
          <el-image
            style="width: 280px; height: 150px"
            :src="row.articleCover"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[row.articleCover]"
            :close-on-press-escape="true"
            preview-teleported
            fit="cover" />
        </template>
      </el-table-column>
      <el-table-column prop="articleTitle" label="标题" width="200" align="center" />
      <el-table-column prop="categoryName" label="分类" width="200" align="center" />
      <el-table-column prop="tagDTOs" label="标签" width="170" align="center">
        <template #default="scope">
          <el-tag
            v-for="tag in scope.row.tagDTOs"
            :key="tag"
            effect="dark"
            type="success"
            style="margin: 5px"
            >{{ tag.tagName }}</el-tag
          >
        </template>
      </el-table-column>
      <!-- Id, Ts, Properties, Children  -->
      <el-table-column label="其他信息" width="200" align="center">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div style="color: #dd6161">文章类型: {{ scope.row.type }}</div>
              <div style="color: #0ca1a1">发布时间: {{ scope.row.createTime }}</div>
              <div style="color: #ebb563">id: {{ scope.row.id }}</div>
            </template>
            <template #reference>
              <el-tag>浏览量: {{ scope.row.viewsCount || scope.row.id }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="isTop" label="置顶" width="200" align="center">
        <template #default="scope">
          <el-switch
            :model-value="scope.row.isTop === 1"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
            @change="handleTopFeaturedChanged(scope.row, 2)" />
        </template>
      </el-table-column>
      <el-table-column prop="isFeatured" label="推荐" width="200" align="center">
        <template #default="scope">
          <el-switch
            :model-value="scope.row.isFeatured === 1"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
            @change="handleTopFeaturedChanged(scope.row, 1)" />
        </template>
      </el-table-column>
      <!--        操作-->
      <el-table-column label="Operations" align="center" fixed="right" min-width="170">
        <template #default="scope">
          <el-tooltip content="编辑文章" placement="top">
            <el-button circle :icon="Edit" type="warning" plain @click="handleEdit(scope.row)" />
          </el-tooltip>
          <el-tooltip content="删除文章" placement="top">
            <el-button circle :icon="Delete" type="danger" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="filterForm.current"
      v-model:page-size="filterForm.size"
      :hide-on-single-page="false"
      :page-sizes="[5, 10, 15, 20]"
      size="large"
      :background="true"
      :disabled="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="articleStore.pageArticles.count"
      @size-change="handleChange"
      @current-change="handleChange" />
  </DataContainer>
  <!--  抽屉-->
  <FormDrawer ref="articleDrawerRef"> </FormDrawer>
</template>

<style scoped>
.el-pagination {
  margin-top: 20px;
  height: 30px;
}

.el-breadcrumb {
  line-height: 20px;
  height: 20px;
  margin: -10px 0 10px;
  background-color: rgba(234, 234, 234, 0.855);
}
</style>
