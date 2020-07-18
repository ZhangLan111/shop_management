const express  = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')

const router = require('./router')
const app = express()
app.use('/public/',express.static(path.join(__dirname,'/public/')))
app.use('/node_modules/',express.static('./node_modules/'))
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json())  
let allowCrossDomain = function (req,res,next) {
  //请求源 ajax http://localhost:8080
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Headers","*")
  res.header("Access-Control-Allow-Methods","*")
  next()
}
app.use(allowCrossDomain)

app.use(router)
app.get('/add',function (req,res) {
  res.send('222')
})



app.listen(3000,function () {
  console.log('server is running....');
})