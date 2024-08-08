// 导入express模块 
const express = require("express");
const cors = require("cors");
const jwt = require("./src/my_jwt");

// 创建express服务器实例
const server = express();
// server.use(jwt)

// 监听端口
server.listen(80, () => {
    console.log("express server running at port: 80");
});

server.use(express.json());
server.use(cors());

// 日志中间件
server.use((req, res, next) => {
    console.log(`接收到请求主机为: ${req.ip}的${req.method}请求，url路由为 ${req.url}`);
    console.log("接收到数据:", req.body);
    next();
});

// get
server.get("/", (req, res) => {
    // console.log(`获取请求，url: ${req.url}, method: ${req.method}`);
    // console.log(req.query);
    // res.send("欢迎！");
    console.log("检查状态: ", jwt.token_valid);
    if(jwt.token_valid) {
        res.send(jwt.jwt_fn({
          "username": "velvet"
        }, "velvetshiki", 3));
    }
    else res.send({
        "status": 401,
        "message": "token失效"
    })
});

// 查询参数
server.get("/login", (req, res) => {
    console.log(`获取请求，url: ${req.url}, method: ${req.method}, params: ${req.query}`);
    console.log(req.query);
    res.send(`get请求携带查询参数为: ${req.query}`);
});

// 动态请求参数(携带多个动态请求参数)
server.get("/login/:id/:name", (req, res) => {
    console.log(`获取请求，url: ${req.url}, method: ${req.method}`);
    console.log("动态请求参数: ", req.params);
    res.send(`get请求携带请求参数为: ` + req.params);
})

// post
server.post("/register", (req, res) => {
    console.log(`获取请求，url: ${req.url}, method: ${req.method}`);
    res.send({name: "V", age: 18, id: 10086});
});

server.post("/form_submit", (req, res) => {
    res.send(req.body);
});