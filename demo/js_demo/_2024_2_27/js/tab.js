const content = document.querySelector(".wrapper .tab .content");
let i = 0;

// li创建
function create_et() {
    // sale创建
    content.innerHTML += `
        <div class="sale">
            <a href="#">
                <img src="" alt="">
                <strong></strong>
                <span></span>
            </a>
        </div>
    `;

    // main创建
    content.innerHTML += `
        <div class="main">
            <ul></ul>
        </div>
    `;

    // li创建
    const ul = document.querySelector(".wrapper .tab .content .main ul");
    for(let i = 0; i < 4; ++i) {
        ul.innerHTML += `
            <li>
                <a href="#">
                    <img src="" alt="">
                    <strong></strong>
                    <span></span>
                </a>
            </li>
        `;
    }
}

// 清除content
function clear_et() {
    content.innerHTML = "";
}

// 渲染content内容
function template(index) {
    // sale渲染
    const sale = document.querySelector(".wrapper .tab .content .sale a");
    sale.querySelector("img").src = images[index][0].img;
    sale.querySelector("strong").innerHTML = images[index][0].title;
    sale.querySelector("span").innerHTML = images[index][0].price;

    // main渲染
    const lis = document.querySelectorAll(".wrapper .tab .content .main ul li a");
    for(let i = 0; i < 4; ++i) {
        lis[i].querySelector("img").src = images[index][i + 1].img;
        lis[i].querySelector("strong").innerHTML = images[index][i + 1].title;
        lis[i].querySelector("span").innerHTML = images[index][i + 1].price;
    }
}

// 鼠标悬浮1——创建元素并实时渲染
// const links = document.querySelectorAll(".wrapper .tab .header .category ul li a");
// for(let i = 0; i < links.length; ++i) {
//     links[i].addEventListener("mouseenter", function() {
//         clear_et();
//         create_et();
//         template(i);
//     })
// }

// 鼠标悬浮2——创建元素并实时渲染（父元素冒泡机制优化）
const ul = document.querySelector(".wrapper .tab .header .category ul");
// 此处不使用mouseenter，因为进入ul后仅触发一次，对于子元素不会产生悬浮效果
// 而使用mouseover就能获取到其中的li和a，并根据获取到的a拿到其自定义属性dataset.id，进行渲染
ul.addEventListener("mouseover", function(e) {
    console.log(e.target.tagName);
        if(e.target.tagName === "A") {
            clear_et();
            create_et();
            console.log(e.target.dataset.id);
            template(e.target.dataset.id);
        }
    }
);


const images = [
    [
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/217143/9/33086/91387/659bc1e5F7f144092/c6d68adae08b1893.jpg.webp",
            "title":"品牌家电",
            "price":"￥33"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/244583/6/1888/129377/6594ff87Ff280189b/8424fcac13319c8b.jpg.webp",
            "title":"品牌家电2",
            "price":"￥333"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/226275/37/11445/168286/659ce639F608b7438/a73646abeaea625a.jpg.webp",
            "title":"品牌家电3",
            "price":"￥353"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/234165/25/7860/105110/65792729F058e5b4d/7780b17f922bda0a.jpg.webp",
            "title":"品牌家电4",
            "price":"￥3783"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/248808/6/2595/156462/659d163dF9490aabd/d86d28f8d44142fb.jpg.webp",
            "title":"品牌家电5",
            "price":"￥393"
        },
    ],
    [
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/246308/11/2927/152554/659e5f2fF079b3394/ea1dc933a11805b4.jpg.webp",
            "title":"国际美食",
            "price":"￥26"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/240219/29/3061/198712/659f4ef3Feaa6e1f2/60dd2d667efc40fb.jpg.webp",
            "title":"国际美食2",
            "price":"￥226"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/218941/1/22478/54818/641ab49fFcbeca31a/fef994d37d44ecca.jpg.webp",
            "title":"国际美食3",
            "price":"￥216"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/10810/35/21617/195395/659d07d0F47c293cc/3b860b4289198752.jpg.webp",
            "title":"国际美食4",
            "price":"￥526"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/81905/37/24536/148865/659e9e6bFa218912c/b05cc850bb1a7509.jpg.webp",
            "title":"国际美食5",
            "price":"￥2656"
        },
    ],
    [
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/249472/20/2723/176988/659e885aF8af45881/7ab15236c214938b.jpg.webp",
            "title":"百货奇闻1",
            "price":"￥3326"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/94907/25/45967/207228/659e4eddF44e40233/669962d1e65e75b0.jpg.webp",
            "title":"百货奇闻2",
            "price":"￥4526"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/230588/37/12346/99074/659dea90Fe96403c3/738d4857aa76a1ff.jpg.webp",
            "title":"百货奇闻3",
            "price":"￥426"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/74029/26/25603/101629/65863c8dF8cf6ad68/8c9e1b5e5aa2dc2e.jpg.webp",
            "title":"百货奇闻4",
            "price":"￥454"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/151377/23/39170/203858/6524a7efF2c046dfd/3941f50f70c25c60.jpg.webp",
            "title":"百货奇闻5",
            "price":"￥33"
        },
    ],
    [
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/241279/22/2893/130110/659ce3a8F7fd29489/985bd58881c11af1.jpg.webp",
            "title":"关爱健康",
            "price":"￥890"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/235595/21/11213/116522/659d13e3F1353d728/8bfa9814dd9cd503.jpg.webp",
            "title":"关爱健康2",
            "price":"￥8390"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/234995/37/12055/128915/659e925fF726c7703/cc68b2ec9d2b7f40.jpg.webp",
            "title":"关爱健康3",
            "price":"￥1890"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/245995/33/2696/129644/659d2f78F762a8286/3393fa368c44f13a.jpg.webp",
            "title":"关爱健康4",
            "price":"￥67890"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/228869/39/11812/141942/659d0bc2Fbdb8a264/ecbcb8a9db3ee255.jpg.webp",
            "title":"关爱健康5",
            "price":"￥5890"
        },
    ],
    [
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/243113/19/791/76122/658a6682Fee422873/9dab4d3c2db34b64.jpg.webp",
            "title":"前瞻预告",
            "price":"￥3920"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/103344/36/42992/119390/659f4a74F5137ec33/b398d6f684e9bcf3.jpg.webp",
            "title":"前瞻预告2",
            "price":"￥4490"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/233551/17/11242/233002/659ce5dbF5af2f79c/7015ca04de80d873.jpg.webp",
            "title":"前瞻预告3",
            "price":"￥3420"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/100701/8/23301/460451/6218752bEdea45b2d/2f74fb787843e473.jpg.webp",
            "title":"前瞻预告4",
            "price":"￥45640"
        },
        {
            "img":"https://m.360buyimg.com/babel/jfs/t1/225028/29/9737/111045/659f4b44F5b0ef269/4069fd317318e9da.jpg.webp",
            "title":"前瞻预告5",
            "price":"￥3110"
        },
    ]
]