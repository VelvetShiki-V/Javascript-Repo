// 导入mysql模块
const mysql = require("mysql");

// 建立连接
const db = mysql.createConnection({
    host: "localhost",                 // 数据库ip地址&端口
    port: 3306,
    user: "root",                      // 登录账号
    password: "zcx984288627",          // 登录密码
    database: "test_db"                // 指定访问的数据库
});

// select
// const query_str = "select * from student;";
// db.query(query_str, (err, results) => {
//     if(err) console.log(err.message);
//     else console.log(results);
// });

const new_student = {
    "id": 10004,
    "name": "Mark",
    "major": "CS",
    "dept": "IT"
};

// insert
// const query_str = "insert into student values (?, ?, ?, ?)";
// db.query(query_str, [new_student.id, 
//                     new_student.name, 
//                     new_student.major, 
//                     new_student.dept], (err, result) => {
//             if(err) console.log(err.message);
//             else if(result.affectedRows === 1) {
//                 console.log("插入成功!");
//             }
// });

const {id, name, major, dept} = new_student;
const query_str = `insert into student values (${id}, '${name}', '${major}', '${dept}');`;
db.query(query_str, (err, result) => {
            if(err) console.log(err.message);
            else if(result.affectedRows === 1) {
                console.log("插入成功!");
            }
});

// 使用mysql语法insert set插入对象
// const query_str = "insert into student set ?";
// // 无需解构，直接将对象按顺序赋值到占位符值上
// db.query(query_str, new_student, (err, result) => {
//             if(err) console.log(err.message);
//             else if(result.affectedRows === 1) {
//                 console.log("插入成功!");
//             }
// });

// update
// const modified_student = {
//     "id": 10004,
//     "name": "Marcus",
//     "major": "CSS",
//     "dept": "JS"
// };
// // 占位符的mysql快捷写法
// const query_str = "update student set ? where id = ?";
// db.query(query_str, [modified_student, modified_student.id], (err, result) => {
//         if(err) console.log(err.message);
//         else if(result.affectedRows === 1) {
//             console.log("更新成功!");
//         }
// });