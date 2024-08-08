// count获取字数，textarea获取回复框，submit获取评论发送按钮，comment获取评论详情
const count = document.querySelector(".wrapper .main .reply_box .count");
const textarea = document.querySelector(".wrapper .main .reply_box textarea");
const submit = document.querySelectorAll(".wrapper .main .reply_box #sd");      // 同时选中多个id修饰标签
const comment = document.querySelector(".wrapper .main .comment ul li .container .reply");
const ul = document.querySelector(".wrapper .main .comment ul");
let i = document.querySelectorAll(".wrapper .main .comment ul li .statusbar i");
// 全局变量info获取回复框发送信息，icons获取点赞按钮
let info = "";
let icons = [];

// 通过发送评论构建li添加到ul中
function create_li(info, time) {
    return `
    <li>
        <!-- 回复框 -->
        <div class="container">
            <!-- 用户信息 -->
            <div class="userinfo">
                <!-- 头像 -->
                <div class="avatar"><img src="../2024.1/xmly/img/user.png" alt=""></div>
                <!-- 名字和等级 -->
                <span class="name">shiki</span>
                <i class="level"><img src="./img/level3.png" alt=""></i>
            </div>
            <!-- 内容块 -->
            <span class="reply">${info}</span>
            <!-- 底部状态栏 -->
            <div class="statusbar">
                <!-- 时间,点赞,回复 -->
                <span class="time">${time}小时前</span>
                <a href="#"><i class="iconfont icon-dianzan"></i></a>
                <a href="#"><i class="iconfont icon-cai"></i></a>
                <a href="#"><span class="reply_btn">回复</span></a>
            </div>
        </div>
    </li>
    `;
}

// 评论框聚焦
textarea.addEventListener("focus", function() {
    textarea.style.resize = "vertical"
    textarea.style.height = "70px";
    count.style.display = "block";
    // 循环的多种方法
    // submit.forEach(function(val) {
    //     console.log(val);
    //     val.style.height = "70px"
    //     val.style.lineHeight = "70px"
    // })
    for(const element of submit) {
        element.style.height = "70px";
        element.style.lineHeight = "70px";
    }
});

// 评论框失焦
textarea.addEventListener("blur", function() {
    textarea.style.resize = "none"
    textarea.style.height = "43px";
    count.style.display = "none";
    for(const element of submit) {
        element.style.height = "43px";
        element.style.lineHeight = "43px";
    }
});

// 评论框输入
textarea.addEventListener("input", function() {
    count.innerHTML = `${textarea.value.length}/200字`;
    count.style.display = "block";
});

// 点击按钮发送评论
submit[0].addEventListener("click", function() {
    if(info = textarea.value.trim()) {
        ul.innerHTML += create_li(info, parseInt(Math.random() * 24) + 1);
        textarea.value = "";
        count.innerHTML = `0/200字`;
        // 点赞
        const lists = document.querySelectorAll(".wrapper .main .comment ul li");       // li必须实时获取
        thumb_register(lists.length);
    }
});

// 回车发送评论
textarea.addEventListener("keyup", function(e) {
    if(e.key === "Enter") {
        if(info = textarea.value.trim()) {
            ul.innerHTML +=  create_li(info, parseInt(Math.random() * 24) + 1);
            textarea.value = "";
            count.innerHTML = `0/200字`;
        }
    }
});

// 事件流冒泡机制——点赞和点踩
ul.addEventListener("click", function(e) {
    // 获取到点击的<i>最近的li元素
    const li = e.target.closest("li");
    // 同时获取li对应两个icon
    const zan = li.querySelector(".container .statusbar a .icon-dianzan");
    const cai = li.querySelector(".container .statusbar a .icon-cai");
    // 点赞i元素事件监听
    if(e.target === zan) {
        console.log(e.target);
        // 如果踩为点击态，取消该状态
        if(cai.classList.contains("iconActive")) 
            cai.classList.remove("iconActive");
        // 将赞状态切换
        zan.classList.toggle("iconActive");
        // 如果赞为点击态，数字加1，否则去除
        if(zan.classList.contains("iconActive")) zan.innerHTML = " 1";
        else 
            zan.innerHTML = "";
    }
    else if(e.target === cai) {
        // 点踩i元素事件监听
        // console.log(e.target);
        if(zan.classList.contains("iconActive")) {
            zan.classList.remove("iconActive");
            zan.innerHTML = "";
        }
        cai.classList.toggle("iconActive");
    }
})