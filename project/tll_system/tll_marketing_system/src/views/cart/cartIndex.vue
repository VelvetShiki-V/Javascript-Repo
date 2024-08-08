<template>
  <div class="cart">
    <PageTop></PageTop>
    <PageTrace></PageTrace>
      <table class="wrapper" v-if="filteredList.length !== 0">
        <CartHeader :list="filteredList" @updateStatusAll="updateAll"></CartHeader>
        <CartBody :list="filteredList" @updateList="update"></CartBody>
        <CartFooter :list="filteredList"
        @updateStatusAll="updateAll"
        @preDelMtps="preDeleteMtps"
        @pay="prePay"
        ></CartFooter>
      </table>
      <el-empty description="您的购物车空空如也" v-else></el-empty>
    <PageBot></PageBot>
  </div>
</template>

<script>
import CartHeader from './CartHeader.vue'
import CartBody from './CartBody.vue'
import CartFooter from './CartFooter.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    CartHeader,
    CartBody,
    CartFooter
  },
  async created () {
    // 购物车页面一进入就获取购物车列表（根据uid和token, 且购物车自动过滤已下单商品）
    const postData = {
      uid: this.userInfo.uid,
      token: this.userInfo.token
    }
    await this.get_cart_items_async(postData)
    this.$notify.success({
      title: '成功',
      message: '获取购物车列表成功'
    })
    // 过滤paid
    this.filteredList = this.cartItems.filter(item => item.status !== 'paid')
  },
  data () {
    return {
      filteredList: []
    }
  },
  methods: {
    ...mapActions('goods', ['get_cart_items_async', 'items_status_all_change_async', 'remove_multi_items_async', 'pay_bill_async']),
    // 更新购物车列表
    async update () {
      const postData = {
        uid: this.userInfo.uid,
        token: this.userInfo.token
      }
      await this.get_cart_items_async(postData)
      this.filteredList = this.cartItems.filter(item => item.status !== 'paid')
    },
    // 改变购物车所有商品勾选状态
    async updateAll (status) {
      const postData = {
        uid: this.userInfo.uid,
        token: this.userInfo.token
      }
      if (status === 'unpaidAll') postData.status = 'unpaid'
      else postData.status = 'pending'
      await this.items_status_all_change_async(postData)
      await this.update()
      this.$message.success('所有商品状态更新成功')
    },
    // 删除多件已选商品
    preDeleteMtps () {
      this.$confirm('将删除所选商品，是否继续?', '警告', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
        .then(() => {
          const removeGoods = []
          this.filteredList.forEach(item => { if (item.status === 'unpaid') removeGoods.push(item.oid) })
          if (removeGoods.length === 0) return this.$message.warning('请至少选取一样商品进行删除')
          else this.delMtps(removeGoods)
        }).catch(() => {
          this.$message.info({ message: '已取消' })
        })
    },
    async delMtps (removeGoods) {
      const postData = {
        token: this.userInfo.token,
        uid: this.userInfo.uid,
        oids: removeGoods
      }
      const res = await this.remove_multi_items_async(postData)
      if (res.status === 200) {
        await this.update()
        this.$message.success('所选商品移除成功')
      } else if (res.status === 404) {
        this.$message.warning(res.message)
      } else { this.$message.error('/delAll: 未知错误') }
    },
    // 下单商品并将已购商品从购物车隐藏
    prePay () {
      const unpaidGoods = []
      this.filteredList.forEach(item => { if (item.status === 'unpaid') unpaidGoods.push(item.oid) })
      if (unpaidGoods.length === 0) return this.$message.warning('请至少选取一样商品进行下单')
      this.pay(unpaidGoods)
    },
    async pay (unpaidGoods) {
      const postData = {
        token: this.userInfo.token,
        status: 'paid',
        oids: unpaidGoods,
        uid: this.userInfo.uid
      }
      await this.pay_bill_async(postData)
      this.$message.success('订单支付成功!')
      this.$router.push('/order')
    }
  },
  computed: {
    ...mapState('goods', ['cartItems']),
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style lang="less" scoped>
table {
  background-color: #f3f3f3;
  margin-top: 30px;
  width: 1200px;
}
</style>
