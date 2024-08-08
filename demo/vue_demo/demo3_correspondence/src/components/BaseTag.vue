<template>
    <td style="width: 250px">
        <!-- 需求: 双击标签进入编辑模式，回车或失焦时发送更改请求并回显 -->
        <span v-if="isShown" @dblclick="isShown = false">{{ value }}</span>
        <!-- 输入框在双击或回车后发送tag修改请求，在父组件修改后同步回tag组件并回显到span上 -->
        <input type="text" v-else @keyup.enter="edit" @blur="edit" :value="value" v-focus>
    </td>
</template>

<script>
export default {
    props: {
        value: String
    },
    data() {
        return {
            isShown: true
        }
    },
    methods: {
        // 编辑请求父组件修改tag数据
        edit(e) {
            if (e.target.value.trim() === "") return alert("标签不能为空!");
            if (e.target.value === this.value) {
                this.isShown = true;
                return;
            }
            this.$emit("input", e.target.value);
            this.isShown = true;
            console.log("发送成功: ", e.target.value);
        }
    }
}
</script>

<style lang="less" scoped>
span {
    color: red;
    cursor: pointer;
    text-decoration: underline;
}

input {
    width: 80px;
    height: 40px;
    outline: none;
}
</style>