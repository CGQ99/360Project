const mongoose = require('mongoose')
module.exports = new Promise((resolve,reject)=>{
    //创建连接
    mongoose.connect('mongodb://127.0.0.1:27017/360buy',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    })
    mongoose.connection.once('open',()=>{
        console.log("连接360buy数据库成功")
        resolve()
    })
})