const express = require('express')
const mysql = require('mysql2')
const jwt = require('../utils/my_jwt')

const router = express.Router()
const secret_key = "VelvetShiki";       // 设置秘钥

const db = mysql.createConnection({     // 连接数据库
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'zcx984288627',
    database: 'tll_server_db'
})

// 登录
router.post('/login', (req, res) => {
    console.log('正在执行/login查询用户是否存在...')
    const user_info = req.body
    const query_str = `select * from user where username = '${user_info.username}' and password = '${user_info.password}'`
    db.query(query_str, (err, result) => {
        // console.log(result)
        if (err) {
            console.log("用户检索失败: ", err.message)
            res.status(400).json({ "message": err.message })
        }
        else if (result.length === 0) {
            console.log(`用户名${user_info.username}或密码错误`)
            res.status(404).json({ "message": "用户名或密码错误" })
        }
        // 仅获取唯一的用户数据数组
        else if (result.length === 1) {
            console.log(`用户${user_info.username}登录成功, 获取到用户uid: ${result[0].uid}`)
            const token = jwt.jwt_gen({ "uid": result[0].uid }, secret_key, 1800)     // params: info, key, expire
            res.status(200).json({
                "message": "登录成功",
                "token": token,
                "uid": result[0].uid,
                "username": result[0].username
            })
        }
        else throw new Error('/login: 内部错误500')
    })
})

// 注册
router.post('/register', (req, res) => {
    console.log('正在执行/register添加新用户...')
    const query = "insert into user set ?"
    db.query(query, req.body, (err, result) => {
        if (err) {
            console.log("用户注册失败: ", err.message)
            res.status(400).json({ "message": err.message })
        }
        else if (result.affectedRows === 1) {
            console.log("用户注册成功")
            res.status(200).json({ "message": "用户注册成功" })
        }
        else throw new Error('/register: 内部错误500')
    })
})

// 验证token有效性(与前端前置守卫结合使用, 注意不管失效与否都返回200 ok, 合法性在data中的status判断)
router.post('/token_verify', (req, res) => {
    const token = req.body.token
    if(jwt.token_verification(token)) {
        console.log('token合法且在有效期内')
        res.status(200).json({
            status: 200,
            message: 'token合法且在有效期内' 
        })
    } else res.status(200).json({ 
        status: 401,
        message: 'token失效' 
    })
})

module.exports = router