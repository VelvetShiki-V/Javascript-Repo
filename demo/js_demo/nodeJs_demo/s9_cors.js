const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors());

// 日志中间件
server.use((req, res, next) => {
    console.log(`接收到请求主机为: ${req.ip}的${req.method}请求，url路由为 ${req.url}`);
    console.log("接收到数据:", req.body);
    next();
});

// 默认路由
server.get("/", (req, res) => {
    res.send("<h1>Welcome!</h1>");
});

// 接收用户传输的json数据
server.post("/form_submit", (req, res) => {
    res.send(JSON.stringify(req.body));
});

server.post("/plain", (req, res) => {
    console.log("接收到简单请求");
    res.send("收到简单请求");
});

server.listen(80, () => { 
    console.log("express server running at port 80"); 
});