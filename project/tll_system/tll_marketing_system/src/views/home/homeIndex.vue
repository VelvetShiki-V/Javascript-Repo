<template>
  <div class="home">
    <PageTop></PageTop>
    <banner :banner="banner"></banner>
    <contentHot :cards="freshGoods">
      <template #header>新鲜好物</template>
      <template #desc>新鲜出炉 品质靠谱</template>
    </contentHot>
    <contentHot :cards="recommendGoods">
      <template #header>人气推荐</template>
      <template #desc>人气爆款 不容错过</template>
    </contentHot>
    <contentHot :cards="hotGoods">
      <template #header>热门品牌</template>
      <template #desc>国际经典 品质保证</template>
    </contentHot>
    <contentMain :cards="houseware">
      <template #header>居家</template>
    </contentMain>
    <contentMain :cards="delicacy">
      <template #header>美食</template>
    </contentMain>
    <contentMain :cards="dressing">
      <template #header>服饰</template>
    </contentMain>
    <contentNew :cards="newGoods"></contentNew>
    <PageBot></PageBot>
  </div>
</template>

<script>
import contentHot from './contentHot'
import contentMain from './contentMain'
import contentNew from './contentNew'
import banner from './carouselBanner'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    banner,
    contentHot,
    contentMain,
    contentNew
  },
  async created () {
    // 异步等待获取全局数据
    await this.get_banner_async()
    await this.get_list_async()
    this.$notify.success({
      title: '成功',
      message: '获取商品列表成功'
    })
    // 开始分配数据
    this.freshGoods = this.list.slice(0, 4)
    this.recommendGoods = this.list.slice(4, 8)
    this.hotGoods = this.list.slice(8, 12)
    this.houseware = this.list.slice(11, 19)
    this.delicacy = this.list.slice(6, 14)
    this.dressing = this.list.slice(11, 19)
    this.newGoods = this.list.slice(0, 3)
  },
  data () {
    return {
      freshGoods: [],
      recommendGoods: [],
      hotGoods: [],
      houseware: [],
      delicacy: [],
      dressing: [],
      newGoods: []
    }
  },
  methods: {
    ...mapActions('goods', ['get_list_async', 'get_banner_async'])
  },
  computed: {
    ...mapState('goods', ['list', 'banner'])
  }
}
</script>
