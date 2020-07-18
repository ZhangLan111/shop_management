const express  = require('express')
const md5 = require('blueimp-md5')
const user = require('./model')
const jwt = require('jwt-simple')

const router = express.Router()
router.get('/',function (req,res,next) { 
  res.send('123')
})

//登录逻辑
router.post('/login',function (req,res,next) { 
  let userdata = JSON.parse(JSON.stringify(req.body))
  console.log(userdata);
  //userdata.password = md5(md5(userdata.password))
  user.connection.query(`select * from user where username='${userdata.username}' and password='${userdata.password}'`,function (err,data) {
    if (err) {
      console.log('[SELECT ERROR]:',err.message);
      return next(err)
    }
    data = JSON.parse(JSON.stringify(data))
    if (data.length == 0) {
      return res.status(200).json({
        err_code: 1,
        msg: '用户名或密码输入错误.'
      })
      console.log('用户名或密码输入错误');
    }
    console.log(data);
    //token生成
    let token = jwt.encode({
      id: data[0].id,
      username: data[0].username
    }, 'zhanglan')
    let transToken = token.split('.')
    //返回数据
    res.status(200).json({
      err_code: 0,
      message: 'OK',
      data:{
        'token':transToken[1],
      }
    })
  })
})



module.exports = router