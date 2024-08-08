<template>
    <tbody>
        <tr v-for="item in list" :key="item.id">
            <td style="width: 135px">
                <input type="checkbox" style="width: 20px; height: 20px;" :checked="item.isChecked"
                    @change="modify(item.id)">
            </td>
            <td class="desc"><img :src="item.img">{{ item.desc }}</td>
            <td style="width: 80px">￥{{ item.price }}</td>
            <td style="width: 250px">
                <button type="button" @click="update(item, -1)" :disabled="item.count === 1">-</button>
                <span class="count">{{ item.count }}</span>
                <button type="button" @click="update(item, 1)">+</button>
            </td>
            <td style="color: red; width: 100px; margin-left: -20px;">￥{{ item.price * item.count }}</td>
            <td class="delete" @click="del(item.id)">删除</td>
        </tr>
    </tbody>
</template>

<script>
// mutations不用前台掉，由异步更新服务器数据后，再由actions调用
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapActions('cart', ['update_count_async']),
    ...mapMutations('cart', ['modify']),
    update (item, step) {
      this.update_count_async({
        id: item.id,
        count: item.count + step
      })
    }
  },
  computed: {
    ...mapState('cart', ['list'])
  }
}
</script>

<style lang="less" scoped>
tbody {
    tr {
        display: block;
        padding: 50px 0;
        border-bottom: 1px solid grey;

        td {
            display: inline-block;
            text-align: center;
            line-height: 100px;

            img {
                background-color: skyblue;
                display: inline-block;
                width: 100px;
                height: 100px;
                vertical-align: bottom;
                margin-right: 5px;
            }
        }

        td.desc {
            width: 460px;
            text-align: left;
            word-wrap: break-word;
        }

        td.delete {
            color: rgb(39, 187, 154);
            cursor: pointer;
            width: 100px;
            margin-left: 60px;
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
