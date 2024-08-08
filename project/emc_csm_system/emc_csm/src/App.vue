<template>
  <!-- 一级路由出口 -->
  <div class="area">
    <!-- 组件保活不适用于sse长连接 -->
    <!-- <div class="area" :include="['loginIndex']"> -->
    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>
