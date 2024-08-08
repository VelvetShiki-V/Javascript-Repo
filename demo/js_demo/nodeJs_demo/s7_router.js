const express = require("express");
const router_user  = require("./src/router_user");

const server = express();
// 注册自定义路由模块
server.use(router_user);

server.listen(80, () => {
    console.log("express server running at port 80");
});