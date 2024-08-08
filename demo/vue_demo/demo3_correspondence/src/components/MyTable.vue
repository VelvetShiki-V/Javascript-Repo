<template>
    <table>
        <!-- 固定表头 -->
        <thead>
            <tr>
                <th style="width: 200px">编号</th>
                <th style="width: 300px">图片</th>
                <th style="width: 700px">名称</th>
                <th style="width: 250px">标签</th>
            </tr>
        </thead>
        <!-- 响应数据表内容 -->
        <tbody>
            <tr v-for="(item, index) in data" :key="item.id">
                <td style="width: 200px">{{ index + 1 }}</td>
                <td style="width: 300px"><img :src="item.img" width="150px" height="150px"></td>
                <td style="width: 700px">{{ item.name }}</td>
                <!-- tag会被手动更改，需要插槽进行内容自定义 -->
                <!-- 发送必须为对象，通过对象对其中tag进行修改，从而整个item对象的tag属性值进行修改 -->
                <slot name="tag" :item="item" msg="需要特殊处理">空标签</slot>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {




    
    // 父组件传入的共享数据
    props: {
        data: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="less" scoped>
table {
    width: 1500px;

    thead {
        height: 50px;
        background-color: skyblue;

        tr {
            th {
                height: 50px;
                line-height: 50px;
                display: inline-block;
                width: 10px;

            }
        }
    }

    tbody {
        tr {
            display: block;
            border: 1px solid grey;

            td {
                display: inline-block;
                text-align: center;
                margin: 5px 0;
            }
        }
    }
}
</style>