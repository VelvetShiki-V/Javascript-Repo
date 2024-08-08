<template>
  <div class="box">
    <MyTable :data="list">
      <template #tag="{ item }">
        <!-- 作用域插槽接收到子组件tag内容, 先用具名插槽接收数据，结构，再利用v-model双向绑定 -->
        <baseTag v-model="item.tag"></baseTag>
      </template>
    </MyTable>
  </div>
</template>

<script>
// 子组件导入
import MyTable from "./components/MyTable"
import BaseTag from './components/BaseTag'
export default {
  components: {
    MyTable,
    BaseTag
  },
  data() {
    return {
      // 用于与子组件table共享数据props
      list: [
        { id: 1, img: "https://img12.360buyimg.com/jdcms/s460x460_jfs/t1/242499/1/5637/67008/65eab063Fdf73f78a/a657550c69789c27.jpg.webp", name: "RKS75三模机械键盘2.4G蓝牙有线RGB全键无冲81键带旋钮0.66吋OLED屏热插拔轴Gasket结构湖光版云雾轴", tag: "键盘" },
        { id: 2, img: "https://img13.360buyimg.com/jdcms/s460x460_jfs/t1/189522/18/26855/115525/62fa0467Ef2e4678c/ee113f70d81336ac.jpg.webp", name: "三星SAMSUNG Galaxy S22 Ultra 全网通5G手机 双卡双待 S22 Ultra 曜夜黑 12GB+256GB 双卡5G", tag: "手机" },
        { id: 3, img: "https://img12.360buyimg.com/jdcms/s460x460_jfs/t1/216641/28/31552/173991/64ad0050F5305ab63/0e75a0c3605e0add.jpg.webp", name: "雷瑟森（Reitherson）蓝牙耳机挂脖音乐游戏运动入耳式重低音蓝牙耳机安卓苹果华为 幻夜黑", tag: "耳机" },
        { id: 4, img: "https://img30.360buyimg.com/jdcms/s460x460_jfs/t1/247984/21/4564/69378/65d2e7c4Fbec11cdb/9b7893d0b35535e8.jpg.webp", name: "创意ins韩风浪漫英文粉色奶油陶瓷杯情侣送礼早餐马克杯 奶油Lucky 礼盒包装", tag: "杯子" }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 20px auto;
  padding: 0;
  box-sizing: border-box;

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: black;
  }
}

.box {
  width: 1500px;
  height: 900px;
  background-color: pink;
}
</style>