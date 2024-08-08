const fs = require("fs");

// // 读取文本
// fs.readFile("./src/test.txt", "utf-8", (err, str) => {
//     if(err) console.log(err.message);
//     else {
//         console.log("读取到: ", str);
//         let new_str = "";
//         // 转换格式
//         new_str = splace(str);
//         // 写入新文件
//         fs.writeFile("./src/test2.txt", new_str, "utf-8", err => {
//             if(err) console.log("写入失败: ", err.message);
//             else console.log("写入成功:\n", new_str);
//         })
//     }
// })

// // 分割+转换格式函数
// function splace(input) {
//     // 1. 空格分割字符串
//     const words = input.split(" ");
//     // 2. 替换字符串
//     let new_arr = [];
//     for(let item of words) new_arr.push(item.replace("=", ":"));
//     return new_arr.join("\n");
// }

// console.log(__dirname);
// console.log(__dirname + "/src/test.txt");

async function read_file() {
    const str = await fs.readFile("./src/login.html", "utf-8", (err, str) => {
        if(err) console.log("login.html读取失败");
    });
}

read_file();
console.log(g_login);

// fs.readFile("./src/register.html", "utf-8", (err, str) => {
//     if(err) console.log("register.html读取失败");
//     else register = str;
// });