<script lang="ts" setup>
// 父传子属性
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="container">
    <!--    具名插槽头部-->
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="flex-grow"></div>
        <slot name="operation"></slot>
      </div>
    </template>

    <!--    匿名插槽数据主体-->
    <slot><el-empty :image-size="150" /></slot>
  </el-card>
</template>

<style scoped lang="scss">
.container {
  max-width: 100%;
  max-height: 700px;
  overflow: hidden;

  .header {
    display: flex;
    align-items: center;
    height: 50px;

    .flex-grow {
      flex-grow: 1;
    }

    span {
      font-size: 30px;
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
