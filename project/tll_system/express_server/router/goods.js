const express = require('express')
const mysql = require('mysql2')
const { token_verification } = require('../utils/my_jwt')
const router = express.Router()

const db = mysql.createConnection({     // 连接数据库
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'zcx984288627',
    database: 'tll_server_db'
})

// 获取banner主图
router.get('/banner', (req, res) => {
    console.log('正在执行/banner获取商品列表查询...')
    const query_str = 'select * from banner'
    db.query(query_str, (err, result) => {
        if(err) {
            console.log('检索失败', err.message)
            res.status(400).json({ 'message': err.message })
        }
        else if (result.length === 0) {
            console.log('banner列表为空')
            res.status(200).json({ 'message': 'banner列表为空' })
        }
        else if(result.length) {
            console.log('获取banner成功')
            res.status(200).json({
                'message': '获取banner成功',
                'data': result
            })
        }
        else throw new Error('banner获取失败, 内部错误500')
    })
})

// 获取商品列表
router.get('/goods', (req, res) => {
    console.log('正在执行/goods获取商品列表查询...')
    const query_str = `select * from goods`
    // console.log("检索数据库:", query_str)
    db.query(query_str, (err, result) => {
        if (err) {
            console.log("检索失败: ", err.message)
            res.status(400).json({ "message": err.message })
        }
        else if (result.length === 0) {
            console.log(`商品数据为空`)
            res.status(200).json({ "message": "商品数据为空" })
        }
        // 获取成功
        else if (result.length) {
            console.log(`获取商品列表成功, 共有${result.length}条数据`)
            res.status(200).json({
                "message": `获取商品列表成功, 共有${result.length}条数据`,
                "data": result
            })
        }
        else throw new Error('goods list获取失败, 内部错误500')
    })
})

// 商品加购
router.post('/add_goods', (req, res) => {
    console.log('正在执行/add_goods插入或更新...')
    const goods_info = req.body
    if(token_verification(goods_info.token)) { 
        // 查询购物车是否存在相同商品（第一层：gid判断）
        let query_str = `select * from orders where uid = ${goods_info.uid} and gid = ${goods_info.gid}`
        console.log(query_str)
        db.query(query_str, (err, result) => {
            if(err) {
                console.log('查询失败: ', err.message)
                res.status(400).json({ 'message': err.message })
            }
            else if(result.length === 0) {
                // gid不同，直接插入
                console.log('未找到相同商品，将插入新商品')
                query_str = `insert into orders (username, uid, gid, count, supplements) values 
                ('${goods_info.username}', ${goods_info.uid}, ${goods_info.gid}, ${goods_info.count}, '${JSON.stringify(goods_info.supplements)}')`
                console.log(query_str)
                db.query(query_str, (err, result) => {
                    if(err) {
                        console.log('加购失败: ', err.message)
                        res.status(400).json({ 'message': err.message })
                    }
                    else if(result.affectedRows === 1) {
                        console.log('加购成功')
                        res.status(200).json({ 'message': '商品加购成功' })
                    }
                    else throw new Error('/add_goods: 内部错误')
                })
            }
            else if(result.length) {
                // 查询到gid存在，开始第二层查询（supplements判断）
                query_str = `select * from (select * from orders where uid = ${goods_info.uid}\
                     and gid = ${goods_info.gid}) as temp where supplements = \
                     '${JSON.stringify(goods_info.supplements)}' and status != 'paid'`
                console.log(query_str)
                db.query(query_str, (err, result) => {
                    if(err) {
                        console.log('找到相同商品, 但查询失败: ', err.message)
                        res.status(400).json({ 'message': err.message })
                    }
                    else if(result.length === 0) {
                        console.log('找到相同商品, 但supplements不存在或已为paid, 插入该商品')
                        query_str = `insert into orders (username, uid, gid, count, supplements) values 
                        ('${goods_info.username}', ${goods_info.uid}, ${goods_info.gid}, ${goods_info.count}, '${JSON.stringify(goods_info.supplements)}')`
                        db.query(query_str, (err, result) => {
                            if(err) {
                                console.log('加购失败: ', err.message)
                                res.status(400).json({ 'message': err.message })
                            }
                            else if(result.affectedRows === 1) {
                                console.log('加购成功')
                                res.status(200).json({ 'message': '商品加购成功' })
                            }
                            else throw new Error('/add_goods: 内部错误')
                        })
                    }
                    else if(result.length) {
                        console.log('找到相同商品, 且supplements相同与status不同, 该商品数量增加')
                        const new_count = result[0].count + goods_info.count
                        query_str =  `update orders set count = ${new_count} where uid = ${goods_info.uid} 
                        and gid = ${goods_info.gid} and supplements = '${JSON.stringify(goods_info.supplements)}'`
                        db.query(query_str, (err, result) => {
                            if(err) {
                                console.log('同supplements商品数量增加失败: ', err.message)
                                res.status(400).json({ 'message': err.message })
                            }
                            else if(result.affectedRows === 1) {
                                console.log('同supplements商品数量更新成功')
                                res.status(200).json({ 'message': '同supplements商品数量更新成功' })
                            }
                            else throw new Error('/add_goods: 内部错误')
                        })
                    }
                })
            }
        })
    } else res.status(401).json({ 'message': 'token失效' })
})

