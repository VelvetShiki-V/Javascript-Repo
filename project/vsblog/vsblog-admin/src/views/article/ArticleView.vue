<script setup lang="ts">
import { computed, ref } from 'vue'
import { useArticleStore } from '@/stores'
import { Edit, Delete } from '@element-plus/icons-vue'
import DataContainer from '@/components/DataContainer.vue'
import DataSelector from '@/components/DataSelector.vue'
import { Check, Close } from '@element-plus/icons-vue'
import { ArticleAdminVO } from '@/types/vo/ArticleAdminVO'
import { ArticleTopFeaturedDTO, articleTopFeaturedDTOInit } from '@/types/dto/ArticleTopFeaturedDTO'
import { ConditionDTO } from '@/types/dto/ConditionDTO'
import { useTagStore } from '@/stores/modules/tag'
import { useCategoryStore } from '@/stores/modules/category'

// 响应式数据
const dataLoading = ref<boolean>(true)
const articleStore = useArticleStore()
const tagStore = useTagStore()
const categoryStore = useCategoryStore()
const topFeaturedForm = ref<ArticleTopFeaturedDTO>(articleTopFeaturedDTOInit())
const filterForm = ref<ConditionDTO>({ isDelete: 0, current: 1, size: 10 } as ConditionDTO) // 部分值初始（存在undefined）

// 计算
const computedArticleList = computed(() =>
  [...articleStore.pageArticles.records].sort((a, b) => b.id - a.id)
)

// 初始化
const initialize = async () => {
  // 页面加载即获取后台数据
  await articleStore.getArticlesListAsync(filterForm.value)
  await tagStore.getAllTagsAsync(filterForm.value)
  await categoryStore.getAllCategoriesAsync(filterForm.value)
  dataLoading.value = false
}
initialize()

// 方法
const handleCreateNode = () => {}

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

// 文章函数
const handleEdit = (row: ArticleAdminVO) => {
  console.log(row)
}
const handleSubmit = (row: ArticleAdminVO) => {
  console.log(row)
}
const handleDelete = (row: ArticleAdminVO) => {
  console.log(row)
}
const handleTopFeaturedChanged = (row: ArticleTopFeaturedDTO) => {
  console.log(row)
}
</script>

<template>
  <DataContainer title="ArticleView">
    <!-- 具名插槽头部 -->
    <template #operation>
      <el-button type="primary" @click="handleCreateNode">创建文章</el-button>
      <el-button type="success" @click="handleCreateNode">批量导入</el-button>
      <el-button type="warning" @click="handleCreateNode">批量导出</el-button>
      <el-button type="danger" @click="handleCreateNode">批量删除</el-button>
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
      :data="computedArticleList"
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
            @change="handleTopFeaturedChanged(scope.row)" />
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
            :inactive-icon="Close" />
        </template>
      </el-table-column>
      <!--        操作-->
      <el-table-column label="Operations" align="center" fixed="right" min-width="170">
        <template #default="scope">
          <el-tooltip content="编辑文章" placement="top">
            <el-button
              circle
              :icon="Edit"
              type="warning"
              plain
              @click="handleEdit(scope.row)"
              @submit="handleSubmit" />
          </el-tooltip>
          <el-tooltip content="删除文章" placement="top">
            <el-button circle :icon="Delete" type="danger" plain @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="filterForm.current"
        v-model:page-size="filterForm.size"
        :page-sizes="[5, 10, 15, 20]"
        size="large"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articleStore.pageArticles.count"
        @size-change="handleChange"
        @current-change="handleChange" />
    </div>
  </DataContainer>
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
