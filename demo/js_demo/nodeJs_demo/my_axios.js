function my_axios(config) {
    return new Promise((resolve, reject) => {
        // 初始化属性
        const xhr = new XMLHttpRequest();
        let serialized_data = {};
        // 查询参数
        if(config.params) {
            const qs = new URLSearchParams(config.params);
            config.url += `?${qs.toString()}`;
        }
        // 请求方法判断并填入方法和url
        xhr.open(config.method || "GET", config.url);
        if(config.data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            serialized_data = JSON.stringify(config.data);
        }
        // 注册响应接收方法
        xhr.addEventListener("loadend", () => {
            if(xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            }
            else {
                reject(new Error(xhr.response));
            }
        });
        // console.log(xhr);
        // console.log(serialized_data);
        // 发送请求
        config.method === "get" ? xhr.send() : xhr.send(serialized_data);
    });
}