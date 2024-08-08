const express = require("express")
const https = require('https')
const cors = require("cors")
const server = express()
const crudRouter = require('./router/crud')
server.use(express.json())
server.use(cors())
const fs = require('fs')

// https SSL认证
const options = {
    key: fs.readFileSync('/etc/ssl/private/cloud.myemc.net.cn.key'),
    cert: fs.readFileSync('/etc/ssl/certs/cloud.myemc.net.cn_bundle.crt')
}

server.use((req, res, next) => {
    console.log(`\n\n接收到请求主机为: ${req.ip}的${req.method}请求, url路由为 ${req.url}`)
    console.log("接收到数据:", req.body)
    next()
})

server.use(crudRouter)

// 错误中间件
server.use((req, res, err, next) => {
    console.log(err.message);
    res.status(500).json({ message: err.message })
    next()
})

// https服务器创建: server 作为第二个参数传递传入https created, 就可以处理所有通过 HTTPS 服务器接收到的请求
https.createServer(options, server).listen(8199, () => {
    console.log('express https server running at port 8199')
})

// server.listen(80, () => {
//     console.log("express server running at port 80")
// })