// 指定用户购物车物品获取
router.post('/cart_item', (req, res) => {
    console.log('正在执行/cart_item查询...')
    const user_info = req.body
    if(token_verification(user_info.token)) { 
        query_str = `select * from orders, goods where uid = ${user_info.uid} and orders.gid = goods.gid`
        db.query(query_str, (err, result) => {
            if(err) {
                console.log('查询购物车物品失败: ', err.message)
                res.status(400).json({ 'message': err.message })
            }
            else if(result.length === 0) {
                console.log('购物车为空')
                res.status(200).json({ 
                    message: '购物车为空' ,
                    data: []
                })
            }
            else if(result.length) {
                console.log(`获取用户${user_info.uid}购物车物品成功`)
                res.status(200).json({ 
                    message: '获取购物车物品成功',
                    data: result
                })
            }
            else throw new Error('/cart_item: 内部错误')
        })
    } else res.status(401).json({ 'message': 'token失效' })
})

// 商品数量修改
router.post('/amount_change', (req, res) => {
    console.log('正在执行/amount_change数量修改...')
    const goods_info = req.body
    if(token_verification(goods_info.token)) {
        const query_str = `update orders set count = ${goods_info.count} where oid = ${goods_info.oid}`
        db.query(query_str, (err, result) => {
            if(err) {
                console.log('商品数量更新失败: ', err.message)
                res.status(400).json({ message: err.message})
            }
            else if(result.affectedRows === 1) {
                console.log('商品数量更新成功')
                res.status(200).json({ message: '商品数量更新成功' })
            }
            else throw new Error('/amount_change: 500内部错误')
        })
    } else res.status(401).json({ 'message': 'token失效' })
})

// 删除商品
router.post('/del_item', (req, res) => {
    console.log('正在执行/del_item删除...')
    const goods_info = req.body
    if(token_verification(goods_info.token)) {
        const query_str = `delete from orders where oid = ${goods_info.oid}`
        db.query(query_str, (err, result) => {
            if(err) {
                console.log('删除条目失败: ', err.message)
                res.status(400).json({ message: '/del_item失败: ' + err.message })
            }
            else if (result.affectedRows === 1) {
                console.log(`删除商品oid: ${goods_info.oid}成功`)
                res.status(200).json({ message: '条目删除成功' })
            }
            else throw new Error('/del_item: 500内部错误')
        })
    } else res.status(401).json({ message: '/del_item失败: token失效' })
})

// 删除多个或全部商品
router.post('/del_multi', (req, res) => {
    console.log('正在执行/del_multi删除...')
    const goods_info = req.body
    if(token_verification(goods_info.token)) {
        const pre_query = 'delete from orders where uid = ? and oid in (?)'
        db.query(pre_query, [goods_info.uid, goods_info.oids], (err, result) => {
            if(err) {
                console.log('删除条目失败: ', err.message)
                res.status(400).json({ message: '/del_multi失败: ' + err.message })
            }
            else if(result.affectedRows === 0) {
                console.log(`用户${goods_info.uid}所属购物车为空, 无需删除`)
                res.status(200).json({
                    status: 404,
                    message: `用户${goods_info.uid}所属购物车为空, 无需删除`
                 })
            }
            else if (result.affectedRows) {
                console.log(`用户${goods_info.uid}购物车多件物品删除成功`)
                res.status(200).json({
                    status: 200,
                    message: '多件物品删除成功'
                 })
            }
            else throw new Error('/del_multi: 500内部错误')
        })
    } else res.status(401).json({ message: '/del_multi失败: token失效' })
})

