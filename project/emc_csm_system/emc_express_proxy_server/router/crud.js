const request = require('../utils/request') 
const express = require('express')
const router = express.Router()

// 登出
router.post('/logout', async (req, res) => {
    console.log('正在执行代理logout...')
    // 尽管设置了baseURL，但是在post方法中提供了一个完整的URL，axios会使用这个完整的URL进行请求，而忽略baseURL
    const ret = await request.post('https://cloud.myemc.net.cn/admin/user/logout', req.body)
    if(ret === false) {
        console.log('登出失败: ', ret)
        res.status(401).json({
            status: 401,
            message: 'logout失败'
         })
    }
    else if(ret === true) {
        console.log('登出成功')
        res.status(200).json({ message: 'logout成功' })
    }
    else console.log('未知错误500: ', ret)
})

// token验证
router.post('/verify', async (req, res) => {
    console.log('正在执行代理token verify...')
    const ret = await request.post('https://cloud.myemc.net.cn/admin/user/verify', req.body)
    if(ret === false) {
        console.log('token验证失败: ', ret)
        res.status(200).json({
            status: 401,
            message: 'token失效'
         })
    }
    else if(ret === true) {
        console.log('token认证成功')
        res.status(200).json({
            status: 200,
            message: 'token认证成功'
         })
    }
    else console.log('未知错误500: ', ret)
})

// 获取数据
router.post('/browse', async (req, res) => {
    console.log('正在执行代理browse...')
    const ret = await request.post('/browse', req.body)
    if(ret === false) {
        console.log('数据获取失败: ', ret)
        res.status(400).json({ message: 'browse失败' })
    }
    else {
        console.log('数据获取成功')
        res.status(200).json(ret)
    }
})

// 获取所有表名
router.post('/tables', async (req, res) => {
    console.log('正在执行代理tables...')
    const ret = await request.post('/tables', req.body)
    if(ret === false) {
        console.log('表名获取失败: ', ret)
        res.status(400).json({ message: 'tables失败' })
    }
    else {
        console.log('表名获取成功')
        res.status(200).json(ret)
    }
})

// 获取单表结构
router.post('/schema', async (req, res) => {
    console.log('正在执行代理schema...')
    const ret = await request.post('/schema', req.body)
    if(ret === false) {
        console.log('schema获取失败: ', ret)
        res.status(400).json({ message: 'schema失败' })
    }
    else {
        console.log('schema获取成功')
        res.status(200).json(ret)
    }
})

// 插入数据
router.post('/set', async (req, res) => {
    console.log('正在执行代理set...')
    const ret = await request.post('/set', req.body)
    if(ret === false) {
        console.log('插入失败: ', ret)
        res.status(400).json({ message: 'set插入失败' })
    }
    else if(ret === true) {
        console.log('插入成功')
        res.status(200).json({ message: 'set成功' })
    }
    else console.log('未知错误500: ', ret)
})

// 更新数据
router.post('/update', async (req, res) => {
    console.log('正在执行代理update...')
    const ret = await request.post('/update', req.body)
    if(ret === false) {
        console.log('更新失败: ', ret)
        res.status(400).json({ message: 'update失败' })
    }
    else if(ret === true) {
        console.log('更新成功')
        res.status(200).json({ message: 'update成功' })
    }
    else console.log('未知错误500: ', ret)
})

// 删除数据
router.post('/delete', async (req, res) => {
    console.log('正在执行代理delete...')
    const ret = await request.post('/delete', req.body)
    if(ret === false) {
        console.log('删除失败: ', ret)
        res.status(400).json({ message: 'delete失败' })
    }
    else if(ret === true) {
        console.log('删除成功')
        res.status(200).json({ message: 'delete成功' })
    }
    else console.log('未知错误500: ', ret)
})

module.exports = router