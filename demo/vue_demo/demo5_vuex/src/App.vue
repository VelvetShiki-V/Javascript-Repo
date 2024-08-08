<template>
  <div class="cart">
    <PageTop></PageTop>
    <PageTrace></PageTrace>
    <ModuleCart></ModuleCart>
    <PageBot></PageBot>
  </div>
</template>

<script>
import PageTop from './components/PageTop.vue'
import PageTrace from './components/PageTrace.vue'
import PageBot from './components/PageBot.vue'
import ModuleCart from './views/ModuleCart.vue'
import { mapActions } from 'vuex'
export default {
  // 应用一创建就请求数据
  created () {
    this.get_list()
  },
  methods: {
    ...mapActions('cart', ['get_list'])
  },
  components: {
    PageTop,
    PageTrace,
    PageBot,
    ModuleCart
  }
}
</script>

<!-- 引入外部样式表 -->
<style src="@/assets/iconfont/part1/iconfont.css"></style>
<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  ul,
  ol {
    list-style: none;
  }

  em,
  i {
    font-style: normal;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  body {
    font: 16px/1.5 "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", sans-serif;
    color: #333;
  }

}

// 版心
.wrapper {
  margin: 0 auto;
  width: 1200px;
}
</style>
