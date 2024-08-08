<template>
    <div class="login">
        <PageTop></PageTop>
        <div class="wrapper">
            <div class="widget">
                <div class="header">
                    <router-link to="/account">账户登录</router-link>
                    <router-link to="/qrcode">扫码登录</router-link>
                </div>
                <RouterView></RouterView>
            </div>
        </div>
        <PageBot></PageBot>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  created () {
    this.remove_token()
  },
  methods: {
    ...mapMutations('user', ['remove_token'])
  }
}
</script>

<style lang="less" scoped>
/* 登录框 */
.login {
    height: 1100px;
    background-image: url(@/assets/img/login_bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;

    .wrapper {
        height: 900px;
        position: relative;

        .widget {
            position: absolute;
            right: 10%;
            top: 10%;
            background-color: #ffffffe1;
            height: 500px;
            width: 400px;

            .header {
                display: flex;
                justify-content: space-between;
                height: 70px;
                border-bottom: 1px solid #b5acacb0;

                a {
                    font-size: 20px;
                    align-self: center;
                    padding: 0 59px;
                    border-right: 1px solid #b5acacb0;
                }

                .active {
                    color: rgb(103, 184, 156);
                }
            }
        }
    }
}
</style>
