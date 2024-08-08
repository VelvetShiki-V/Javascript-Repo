const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user.js')
const goodsRouter = require('./router/goods.js')
const fs = require('fs')
// const fileUpload = require('express-fileupload')

// 全局配置
const server = express()                // 创建服务器实例

// 静态资源托管
server.use(express.static('src'))

// 全局中间件
// server.use(fileUpload())
server.use(cors())
server.use(express.json())
server.use((req, res, next) => {
    console.log('\n**************************************************************')
    console.log(`接收到请求主机: ${req.ip}, 路由为${req.url}的${req.method}请求`)
    if (req.body) console.log(`接收到传输数据: `, req.body)
    console.log('**************************************************************\n')
    next()
})

// 模块路由——用户注册/登录
server.use(userRouter)
server.use(goodsRouter)

// 获取主页
server.get('/', (req, res) => {
    console.log('用户获取主页')
    fs.readFile('./src/dist/index.html', 'utf-8', (err, str) => {
        if (err) {
            console.log('err: ', err.message)
            res.status(404).send('read error')
        }
        else res.status(200).send(str)
        console.log('读取成功', str)
    })
})

// 错误中间件
server.use((req, res, err, next) => {
    console.log(err.message);
    res.status(500).json({ message: err.message })
    next()
})

server.listen(8081, () => { console.log('server listening on port 8081') })