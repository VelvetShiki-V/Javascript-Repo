<script setup lang="ts">
import {
  ArticleFilterDTO,
  articleFilterDTOInit
} from '@/types/dto/ArticleFilterDTO'
import { ref } from 'vue'

// 组件实例和响应式数据

const emit = defineEmits(['on-query'])
const params = ref<ArticleFilterDTO>(articleFilterDTOInit())

// 重置表单
const handleReset = () => {
  params.value = articleFilterDTOInit()
  emit('on-query', params.value)
}
</script>

<template>
  <el-form inline class="queryForm">
    <el-form-item label="文章标题: ">
      <el-input v-model="params.keywords" style="width: 200px" clearable />
    </el-form-item>

    <el-form-item label="分类: ">
      <el-select
        v-model="params.categoryId"
        style="width: 200px"
        filterable
        clearable>
        <el-option
          v-for="category in list"
          :key="category.cid"
          :value="category.cid"
          :label="category.role" />
      </el-select>
    </el-form-item>

    <el-form-item label="标签: ">
      <el-input v-model="params.tag" style="width: 100px" clearable />
    </el-form-item>
    <el-form-item label="状态: ">
      <el-input v-model="params.status" style="width: 100px" clearable />
    </el-form-item>
    <el-form-item label="类型: ">
      <el-input v-model="params.type" style="width: 100px" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" plain round @click="emit('on-query', params)"
        >查询</el-button
      >
      <el-button type="success" plain round @click="handleReset"
        >重置</el-button
      >
    </el-form-item>
  </el-form>
</template>

<style scoped>
.queryForm {
  /* margin-bottom: -15px; */
  margin: 5px;
  display: flex;
  height: 40px;
  .el-form-item {
    .el-button {
      width: 80px;
    }
  }
}
</style>
