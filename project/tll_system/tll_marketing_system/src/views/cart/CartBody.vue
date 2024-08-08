<template>
  <tbody>
    <tr v-for="item in list" :key="item.oid">
      <td style="width: 135px">
        <input type="checkbox" class="check" :checked="item.status === 'unpaid'" @change="statusChange($event, item)">
      </td>
      <td class="desc" @click="redirToDetail(item.gid)">
        <div class="des">
          <img :src="JSON.parse(item.supplements).color">
          <span>{{ item.title }}</span>
          <small>产品型号: {{ JSON.parse(item.supplements).size }}</small>
        </div>
      </td>
      <td style="width: 80px">￥{{ item.price }}</td>
      <td style="width: 250px">
        <button type="button" @click="amountChange(item, -1)" :disabled="item.count <= 1">-</button>
        <BaseTag :obj="item" @update="amountModify"></BaseTag>
        <button type="button" @click="amountChange(item, 1)" :disabled="item.count >= 99">+</button>
      </td>
      <td style="color: red; width: 100px; margin-left: -20px; font-size: 20px;">￥{{ item.price * item.count }}</td>
      <td class="delete"><el-button type="danger" round @click="pre_del(item)">删除</el-button></td>
    </tr>
  </tbody>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BaseTag from '@/components/BaseTag'
export default {
  components: {
    BaseTag
  },
  props: {
    list: Array
  },
  methods: {
    ...mapActions('goods', ['goods_amount_change_async', 'remove_cart_item_async', 'item_status_change_async']),
    // 物品跳转详情页
    redirToDetail (gid) {
      this.$router.push(`/detail/${gid}`)
    },
    // 商品数量修改(按钮 + 自定义数量)
    async amountChange (item, step) {
      const newCount = item.count + Number(step)
      const postData = {
        token: this.userInfo.token,
        oid: item.oid,
        count: newCount
      }
      await this.goods_amount_change_async(postData)
      this.$emit('updateList')
      this.$message.success('数量更新成功')
    },
    amountModify (modified) {
      this.amountChange(modified.item, modified.step)
    },
    // 指定商品删除
    pre_del (item) {
      this.$confirm('将删除该商品，是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    async del (item) {
      const postData = {
        token: this.userInfo.token,
        oid: item.oid
      }
      await this.remove_cart_item_async(postData)
      this.$message.success('商品删除成功')
      this.$emit('updateList')
    },
    // 指定商品状态改变
    async statusChange (e, item) {
      const postData = {
        token: this.userInfo.token,
        oid: item.oid
      }
      if (e.target.checked && item.status === 'pending') postData.status = 'unpaid'
      else if (!e.target.checked && item.status === 'unpaid') postData.status = 'pending'
      else return this.$message.error('发生未知错误: statusChange失败')
      await this.item_status_change_async(postData)
      this.$message.success('商品状态更新成功')
      this.$emit('updateList')
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style lang="less" scoped>
tbody {
  tr {
    display: block;
    height: 200px;
    padding: 50px 0;
    border-bottom: 1px solid grey;

    td {
      display: inline-block;
      text-align: center;
      height: 100px;
      padding: 25px 0;

      .check {
        width: 20px;
        height: 20px;
        margin-top: 10px;
      }

      img {
        background-color: skyblue;
        display: inline-block;
        width: 100px;
        height: 100px;
        vertical-align: bottom;
        margin-right: 5px;
      }

      .el-button {
        font-size: 16px;
        width: 100px;
        height: 50px;
      }
    }

    td.desc {
      cursor: pointer;
      height: 100px;
      width: 460px;

      .des {
        position: relative;
        display: flex;
        height: 100px;

        img {
          margin-top: -25px;
        }

        span {
          height: 80px;
          width: 340px;
          flex-wrap: wrap;
          text-align: left;
        }

        small {
          display: inline-block;
          height: 30;
          position: absolute;
          left: 110px;
          top: 50px;
          color: rgba(150, 145, 145, 0.842);
      }
      }
    }

    td.delete {
      width: 110px;
      margin-left: 50px;
      margin-top: -10px;
    }
  }

  button {
    display: inline-block;
    margin: 0 5px;
    width: 25px;
    height: 25px;
  }
}
</style>
