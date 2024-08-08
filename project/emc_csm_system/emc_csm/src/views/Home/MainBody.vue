<template>
    <div class="body">
        <div class="left">
            <router-link :to="{ name: 'emcTable', params: { name: `${name}` } }" v-for="name in tables" :key="name">{{ name }}</router-link>
        </div>
        <div class="right">
            <!-- 二级路由出口,使用key以强制刷新组件 -->
            <router-view :key="$route.fullPath"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  async created () {
    const tables = await this.fetch_tables_async({
      user: this.userInfo.user,
      token: this.userInfo.token
    })
    this.tables = tables
  },
  data () {
    return {
      tables: []
    }
  },
  methods: {
    ...mapActions('table', ['fetch_tables_async'])
  },
  computed: {
    ...mapState('user', ['userInfo'])
  }
  // 路由变化立即监视: 观察从哪个页面进入哪个页面
  // watch: {
  //   '$route' (to, from) {
  //     console.log(JSON.parse(JSON.stringify(this.$store.state.user)))
  //     console.log('to: ', to.path)
  //     console.log('from: ', from.path)
  //   }
  // }
}
</script>

<style lang="less" scoped>
.body {
    display: flex;
    .left {
        width: 250px;
        background-color: rgb(51, 51, 51);

        a {
            display: block;
            width: 250px;
            height: 100px;
            color: white;
            text-align: center;
            line-height: 100px;
        }

        a:hover {
            background-color: rgb(147, 134, 134);
        }

        a.active {
            background-color: rgb(147, 134, 134);
        };
    }

    .right {
        margin: 50px 50px;
    }
}
</style>
