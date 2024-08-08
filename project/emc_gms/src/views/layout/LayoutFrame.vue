<script setup lang="ts">
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowDown,
  HotWater,
  Menu,
  HelpFilled,
  List
} from '@element-plus/icons-vue'

const loading = ref<boolean>(false)
const userStore = useUserStore()
const router = useRouter()
const activeIndexTop = ref<string>('1')
const activeIndexAside = ref<string>('1')
// when the key of a component changes, it forces that component to re-render.
const keyAside = ref(0) // Key to force re-render of the aside menu
const keyTop = ref(0) // Key to force re-render of the top menu

// 页面跳转
const goToLink = (url: string) => {
  window.location.href = url
}

// 顶部导航点击
const handleSelectTop = () => {
  activeIndexAside.value = ''
  keyAside.value = keyAside.value === 0 ? 1 : 0
}
// 侧边导航点击
const handleSelectAside = () => {
  activeIndexTop.value = ''
  keyTop.value = keyTop.value === 0 ? 1 : 0
}

// 下拉导航点击事件
const handleCommand = async (path: string) => {
  if (path === '/login') {
    try {
      await ElMessageBox.confirm('将退出登录，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    } catch {
      return
    }
    // 如果登出，则清空本地存储信息
    userStore.removeLoginUser()
  }
  await router.push(path)
}
</script>

<template>
  <!-- 骨架屏 -->
  <el-skeleton :rows="10" :loading="loading" animated />
  <el-container>
    <!--    侧边导航-->
    <el-aside width="250px">
      <div class="logo">
        <img src="@/assets/EMC.gif" alt="" />
      </div>
      <el-menu
        :key="keyAside"
        active-text-color="#ffd04b"
        :default-active="activeIndexAside"
        router
        @select="handleSelectAside">
        <el-menu-item index="1" route="/model/list">
          <el-icon>
            <Menu />
          </el-icon>
          <span>MODEL</span>
        </el-menu-item>

        <el-menu-item index="2" route="/model/command">
          <el-icon>
            <HelpFilled />
          </el-icon>
          <span>COMMAND</span>
        </el-menu-item>

        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <List />
            </el-icon>
            <span>TASK3</span>
          </template>
          <el-menu-item index="3-1" route="/default">SUBTASK1</el-menu-item>
          <el-menu-item index="3-2" route="/default">SUBTASK2</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4" route="/default">
          <el-icon>
            <List />
          </el-icon>
          <span>TASK4</span>
        </el-menu-item>
        <el-menu-item index="5" route="/default">
          <el-icon>
            <List />
          </el-icon>
          <span>TASK5</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!--      顶部导航-->
      <el-header height="100px">
        <el-menu
          :key="keyTop"
          :default-active="activeIndexTop"
          :ellipsis="false"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          @select="handleSelectTop">
          <el-menu-item index="1" route="/layout">首页</el-menu-item>
          <el-sub-menu index="2">
            <template #title>关于</template>
            <el-menu-item @click="goToLink('https://cloud.myemc.net.cn:3000')"
              >Gitea仓库</el-menu-item
            >
            <el-menu-item @click="goToLink('https://www.myemc.net.cn')"
              >官方网站</el-menu-item
            >
            <el-menu-item
              @click="goToLink('https://www.myemc.net.cn/index.do?software')"
              >软件中心</el-menu-item
            >
          </el-sub-menu>
          <el-menu-item
            index="3"
            @click="goToLink('https://cloud.myemc.net.cn/registry/user/submit')"
            >注册</el-menu-item
          >
          <el-menu-item index="4" @click="goToLink('https://www.myemc.net.cn')"
            >帮助</el-menu-item
          >

          <!--    下拉信息中心-->
          <div class="flex-grow" />
          <el-menu-item index="5" route="/default">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <el-icon class="water">
                  <HotWater />
                </el-icon>
                欢迎!
                {{ userStore.loginUser?.username }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="/default"
                    >基本资料</el-dropdown-item
                  >
                  <el-dropdown-item command="/default"
                    >头像设置</el-dropdown-item
                  >
                  <el-dropdown-item command="/default"
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
        GraphQL Manage System Created by @MyEMC.Ltd 2024-2028</el-footer
      >
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
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
  background-color: #b3c0d1;
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
