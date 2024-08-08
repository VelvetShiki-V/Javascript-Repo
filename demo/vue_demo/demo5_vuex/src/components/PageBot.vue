<template>
    <div class="bot">
        <!-- contact联系 -->
        <div class="contact wrapper">
            <div class="container">
                <dl>
                    <dt>客户服务</dt>
                    <dd><a href="#"><i class="iconfont icon-chat"></i>在线客服</a></dd>
                    <dd><a href="#"><i class="iconfont icon-question"></i>问题反馈</a></dd>
                </dl>
                <dl>
                    <dt>关注我们</dt>
                    <dd><a href="#"><i class="iconfont icon-wechat-fill"></i>公众号</a></dd>
                    <dd><a href="#"><i class="iconfont icon-weibo"></i>微博</a></dd>
                </dl>
                <dl>
                    <dt>下载APP</dt>
                    <!-- <dd><img src="./images/qrcode.png" alt=""></dd> -->
                    <dd class="download">
                        <span>扫描二维码</span>
                        <span>立即下载APP</span>
                        <a href="#">点击下载</a>
                    </dd>
                </dl>
                <dl>
                    <dt>服务热线</dt>
                    <dd class="hotline">
                        400-0000-000
                        <small>周一至周日 8:00-18:00</small>
                    </dd>
                </dl>
            </div>
        </div>
        <!-- extra额外信息 -->
        <div class="extra">
            <div class="wrapper">
                <div class="slogan">
                    <a href="#">
                        <i class="iconfont icon-box"></i>
                        <span>价格亲民</span>
                    </a>
                    <a href="#">
                        <i class="iconfont icon-thumbsup"></i>
                        <span>物流快捷</span>
                    </a>
                    <a href="#">
                        <i class="iconfont icon-truck"></i>
                        <span>品质新鲜</span>
                    </a>
                </div>
                <div class="copyright">
                    <p>
                        <a href="#">关于我们</a>
                        <a href="#">帮助中心</a>
                        <a href="#">售后服务</a>
                        <a href="#">配送与验收</a>
                        <a href="#">商务合作</a>
                        <a href="#">搜索推荐</a>
                        <a href="#">友情链接</a>
                    </p>
                    <p>CopyRight@小兔鲜</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.bot {

    /* 联系我们 */
    .contact {
        height: 300px;

        .container {
            padding: 60px 0 40px 25px;
            margin: 0 20px;
            display: flex;

            dl {
                height: 200px;
                border-right: 1px solid #999;
                padding-right: 10px;
                margin-right: 30px;

                dt {
                    color: #999;
                    font-size: 20px;
                    text-align: center;
                }

                dd {
                    display: inline-block;
                    align-content: center;
                    text-align: center;
                    overflow: hidden;
                    margin: 36px 20px 0 0;
                    width: 100px;
                    height: 110px;
                    border: 1px solid #999;

                    i {
                        color: #000;
                        display: block;
                        font-size: 40px;
                    }

                    a {
                        font-size: 17px;
                        color: #999;
                    }

                    .iconfont {
                        transition: all 0.5s ease;
                    }

                    a:hover .iconfont {
                        color: green;
                        font-size: 45px;
                    }
                }

                .download {
                    border: none;
                    padding-top: 15px;

                    a {
                        margin-top: 5px;
                        display: block;
                        border-radius: 3%;
                        width: 100px;
                        height: 34px;
                        background-color: #999;
                        color: white;
                        font-size: 14px;
                        text-align: center;
                        line-height: 34px;
                    }

                    a:hover {
                        background-color: green;
                        color: white;
                    }

                    span {
                        display: block;
                        font-size: 14px;
                        color: #999;
                    }
                }

                .hotline {
                    padding-left: 30px;
                    width: 240px;
                    text-align: center;
                    font-size: 22px;
                    border: none;
                    color: #666;

                    small {
                        display: block;
                        font-size: 15px;
                        color: #999;
                    }
                }
            }

            dl:nth-child(4) {
                width: 270px;
                margin-right: 0;
                padding-right: 0;
                border-right: none;
            }
        }
    }

    /* 额外信息 */
    .extra {
        background-color: #333;

        .wrapper {
            height: 350px;

            .slogan {
                height: 180;
                padding: 60px 100px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);

                a {
                    display: flex;
                    align-items: center;

                    i {
                        color: white;
                        font-size: 50px;
                        margin-right: 10px;
                    }

                    span {
                        color: white;
                        font-size: 30px;
                    }
                }
            }

            .copyright {
                padding-top: 40px;

                p {
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 15px;
                    color: #999;

                    a {
                        font-size: 15px;
                        color: #999;
                        padding: 0 15px;
                        border-right: 1px solid #999;
                    }
                }
            }
        }
    }
}
</style>
