const express = require("express");

const server = express();

// 将当前路径的src资源目录添加为静态资源托管，客户端可访问该目录下所有内容，且不带该目录名
server.use(express.static("./src"));

// 托管多个目录，则多次调用express.static即可

server.listen(80, () => {console.log("express server running at port 80");});