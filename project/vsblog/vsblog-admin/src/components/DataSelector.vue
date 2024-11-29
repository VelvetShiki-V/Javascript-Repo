<script setup lang="ts">
import {
  ArticleFilterDTO,
  articleFilterDTOInit
} from '@/types/dto/ConditionDTO'
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
    <el-form-item label="标题关键字">
      <el-input v-model="params.keywords" style="width: 200px" clearable />
    </el-form-item>

    <el-form-item label="分类">
      <el-select
        v-model="params.categoryId"
        style="width: 100px"
        filterable
        clearable>
        <el-option
          v-for="category in list"
          :key="category.cid"
          :value="category.cid"
          :label="category.role" />
      </el-select>
    </el-form-item>

    <el-form-item label="标签">
      <el-input v-model="params.tag" style="width: 100px" clearable />
    </el-form-item>
    <el-form-item label="状态">
      <el-select
        v-model="params.categoryId"
        style="width: 200px"
        filterable
        clearable>
        <el-option label="公开" value="1" />
        <el-option label="私密" value="2" />
        <el-option label="草稿" value="3" />
      </el-select>
    </el-form-item>
    <el-form-item label="类型">
      <el-select
        v-model="params.categoryId"
        style="width: 100px"
        filterable
        clearable>
        <el-option label="原创" value="1" />
        <el-option label="转载" value="2" />
        <el-option label="翻译" value="3" />
      </el-select>
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
