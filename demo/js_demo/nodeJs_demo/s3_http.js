const fs = require("fs");
const path = require("path");
// 1. 导入http模块
const http = require("http");

// 2. 创建serveer实例
const server = http.createServer();

// 3. 绑定request事件
server.on("request", (req, res) => {
    // 基本框架demo
    // const str = `嗨嗨嗨guest: [url: ${req.url} method: ${req.method}] visited this server!`;
    // console.log(str);
    // // 设置响应报头，规定内容传输格式和编码
    // res.setHeader("Content-Type", "text/html; charset=utf-8");
    // // 设置传输内容
    // res.end(str);


    // 设置路由demo
    // res.setHeader("Content-Type", "text/html; charset=utf-8");
    // const default_content = "404 NOT FOUND";
    // if(req.url === "/" || req.url === "/index.html") res.end("<h1>欢迎！</h1>");
    // else if(req.url === "/about.html") res.end("<h1>关于我们</h1>");
    // else res.end(default_content);


    // // 读取文件资源并根据路由获取返回
    // // debug
    // console.log(`request url: ${req.url}, method: ${req.method}`);
    // // 1. 设置路由
    // const default_content = "404 NOT FOUND";
    // res.setHeader("Content-Type", "text/html; charset=utf-8");
    // if(req.url === "" || req.url === "/") res.end("<h1>欢迎！</h1>");
    // else if(req.url === "/login") {
    //     fs.readFile("./src/login.html", "utf-8", (err, str) => {
    //         if(err) console.log("login.html读取失败");
    //         else res.end(str);
    //     });
    // }
    // else if(req.url === "/register") {
    //     fs.readFile("./src/register.html", "utf-8", (err, str) => {
    //         if(err) console.log("register.html读取失败");
    //         else res.end(str);
    //     });
    // }
    // else res.end(default_content);


    // 路径优化
    // 1. 设置路由
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // 默认主页
    if(req.url === "" || req.url === "/") res.end("<h1>欢迎！</h1>")
    else {
        let fpath;
        // icon特殊处理
        if(req.url === "/favicon.ico") fpath = path.join("./src", req.url)
        // 根据url获取实际文件
        else fpath = path.join("./src", req.url) + ".html";
        console.log(fpath);
        fs.readFile(fpath, "utf-8", (err, str) => {
            if(err) console.log("文件读取失败");
            else res.end(str);
        });
    }
});

// 4. 开启监听
server.listen(80, () => {
    console.log("server running at http://127.0.0.1");
});