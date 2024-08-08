<script setup>
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location } from '@element-plus/icons-vue'
import { ArrowDown, HotWater } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'

// 顶部高亮导航
const activeIndex = ref('1')

// 实例化
const userStore = useUserStore()
const router = useRouter()

// 下拉导航点击事件
const handleCommand = async (path) => {
  if (path === '/login') {
    await ElMessageBox.confirm('将退出登录，是否继续', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    // 如果登出，则清空本地存储信息
    userStore.removeLoginUser()
  }
  await router.push(path)
}

const goToLink = (url) => {
  window.location.href = url
}
</script>

<template>
  <el-container>
    <!--    侧边导航-->
    <el-aside width="250px">
      <div class="logo">
        <img src="http://www.velvetshiki.cn/images/me.gif" alt="" />
      </div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
        router>
        <el-menu-item index="1" route="/article/categories">
          <el-icon><location /></el-icon>
          <span>角色分类</span>
        </el-menu-item>

        <el-menu-item index="2" route="/article/manage">
          <el-icon><icon-menu /></el-icon>
          <span>用户管理</span>
        </el-menu-item>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><document /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="3-1" route="/user/profile"
            >基本资料</el-menu-item
          >
          <el-menu-item index="3-2" route="/user/password"
            >密码设置</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item index="4" route="/user/avatar">
          <el-icon><icon-menu /></el-icon>
          <span>照片墙</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!--      顶部导航-->
      <el-header height="100px">
        <el-menu
          :default-active="activeIndex"
          :ellipsis="false"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router>
          <el-menu-item index="1" route="/layout">首页</el-menu-item>
          <el-sub-menu index="2">
            <template #title>关于</template>
            <el-menu-item
              @click="goToLink('https://gitee.com/velvetshiki-not-vs')"
              >Github</el-menu-item
            >
            <el-menu-item
              @click="goToLink('https://space.bilibili.com/10069241')"
              >B站首页</el-menu-item
            >
            <el-menu-item index="2-1" route="/layout">网站首页</el-menu-item>
          </el-sub-menu>
          <el-menu-item
            @click="goToLink('https://user.qzone.qq.com/984288627/infocenter')"
            >说说</el-menu-item
          >
          <el-menu-item
            @click="goToLink('https://user.qzone.qq.com/984288627/infocenter')"
            >相册</el-menu-item
          >

          <!--    下拉信息中心-->
          <div class="flex-grow" />
          <el-menu-item index="5" route="/user/profile">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <img
                  :src="userStore.user.profile"
                  alt="avatar"
                  v-if="userStore.user.profile" />
                <el-icon v-else class="water"><HotWater /></el-icon>
                欢迎! {{ userStore.user.username }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="/user/profile"
                    >基本资料</el-dropdown-item
                  >
                  <el-dropdown-item command="/user/avatar"
                    >头像设置</el-dropdown-item
                  >
                  <el-dropdown-item command="/user/password"
                    >密码设置</el-dropdown-item
                  >
                  <el-dropdown-item command="/login" style="color: red"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
      </el-header>

      <!--      二级路由渲染区域-->
      <el-main>
        <router-view />
      </el-main>

      <!--      底部footer-->
      <el-footer height="50px">
        Manage System Created by @VelvetShiki 2024-2028</el-footer
      >
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 50px;

  .el-menu-demo {
    margin-top: 10px;
    height: 80px;

    .flex-grow {
      flex-grow: 1;
    }

    .el-dropdown-link {
      cursor: pointer;
      color: var(--el-color-primary);
      display: flex;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}

.el-aside {
  background-color: #333;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 838px;
  .logo {
    position: relative;
    width: 100%;
    height: 100px;
    overflow: hidden;
    img {
      width: 100%;
      height: 300px;
      position: absolute;
      vertical-align: top;
      top: -110px;
      left: 0;
    }
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  overflow: hidden;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.water {
  font-size: 30px;
  color: sandybrown;
}
</style>
