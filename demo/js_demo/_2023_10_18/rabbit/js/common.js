const login = document.querySelector(".shortcut .wrapper ul .login a");

function master_arrival() {
    // location.search获取url?之后的所有get信息
    if(location.search) {
        const obtain = new URLSearchParams(location.search);
        // 详细解析，通过取键获取对应值
        const username = obtain.get("username");
        login.style.color = "#fff";
        login.innerHTML = username + "，欢迎您";
    }
}
master_arrival();

// ***************************电梯导航********************************
// 电梯导航随着页面滚动而固定在页面相对位置
const ele = document.querySelector(".elevator");
const lis = document.querySelectorAll(".elevator [data-id]");
// 页面区域
const global = document.querySelector(".global");
const hot = document.querySelector(".hot");
const recommend = document.querySelector(".recommend");
const brand = document.querySelector(".brand");
const houseware = document.querySelector("#houseware");
const delicacy = document.querySelector("#delicacy");
const costume = document.querySelector("#costume");
const New = document.querySelector(".new");
const contact = document.querySelector(".contact");
window.addEventListener("scroll", page_scroll);
window.addEventListener("click", function(e) {
    page_locate(e);
});

// 每次渲染新锚点时，将之前已经加上样式的电梯锚点去样式
function lis_clear() {
    const pre_active = document.querySelector(".elevator .active");
    if(pre_active) pre_active.classList.remove("active");
    // for(let i = 0; i < lis.length; ++i) {
    //     lis[i].classList.remove("active");
    // }
}
function page_scroll() {
    const depth = parseInt(document.documentElement.scrollTop);
    // 导航隐藏
    if(depth >= hot.offsetTop) {
        ele.style.opacity = "1";
        global.style.top = "0";
    }
    else {
        ele.style.opacity = "0";
        global.style.top = "-130px";
    }
    // hot导航
    if(depth >= hot.offsetTop && depth <= recommend.offsetTop) {
        // console.log("depth: ", depth);
        // console.log("hottop: ", hot.offsetTop);
        lis_clear();
        lis[1].classList.add("active");
    }
    // recommend
    else if(depth >= (hot.offsetTop + hot.offsetHeight) && depth <= brand.offsetTop) {
        // console.log("depth: ", depth);
        // console.log("recommendtop: ", recommend.offsetTop);
        lis_clear();
        lis[2].classList.add("active");
    }
    // brand
    else if(depth >= brand.offsetTop && depth <= houseware.offsetTop) {
        lis_clear();
        lis[3].classList.add("active");
    }
    // houseware
    else if(depth >= houseware.offsetTop && depth <= delicacy.offsetTop) {
        lis_clear();
        lis[4].classList.add("active");
    }
    // delicacy
    else if(depth >= delicacy.offsetTop && depth <= costume.offsetTop) {
        lis_clear();
        lis[5].classList.add("active");
    }
    // costume
    else if(depth >= costume.offsetTop && depth <= New.offsetTop) {
        lis_clear();
        lis[6].classList.add("active");
    }
    // new
    else if(depth >= New.offsetTop && depth <= (New.offsetTop + New.offsetHeight / 2)) {
        lis_clear();
        lis[7].classList.add("active");
    }
    // contact
    else if(depth >= (New.offsetTop + New.offsetHeight / 2)) {
        lis_clear();
        lis[8].classList.add("active");
    }
}
function page_locate(e) {
    if(e.target.closest("li") === lis[1]) document.documentElement.scrollTop = hot.offsetTop + 5;
    else if(e.target.closest("li") === lis[2]) document.documentElement.scrollTop = recommend.offsetTop + 5;
    else if(e.target.closest("li") === lis[3]) document.documentElement.scrollTop = brand.offsetTop + 5;
    else if(e.target.closest("li") === lis[4]) document.documentElement.scrollTop = houseware.offsetTop + 5;
    else if(e.target.closest("li") === lis[5]) document.documentElement.scrollTop = delicacy.offsetTop + 5;
    else if(e.target.closest("li") === lis[6]) document.documentElement.scrollTop = costume.offsetTop + 5;
    else if(e.target.closest("li") === lis[7]) document.documentElement.scrollTop = New.offsetTop + 5;
    else if(e.target.closest("li") === lis[8]) document.documentElement.scrollTop = contact.offsetTop + 5;
}
// ***************************电梯导航********************************