// 商品状态改变
router.post('/status_change', (req, res) => {
    console.log('正在执行/status_change更新...')
    const goods_info = req.body
    if(token_verification(goods_info.token)) {
        const query_str = `update orders set status = '${goods_info.status}' where oid = ${goods_info.oid}`
        db.query(query_str, (err, result) => {
            if(err) {
                console.log('商品状态改变失败: ', err.message);
                res.status(400).json({ message: '/status_change失败: ' + err.message })
            }
            else if (result.affectedRows === 1) {
                console.log(`商品状态更新成功: ${goods_info.status}`)
                res.status(200).json({ message: '商品状态改变成功: ' + goods_info.status })
            }
            else throw new Error('/status_change: 500内部错误')
        })
    } else res.status(401).json({ message: '/status_change失败: token失效' })
})

// 所有商品状态改变
router.post('/status_change_all', (req, res) => {
    console.log('正在执行status_change_all更新...')
    const goods_info = req.body
    if(token_verification(goods_info.token)) {
        const query_str = `update orders set status = '${goods_info.status}' where uid = ${goods_info.uid} and status != 'paid'`
        db.query(query_str, (err, result) => {
            if(err) {
                console.log('所有商品状态改变失败: ', err.message);
                res.status(400).json({ message: '/status_change_all更新失败: ' + err.message })
            }
            else if (result.affectedRows) {
                console.log(`所有商品状态更新成功: ${goods_info.status}`)
                res.status(200).json({ message: '所有商品状态改变成功: ' + goods_info.status })
            }
            else throw new Error('/status_change_all: 500内部错误')
        })
    } else res.status(401).json({ message: '/status_change_all: token失效' })
})

// 提交订单并修改待付款商品状态
router.post('/pay', (req, res) => {
    console.log('正在执行支付并更新商品订单状态...')
    const goods_info = req.body
    if(token_verification(goods_info.token)) {
        // update orders set status = 'unpaid' where oid in ([39, 41])
        const pre_query = 'update orders set status = ? where oid in (?)' 
        db.query(pre_query, ['paid', goods_info.oids], (err, result) => {
            if(err) {
                console.log('/pay更新失败: ', err.message)
                res.status(400).json({ message: err.message })
            }
            else if(result.affectedRows === 0) {
                console.log(`用户${goods_info.uid}没有需要支付的订单`)
                res.status(404).json({ message: `用户${goods_info.uid}没有需要支付的订单` })
            }
            else if(result.affectedRows) {
                console.log(`用户${goods_info.uid}已完成订单支付`)
                res.status(200).json({ message: `用户${goods_info.uid}已完成订单支付` })
            }
            else throw new Error('/pay: 500内部错误')
        })
    } else res.status(401).json({ message: '/pay: token失效' })
})

// 获取已付款商品
router.post('/get_paid', (req, res) => {
    console.log('正在查询已付款商品...')
    const goods_info = req.body
    if(token_verification(goods_info.token)) {
        const pre_query = 'select * from orders where uid = ? and status = ?'
        db.query(pre_query, [goods_info.uid, goods_info.status], (err, result) => {
            if(err) {
                console.log('付款商品查询失败: ', err.message)
                res.status(400).json({ message: '付款商品查询失败: ' + err.message })
            }
            else if(result.length === 0) {
                console.log(`用户${goods_info.uid}暂无已付款商品`)
                res.status(200).json({
                    message: `用户${goods_info.gid}暂无已付款商品`,
                    data: []
                 })
            }
            else if(result.length) {
                console.log(`获取到用户${goods_info.uid}已付款商品`)
                res.status(200).json({
                    message: `获取到用户${goods_info.gid}已付款商品`,
                    data: result
                 })
            }
            else throw new Error('/get_paid: 500内部错误')
        })
    } else res.status(401).json({ message: '/get_paid: token失效' })
})

module.exports = router