/*
<!--
2019/1/4
create by Misaka11
-->
*/
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456',
    port: '3306',
    database: 'reader'
});

conn.connect();


// 增加用户接口
router.post('/register', (req, res) => {
    var params = req.body;
    var sql = 'insert into user_info('
            +  'email,passWord,competence)'
            +  'values'
            +  "('"+params.email+"','"+params.password+"',"+params.competence+")";
    console.log(sql);
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            res.send('0');
        }
        if (result) {
            res.send('1');
        }
    })
});

//查找用户接口
router.post('/login', (req, res) => {
    var params = req.body;
    var sql = "select * from user_info where email = '"+ params.email+ "'";
    console.log(sql);
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }
        //console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出email，data 返回-1
        } else {
            if(result[0].passWord === params.password) {
                res.send(result[0])
            } else {
                res.send('0')   //username
            }
        }
    })
});

//删除用户
router.post('/deleteUser', (req,res) => {
    var params = req.body;
    var sql = "delete from user_info where email = '"+ params.email +"'";
    console.log(sql);
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }
        //console.log(result);
        res.send('删除成功');
    })
});

//获取用户信息列表
router.post('/getUserList', (req, res) => {
    var sql = "select email from user_info";
    conn.query(sql,function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出，data 返回-1
        } else {
            res.send(result);
        }
    })
});

//更新用户信息
router.post('/updateUser', (req, res) => {
    var params = req.body;
    var sql = 'update user_info set'
            +  " favorite = '" + params.favorite
            +  "', notes = '" + params.notes
            +  "' where email = '" + params.email + "'";
    console.log(sql);
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            res.send('0');
        }
        if (result) {
            res.send('1');
        }
    })
});

module.exports = router;
