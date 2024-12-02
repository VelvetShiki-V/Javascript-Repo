<script setup lang="ts">
import { ConditionDTO } from '@/types/dto/ConditionDTO'
import { CategoryVO } from '@/types/vo/CategoryVO'
import { TagVO } from '@/types/vo/TagVO'
import { ref } from 'vue'

// 组件实例和响应式数据
defineProps({
  categories: {
    type: Array<CategoryVO>,
    required: true
  },
  tags: {
    type: Array<TagVO>,
    required: true
  }
})
const emit = defineEmits(['on-query', 'on-reset'])
const params = ref<ConditionDTO>({} as ConditionDTO)

// 重置表单
const handleReset = () => {
  params.value = { isDelete: 0, current: 1, size: 10 } as ConditionDTO
  emit('on-reset', params.value)
}
</script>

<template>
  <el-form inline class="queryForm">
    <el-form-item label="标题关键字">
      <el-input
        v-model="params.keywords"
        style="width: 200px"
        clearable
        placeholder="Select"
        @change="emit('on-query', params)" />
    </el-form-item>

    <el-form-item label="分类">
      <el-select
        v-model="params.categoryId"
        style="width: 100px"
        clearable
        placeholder="Select"
        @change="emit('on-query', params)">
        <el-option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
          :label="category.categoryName" />
      </el-select>
    </el-form-item>

    <el-form-item label="标签">
      <el-select
        v-model="params.tagId"
        style="width: 100px"
        clearable
        placeholder="Select"
        @change="emit('on-query', params)">
        <el-option v-for="tag in tags" :key="tag.id" :value="tag.id" :label="tag.tagName" />
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-select
        v-model="params.status"
        style="width: 100px"
        clearable
        placeholder="Select"
        @change="emit('on-query', params)">
        <el-option label="公开" value="1" />
        <el-option label="私密" value="2" />
        <el-option label="草稿" value="3" />
      </el-select>
    </el-form-item>
    <el-form-item label="类型">
      <el-select
        v-model="params.type"
        style="width: 100px"
        clearable
        placeholder="Select"
        @change="emit('on-query', params)">
        <el-option label="原创" value="1" />
        <el-option label="转载" value="2" />
        <el-option label="翻译" value="3" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="success" plain round @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.queryForm {
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
