// show
const small = document.querySelector(".small");
const middle = document.querySelector(".middle");
const layer = document.querySelector(".middle .layer");
const large = document.querySelector(".large");

small.addEventListener("mouseover", function(e) {
    if(e.target.tagName === "IMG") {
        const active = document.querySelector(".show_active");
        if(active) active.classList.remove("show_active");
        // middle显示
        const img = middle.querySelector("img");
        img.src = e.target.src;
        // small切换
        e.target.classList.add("show_active");
        // large加载
        large.style.backgroundImage = `url(${img.src})`;
    }
});

middle.addEventListener("mouseenter", function() {
    layer.style.display = "block";
    large.style.display = "block";
});

middle.addEventListener("mousemove", function(e) {
    // 获取鼠标坐标(需考虑到页面相对于可视窗口距离，页面滚轮距离)
    let x = e.pageX - middle.getBoundingClientRect().left;
    let y = e.pageY - middle.getBoundingClientRect().top - scrollY;
    // console.info("x: ", x, "y: ", y);
    // 滑块移动
    if(x >= 0 && x <= 400 && y >= 0 && y <= 400) {
        let layerX = 0, layerY = 0;
        if(x <= 100) layerX = 0;
        if(x >= 100 && x <= 300) layerX = x - 100;      // 指针置中
        if(x >= 300) layerX = 200;
        if(y <= 100) layerY = 0;
        if(y >= 100 && y <= 300) layerY = y - 100;
        if(y >= 300) layerY = 200;
        layer.style.left = layerX + "px";
        layer.style.top = layerY + "px";
        // 预览图显示
        large.style.backgroundPositionX = -2 * layerX + "px";       // 放大图移动是反向
        large.style.backgroundPositionY = -2 * layerY + "px";       // 且移动距离应为middle二倍
    }
});

middle.addEventListener("mouseleave", function() {
    layer.style.display = "none";
    large.style.display = "none";
});

// desc
const color = document.querySelector(".type #color");
const size = document.querySelector(".type #size");

color.addEventListener("click", function(e) {
    const active = document.querySelector("#color .active");
    if(active) active.classList.remove("active");
    e.target.classList.add("active");
});

size.addEventListener("click", function(e) {
    const active = document.querySelector("#size .active");
    if(active) active.classList.remove("active");
    e.target.classList.add("active");
});

// numbox
const minus = document.querySelector("[name=minus]");
const plus = document.querySelector("[name=plus]");

minus.addEventListener("click", function() {
    const count = document.querySelector("[name=count]");
    if(count.value == 1) return;
    --count.value;
});

plus.addEventListener("click", function() {
    const count = document.querySelector("[name=count]");
    if(count.value == 99) return;
    ++count.value;
});