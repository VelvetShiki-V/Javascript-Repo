<template>
    <div class="top">
        <!-- 顶部导航区域 -->
        <div class="shortcut">
            <div class="wrapper">
                <ul>
                    <li class="login" v-if="loginStatus"><a href="#/account">请先登录</a></li>
                    <li class="login" v-else>
                        <el-tooltip class="item" effect="light" content="点击以退出登录" placement="bottom">
                            <span @click="logout">{{ loginInfo }}</span>
                        </el-tooltip>
                    </li>
                    <li class="register" v-if="loginStatus"><a href="#/register">免费注册</a></li>
                    <li><a href="#/order">我的订单</a></li>
                    <li><a href="#/home">返回主站</a></li>
                    <li><a href="#">会员中心</a></li>
                    <li><a href="#">帮助中心</a></li>
                    <li><a href="#">在线客服</a></li>
                    <li class="iconfont icon-shouji"><a href="#">手机版</a></li>
                </ul>
            </div>
        </div>
        <!-- 导航菜单区域 -->
        <div class="navi">
            <div class="wrapper">
                <a href="#">
                    <div class="logo"></div>
                </a>
                <div class="right">
                    <ul>
                        <li><a href="#/home">首页</a></li>
                        <li><a href="#">生鲜</a></li>
                        <li><a href="#">美食</a></li>
                        <li><a href="#">餐具</a></li>
                        <li><a href="#">电器</a></li>
                        <li><a href="#">居家</a></li>
                        <li><a href="#">洗护</a></li>
                        <li><a href="#">孕婴</a></li>
                        <li><a href="#">服装</a></li>
                    </ul>
                    <div class="search">
                        <a href="#"><span class="iconfont icon-sousuo"></span></a>
                        <input type="text" placeholder="搜一搜">
                        <a href="#/cart"><span class="iconfont icon-gouwuche"></span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  created () {
    if (this.userInfo) {
      this.loginInfo = this.userInfo.username + ', 欢迎你!'
      this.status = false
    }
  },
  data () {
    return {
      loginInfo: '请先登录',
      status: true
    }
  },
  methods: {
    ...mapMutations('user', ['remove_token']),
    logout () {
      this.remove_token() // 将localStorage和vuex中的userInfo都清除
      this.status = true
      this.$notify.success('登出成功!')
      this.$router.replace('#/account')
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    loginStatus: {
      get () {
        return this.status
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top {

    /* 通栏背景 */
    .shortcut {
        background-color: #333;
        height: 60px;

        .wrapper {
            display: flex;
            height: 100%;
            justify-content: flex-end;
            background-color: #333;
            padding-top: 10px;

            ul {
                display: flex;
                height: 40px;
                line-height: 40px;

                li {
                    color: #fff;
                    border-right: 1px solid #fff;
                    padding-right: 15px;
                    margin-right: 15px;

                    a {
                        color: #fff;
                        text-decoration: none;
                    }

                    a:hover {
                        color: green;
                    }

                }

                li:nth-child(7) {
                    border-right: none;
                }

                li:nth-child(7):hover {
                    color: green;
                }

                .login {
                    a {
                        color: green;

                    }

                    span {
                        color: red;
                        cursor: pointer;
                    }
                }

            }
        }
    }

    /* 菜单栏 */
    .navi {
        background-color: white;
        height: 130px;

        .wrapper {
            display: flex;
            padding-top: 10px;
            padding-bottom: 10px;

            .logo {
                height: 110px;
                width: 250px;
                background-image: url('@/assets/img/logo.gif');
                // background-position: 40% 20%;
                background-repeat: no-repeat;
                margin-right: 30px;
            }

            .right {
                display: flex;
                height: 110px;
                width: 920px;
                line-height: 110px;
                padding: 10px 5px;

                ul {
                    display: flex;

                    li {
                        padding-left: 10px;
                        padding-right: 10px;
                        margin-right: 20px;
                        font-size: 17px;
                    }

                    a:hover {
                        padding-bottom: 5px;
                        border-bottom: 1px solid green;
                        color: green;
                    }
                }

                .search {
                    .icon-sousuo {
                        font-size: 23px;
                        margin-right: 5px;
                        vertical-align: middle;
                    }

                    input {
                        outline: none;
                        width: 170px;
                        height: 23px;
                        margin-right: 5px;
                    }

                    .icon-gouwuche {
                        font-size: 23px;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
}
</style>
