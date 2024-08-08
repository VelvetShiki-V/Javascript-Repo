<template>
  <div class="order wrapper">
    <PageTop></PageTop>
    <PageTrace>
      <template #category>购物车 ></template>
      <template #desc>订单结算</template>
    </PageTrace>
    <div class="orderShow">
      <el-collapse v-model="activeNames" v-for="(item, index) in paidList" :key="item.oid">
        <el-collapse-item :title="'订单编号: ' + item.oid + '  订单名称: ' + `${fetchGoods(item.gid).title}`"
          :name="index + 1">
          <h1 style="text-align: center">订单信息</h1>
          <h2>买家: {{ userInfo.username }}</h2>
          <h3>商品名: {{ fetchGoods(item.gid).title }}</h3>
          <img :src="JSON.parse(item.supplements).color">
          <p>商品描述: {{ fetchGoods(item.gid).desc }}</p>
          <p>商品型号: {{ JSON.parse(item.supplements).size }}</p>
          <p>商品库存: {{ fetchGoods(item.gid).stock }}</p>
          <p>购买数量: {{ item.count }}</p>
          <p>状态: {{ item.status }}</p>
          <div class="block">
            <el-timeline>
              <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
                :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <PageBot></PageBot>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  async created () {
    // 先从仓库获取商品列表
    this.get_list_async()
    const postData = {
      token: this.userInfo.token,
      uid: this.userInfo.uid,
      status: 'paid'
    }
    await this.get_bill_async(postData)
    this.paidList = this.bill
    this.$message.success('获取订单成功')
  },
  data () {
    return {
      paidList: [],
      activeNames: [],
      activities: [{
        content: '商家已接单',
        timestamp: '2024-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '商品已发货',
        timestamp: '2024-04-21 06:45',
        color: '#0bbd87'
      }, {
        content: '运输中',
        timestamp: '2024-04-24 23:21',
        size: 'large'
      }, {
        content: '已送达',
        timestamp: '2024-04-26 13:56'
      }]
    }
  },
  methods: {
    ...mapActions('goods', ['get_bill_async', 'get_list_async']),
    fetchGoods (gid) {
      return this.list.find(item => item.gid === gid)
    }
  },
  computed: {
    ...mapState('goods', ['bill', 'list']),
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style lang="less" scoped>
.order {
  .orderShow {
    padding: 100px;

    .el-collapse {
      .el-collapse-item__content {

        img {
          display: block;
          height: 400px;
          width: 400px;
          margin-left: 300px;
        }

        h2 {
          font-size: 25px;
        }

        h3 {
          font-size: 22px;

        }

        p {
          font-size: 20px;
        }

        .el-timeline {
          margin-top: 10px;
          margin-left: 10px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
