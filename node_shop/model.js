const mysql = require('mysql')

//连接数据库
var connection = mysql.createConnection({      //创建mysql实例
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'zhanglan95',
  database:'vue_shop'
});
//数据库连接
connection.connect();

exports.connection = connection