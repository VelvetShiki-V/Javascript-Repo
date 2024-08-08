<template>
  <div class="navigator">
    <router-link to="/login" v-if="!userInfo.token">登 录</router-link>
    <span @click="logout" v-else>登 出</span>
    <router-link to="/home">注 册</router-link>
    <router-link to="/home">主 页</router-link>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  methods: {
    ...mapActions('user', ['logout_async']),
    ...mapMutations('user', ['remove_token']),
    async logout () {
      const postData = {
        user: 'guest',
        token: this.userInfo.token
      }
      await this.logout_async(postData)
      this.$notify.success('登出成功')
      // 清理token
      this.remove_token()
      this.$router.replace('/login')
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style lang="less">
    .navigator {
        background-color: rgb(214, 209, 209);
        display: flex;
        height: 70px;
        width: 1;
        // gap: 30px;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        a, span {
            text-align: center;
            line-height: 68px;
            height: 68px;
            width: 100px;
            margin: 0 10px;
            cursor: pointer;
        }
        a:hover, span:hover {
            color: red;
        }
    }
</style>
