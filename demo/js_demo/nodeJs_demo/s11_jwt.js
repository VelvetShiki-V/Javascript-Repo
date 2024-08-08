// 模块引入
// const jwt = require("jsonwebtoken");       // 用于将数据加密为JWT
// const {expressjwt: expressJWT} = require("express-jwt");    // 用于将jwt字符串还原为用户数据对象
const express = require("express");
const jwt = require("./src/my_jwt");
const cors = require("cors");
const mysql = require("mysql");
const router_index = require("./src/index");        // 模块路由

// 中间件注册
const server = express();       // 创建服务器实例
server.use(express.json());
server.use(cors());
server.use((req, res, next) => {
    console.log(`接收到请求主机: ${req.ip}, 路由为${req.url}的${req.method}请求`);
    if(req.body)console.log(`接收到传输数据: `, req.body);
    next();
});
// 设置秘钥
const secret_key = "VelvetShiki";

// jwt还原为用户对象 + 路由过滤
// server.use((req, res, next) => {
//     expressJWT({
//         secret: secret_key,
//         algorithms: ["HS256"]
//     }).unless({
//         path: [/^\/api\//]
//     });
//     next();
// });

// 连接本地数据库
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "zcx984288627",
    database: "test_db"
});

// 普通路由
server.get("/", (req, res) => {
    res.send("<h1>Welcome</h1>");
});

server.get("/hello", (req, res) => {
    res.send("<h1>Hello!</h1>");
});

// 注册
server.post("/register", (req, res) => {
    // 用户注册
    const query_str = "insert into admin set ?;";
    db.query(query_str, req.body, (err, result) => {
        if(err) {
            console.log("用户注册失败: ", err.message);
            res.send({
                "status": 400,
                "message": err.message,
            })
        }
        else if(result.affectedRows === 1) {
            console.log("用户注册成功");
            res.send({
                "status": 200,
                "message": "注册成功"
            });
        }
    });
});

// 登录
server.post("/login", (req, res) => {
    const user_info = req.body;
    const query_str = `select * from admin where username = '${user_info.username}' and password = '${user_info.password}'`;
    console.log("检索数据库:", query_str);
    db.query(query_str, (err, result) => {
        console.log(result);
        if(err) {
            console.log("用户登录失败: ", err.message);
            res.send({
                "status": 400,
                "message": err.message,
            })
        }
        else if(result.length === 0) {
            console.log(`用户名${user_info.username}或密码错误`);
            res.send({
                "status": 404,
                "message": "用户名或密码错误",
            });
        }
        // 仅获取唯一的用户数据数组
        else if(result.length === 1) {
            console.log(`用户${user_info.username}登录成功`);
            const token = jwt.jwt_fn({
                "username": user_info.username
            }, secret_key, 10);
            res.send({
                "status": 200,
                "message": "登录成功",
                "token": token
            })
            console.log("login token: ", jwt.jwt_verify());
        }
        else {
            console.log("500 Internal Error!!!");
            res.send({
                "status": 500,
                "message": "内部错误"
            });
        }
    })
});

// 加密路由（主页访问）
server.use(router_index);

// 加密路由错误中间件
server.use((req, res, err, next) => {
    if(err.name === "UnauthorizedError") 
        return res.send({
            status: 401,
            message: "无效token"
        });
    else res.send({
        status: 500,
        message: "未知错误"
    });
    next();
});

// 监听端口
server.listen(80, () => {
    console.log("express jwt server running at port 80");
});