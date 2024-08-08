const express = require("express")
const cors = require("cors")
const server = express()
const crudRouter = require('./router/crud')
server.use(express.json())
server.use(cors())
const fs = require('fs')

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

server.listen(80, () => {
    console.log("express server running at port 80")
})
