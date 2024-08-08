const express = require("express");
const router = express.Router();
const jwt = require("./my_jwt");

// 根据jwt是否有效判断请求是否成功
function judge(req, res) {
    if(jwt.jwt_verify()) {
        res.send({
            "status": 200,
            "message": "请求成功"
        });
    }
    else {
        res.send({
            "status": 401,
            "message": "token无效"
        });
    }
}

// 购物车路由
router.get("/private/cart", (req, res) => {
    console.log("cart token: ", jwt.jwt_verify());
    judge(req, res);
});

// 收藏路由
router.get("/private/star", (req, res) => {
    console.log("star token: ", jwt.jwt_verify());
    judge(req, res);
});

// 支付路由
router.get("/private/pay", (req, res) => {
    console.log("pay token: ", jwt.jwt_verify());
    judge(req, res);
});

module.exports = router;