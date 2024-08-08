const express = require("express");
const router_user  = require("./src/router_user");

const server = express();
// 定义全局中间件函数
const mw_fn = (req, res, next) => {
    // console.log("这是一个全局中间件函数mw_fn");
    req.id = 10000;
    req.time = Date.now();      // 自定义中间件属性，与后面的中间件函数共享
    next();
}
server.use(mw_fn);		// 注册全局中间件函数，任何路由方法执行前都将先执行中间件函数

// 注册express内置中间件以解析json和form-urlencoded数据
server.use(express.json());
// server.use(express.urlencoded({ extended: false }));

// 引入cors跨域中间件并注册
const cors = require("cors");
server.use(cors);

// 引入自定义中间件模块(require返回一个module.exports指向的对象)
// app.use()需要该对象中的一个中间件方法
// 注意自定义模块导出的中间件是方法还是对象！！！
const my_parser = require("./src/my_body_parser");
// server.use(my_parser.parser_fn);      // 若导出为一个js对象，则需要显式将对象指向的方法写出来
server.use(my_parser);      // 若导出为函数，则直接写模块名即可
// console.log(my_parser);

server.post("/form_json_analysis", (req, res) => {
    console.log(`access to url ${req.url}, received data: `, req.body);
    res.send(`接收到表单json数据: ` + JSON.stringify(req.body));
});

// 接收类型为纯json
server.post("/json_submit", (req, res) => {
    console.log(`access to url ${req.url}, received data: `, req.body);
    // 发送数据若为对象，必须先序列化再发送
    res.send(`接收到json数据: ` + JSON.stringify(req.body));
});

// 接收类型为表单json数据
server.post("/form_submit", (req, res) => {
    console.log(`access to url ${req.url}, received data: `, req.body);
    res.send(`接收到表单json数据: ` + JSON.stringify(req.body));
});

// 定义局部中间件函数
const mw_part = (req, res, next) => {
    console.log("调用了局部中间件");
    next();
}

// 指定路由调用局部中间件
server.get("/util", mw_part, (req, res) => {
    console.log(`access to url ${req.url}, access id: ${req.id}, access timestamp: ${req.time}`);
    // console.log("将制造一个异常被错误中间件接收");
    // throw new Error("服务器内部错误！");
    res.send("success");
})

// 模块路由
server.use(router_user);

// 错误级中间件
server.use((err, req, res, next) => {
    console.log("服务器内部错误: ", err.message);
    res.send(err.message);
})

server.listen(80, () => {
    console.log("express server running at port 80");
});