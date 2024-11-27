<script setup lang="ts">
import { ref } from 'vue'
import { useArticleStore } from '@/stores'
import { Edit, Delete, CloseBold, ArrowRight } from '@element-plus/icons-vue'
import { ArticleAdmin } from '@/types/article'

// 响应式数据
const dataLoading = ref<boolean>(true)
const articleStore = useArticleStore()
const initialize = async () => {
  await articleStore.getArticlesListAsync()
  dataLoading.value = false
}
initialize()

// 方法
const handleCreateNode = () => {}
const handleLinkNode = () => {}
const handleQuery = () => {}
const handleEdit = (row: ArticleAdmin) => {
  console.log(row)
}
const handleSubmit = (row: ArticleAdmin) => {
  console.log(row)
}
const handleDelete = (row: ArticleAdmin) => {
  console.log(row)
}
</script>

<template>
  <DataContainer title="ArticleView">
    <!-- 具名插槽头部 -->
    <template #operation>
      <el-button type="warning" @click="handleLinkNode">连接结点</el-button>
      <el-button type="primary" @click="handleCreateNode">新增结点</el-button>
    </template>
    <!-- 匿名插槽主体 -->
    <!-- 面包屑路径 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/layout' }">node1</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- filter -->
    <DataSelector @on-query="handleQuery" />
  </DataContainer>
  <el-table
    v-loading="dataLoading"
    :data="modelStore.modelList"
    stripe
    style="width: 100%"
    height="400"
    :border="true"
    element-loading-text="Loading...">
    <!-- 索引-->
    <el-table-column type="index" width="50" align="center" />
    <!-- Name -->
    <el-table-column prop="Name" label="Name" width="200" align="center" />
    <!-- Owner -->
    <el-table-column prop="Owner" label="Owner" width="200" align="center" />
    <!-- Labels -->
    <el-table-column prop="Labels" label="Labels" width="200" align="center">
      <template #default="scope">
        <el-tag
          v-for="label in scope.row.Labels"
          :key="label"
          effect="dark"
          type="success"
          style="margin: 5px"
          >{{ label }}</el-tag
        >
      </template>
    </el-table-column>
    <!-- Id, Ts, Properties, Children  -->
    <el-table-column label="Extra" width="200" align="center">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div style="color: #dd6161">
              Properties: {{ scope.row.Properties }}
            </div>
            <div style="color: #0ca1a1">Modify time: {{ scope.row.Ts }}</div>
            <div style="color: #ebb563">Children: {{ scope.row.Children }}</div>
          </template>
          <template #reference>
            <el-tag>Id: {{ scope.row.Id }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <!--        操作-->
    <el-table-column label="Operations" align="center">
      <template #default="scope">
        <el-tooltip content="移除节点" placement="top">
          <el-button
            circle
            :icon="CloseBold"
            type="info"
            plain
            @click="handleEdit(DataEvent.updateEvent, scope.row)"
            @submit="handleSubmit" />
        </el-tooltip>
        <el-button
          circle
          :icon="Edit"
          type="warning"
          plain
          @click="handleEdit(DataEvent.updateEvent, scope.row)"
          @submit="handleSubmit" />
        <el-button
          circle
          :icon="Delete"
          type="danger"
          plain
          @click="handleDelete(scope.row)" />
      </template>
    </el-table-column>
  </el-table>
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
