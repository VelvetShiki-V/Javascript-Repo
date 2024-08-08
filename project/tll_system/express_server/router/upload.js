const express = require('express')
const mysql = require('mysql2')
const fileUpload = require('express-fileupload')
const router = express.Router()

const db = mysql.createConnection({     // 连接数据库
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'zcx984288627',
    database: 'tll_server_db'
})

// 插入图片
router.post('/banner', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // 处理上传的文件
    const file = req.files.file; // 'img' 是字段名
    if (!file) {
        return res.status(400).send('No file was uploaded.');
    }

    // 将文件保存到临时目录（或其他地方）
    file.mv('/' + file.name, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error saving file.');
        }

        // 将文件信息插入到MySQL数据库中
        const query = 'INSERT INTO banner (img) VALUES (?)';
        const blobData = Buffer.from(file.data); // 将文件数据转换为Buffer
        db.query(query, [blobData], (error, results, fields) => {
            if (error) {
            console.log(error);
            return res.status(500).send('Error inserting data into database.');
            }

            // 返回成功响应
            console.log('插入成功');
            res.send('File uploaded and saved to database successfully.');
        });
    });
});

module.exports = router
