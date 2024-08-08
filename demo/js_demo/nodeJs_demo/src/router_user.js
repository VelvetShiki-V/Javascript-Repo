// 模块化路由——注册，登录
const express = require("express");
const fs = require("fs");
// 创建路由实例
const router = express.Router();

// 挂载具体路由
router.get("/", (req, res) => {
    console.log(`access to url /, access id: ${req.id}, access timestamp: ${req.time}`);
    res.send("<h1>Welcome!</h1>")
});

router.get("/login", (req, res) => {
    console.log(`access to url /login, access id: ${req.id}, access timestamp: ${req.time}`);
    fs.readFile("./src/login.html", (err, str) => {
        if(err) console.log("login.html读取失败: ", err.message);
        else res.send(str);
    })
});

router.get("/register", (req, res) => {
    console.log(`access to url /register, access id: ${req.id}, access timestamp: ${req.time}`);
    fs.readFile("./src/register.html", (err, str) => {
        if(err) console.log("register.html读取失败: ", err.message);
        else res.send(str);
    })
});

module.exports = router;