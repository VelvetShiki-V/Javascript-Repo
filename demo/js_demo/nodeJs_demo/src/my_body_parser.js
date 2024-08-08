// 内置querystring模块用来解析json串
const qs = require("querystring");

// 定义中间件方法
const urlencoded_parser = (req, res, next) => {
    let received_str = "";
    // 1. 监听body读取data事件，每触发一次就拼接一次表单json串
    req.on("data", (str) => {
        if(str) received_str += str;
    });
    // 2. 读取完毕，将json串解析为js对象
    req.on("end", () => {
        console.log("获取到json串", received_str);
        // 3. 解析json串为js对象
        // content = JSON.parse(content);       // 此方法用来解析content-type: application/json
        const obj = qs.parse(received_str);     // 此方法用来解析content-type: x-www-form-urlencoded
        console.log("json串解析为:", obj);
        // 4. 将对象挂载到req.body上
        req.body = obj;
        // 5. next回调必须调用，用以在此中间件方法结束后下一个链式路由方法的调用
        // 必须写在end监听事件中，通过回调的req监听on方法来执行next回调
        next();
    });
}

// 6. 导出中间件并被服务器引入和注册（注意导出的是对象还是方法！！！）
module.exports = urlencoded_parser;			// 导出为中间件方法
// module.exports = {
	// parser_fn = urlencoded_parser;		// 导出为中间件对象
// }