<template>
    <div class="body_qrcode">
        <img src="@/assets/img/qrcode.png" alt="二维码">
        <p>打开<a href="#">淘乐乐APP</a>扫码登录</p>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.body_qrcode {
    img {
        display: block;
        width: 170px;
        height: 170px;
        margin: 30px 110px;
    }

    p {
        text-align: center;

        a {
            color: rgb(104, 155, 142);
            font-size: 18px;
        }
    }
}
</style>
