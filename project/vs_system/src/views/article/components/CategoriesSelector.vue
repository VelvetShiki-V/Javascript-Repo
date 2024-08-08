<script setup>
import { ref } from 'vue'

// 组件实例和响应式数据
defineProps({
  list: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['onQuery'])
const params = ref({
  cid: null,
  uid: null,
  username: null
})

// 重置表单
const handleReset = () => {
  params.value = {
    cid: null,
    uid: null,
    username: null
  }
  emit('onQuery', params.value)
}
</script>

<template>
  <el-form inline class="queryForm">
    <el-form-item label="Role: ">
      <el-select style="width: 200px" v-model="params.cid" filterable clearable>
        <el-option
          v-for="category in list"
          :key="category.cid"
          :value="category.cid"
          :label="category.role" />
      </el-select>
    </el-form-item>
    <el-form-item label="Username: ">
      <el-input v-model="params.username" style="width: 200px" clearable />
    </el-form-item>
    <el-form-item label="UID: ">
      <el-input v-model="params.uid" style="width: 200px" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" plain round @click="emit('onQuery', params)"
        >查询</el-button
      >
      <el-button type="success" plain round @click="handleReset"
        >重置</el-button
      >
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.queryForm {
  display: flex;
  height: 50px;
  align-items: center;
  .el-form-item {
    .el-button {
      width: 80px;
    }
  }
}
</style>
