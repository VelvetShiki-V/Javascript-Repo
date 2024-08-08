<template>
    <!-- 浏览轨迹 -->
    <div class="trace">
        <div class="wrapper">
            <a href="#">首页 ></a>
            <a href="#">运动 ></a>
            <a href="#">四季骑行头盔</a>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
/* 轨迹 */
.trace {
    background-color: rgb(245, 245, 245);
    height: 70px;

    .wrapper {
        display: flex;
        height: 70px;
        line-height: 70px;
        font-size: 15px;

        a {
            margin-right: 10px;
        }

        a:hover {
            color: rgb(130, 184, 158);
        }
    }
}
</style>
