

(async()=>{
    const express = require('express');
    const cookieParser = require("cookie-parser");
    const db = require('./model/db')
    const bodyParser=require('body-parser');
    const model = require('./model/model')
    const model_name = require('./model/preName')
    const phone_model = require('./model/phone')
    const axios = require('axios')
    const md5 = require('md5');
    //创建实例
    const app = express();
    const moment = require('moment');
    // 确保连接数据库成功
    await db
    app.use(cookieParser());
    app.use(bodyParser.json());//数据JSON类型
    app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
    //注册
    app.post('/register',async (req,res)=>{
      const {username,password} = req.body
      await model.create({
          username,
          password
      })
      const obj = {
          code:200,
          msg:'注册成功'
      }
      res.send(JSON.stringify(obj))
    })
    //登录
    app.post('/login',async (req,res)=>{
        const {username,password} = req.body
        //查找用户是否存在
        const falg = await model.findOne({username,password})
        //修改上一次保存的用户名
        await model_name.updateOne({},{preUsername:username})
        // await model_name.create({preUsername:username})
        let obj ={}
        if(falg){
            obj = {
                code:200,
                msg:'登录成功',
                username
            }
            // user=username
            
            // res.cookie("T",'s=4aadc05681c594773c86f691b9fc10e3&t=1614943961&lm=&lf=2&sk=b36a4a74b2ef9b79a03fd9835191ec36&mt=1614943961&rc=&v=2.0&a=1; w.baidu.com%2F|1614991420',{maxAge:1000*60*60*24*30})
            // res.cookie('Q','u=360H391094198&n=uhwvnacvat1&le=ZGRjAwx4BQp1ZPH0ZUSkYzAioD==&m=ZGtjWGWOWGWOWGWOWGWOWGWOZwHl&qid=391094198&im=1_t017d369e697aeef3f8&src=pcw_iotmall&t=1',{maxAge:1000*60*60*24*30})
            //me
            res.cookie("Q",'u=360H2968875009&n=&le=&m=ZGpmWGWOWGWOWGWOWGWOWGWOZGDl&qid=2968875009&im=1_t011655040b3ed000bf&src=pcw_iotmall&t=1',{maxAge:1000*60*60*24*30})
            res.cookie("T",'s=f774a87801a11381117f23161f3e9d38&t=1614998189&lm=&lf=2&sk=0241e60f35207c34ab9d3e8bb56b6fbc&mt=1614998189&rc=&v=2.0&a=1' , {maxAge:1000*60*60*24*30});
            res.cookie("__DC_sid",'99774850.2619978245315490000.1615186074940.689',{maxAge:1000*60*60*24*30})
            res.cookie("__DC_gid",'99774850.113348004.1615186074939.1615186135391.2',{maxAge:1000*60*60*24*30})
            res.cookie("__guid",'99774850.4305371512967298600.1615186074938.967',{maxAge:1000*60*60*24*30})
            res.cookie("utm_source",'mall.360.cn_pc',{maxAge:1000*60*60*24*30})
            res.cookie("track",'mall.360.cn_pc',{maxAge:1000*60*60*24*30})
        }else{
            obj = {
                code:400,
                msg:'登录失败，账号或用户名错误'
            }
        }
        res.send(JSON.stringify(obj))
    })
    //获取用户信息
    app.get('/getUserInfo',async (req,res)=>{
        const falg = await model_name.findOne({})
        let obj 
        if(falg){
            obj = {
                code:200,
                username:falg.preUsername
            }
        }
        // console.log(falg)
        res.send(JSON.stringify(obj))
    })

    
    //获取验证码
    app.post("/ma",async(req,res)=>{
        const {phone} = req.body
        const time = moment(Date.now()).format('yyyyMMDDHHmmss')
        let sig = md5('8aaf0708780055cd01781b1d976109fd'+'b40b781b9aa74f578ad73f3a9a23cbb5'+time)
        //路径
        const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/8aaf0708780055cd01781b1d976109fd/SMS/TemplateSMS?sig=${sig.toUpperCase()}`
        //验证码
        let code = Math.floor(Math.random()*1000000)
        await phone_model.updateOne({},{phone,code})
        //请求的参数
        const obj = {
            to:phone.toString(),
            appId:'8aaf0708780055cd01781b1d983c0a03',
            templateId:1,
            datas:[code,60]
        }
        var b = new Buffer.from('8aaf0708780055cd01781b1d976109fd:'+time);
        axios({
            url,
            method:"POST",
            data:obj,
            headers:{
                'Accept':'*/*',
                'Accept-Encoding':'gzip, deflate, br',
                'Connection':'keep-alive',
                'Authorization':b.toString('base64')
            }
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })

        res.send(JSON.stringify({code:200,msg:"验证码发送成功"}))
    })

    //验证码登录
    app.post("/loginCode",async(req,res)=>{
        // console.log("123456")
        const {phone,code} = req.body
        let obj 
        const falg = await phone_model.findOne({})
        //修改上一次保存的用户名
        await model_name.updateOne({},{preUsername:phone})
        if(falg.phone == phone && falg.code==code){
            obj={
                code:200,
                msg:"验证成功",
                username:phone
            }
            res.cookie("Q",'u=360H2968875009&n=&le=&m=ZGpmWGWOWGWOWGWOWGWOWGWOZGDl&qid=2968875009&im=1_t011655040b3ed000bf&src=pcw_iotmall&t=1',{maxAge:1000*60*60*24*30})
            res.cookie("T",'s=f774a87801a11381117f23161f3e9d38&t=1614998189&lm=&lf=2&sk=0241e60f35207c34ab9d3e8bb56b6fbc&mt=1614998189&rc=&v=2.0&a=1' , {maxAge:1000*60*60*24*30});
            res.cookie("__DC_sid",'99774850.2619978245315490000.1615186074940.689',{maxAge:1000*60*60*24*30})
            res.cookie("__DC_gid",'99774850.113348004.1615186074939.1615186135391.2',{maxAge:1000*60*60*24*30})
            res.cookie("__guid",'99774850.4305371512967298600.1615186074938.967',{maxAge:1000*60*60*24*30})
            res.cookie("utm_source",'mall.360.cn_pc',{maxAge:1000*60*60*24*30})
            res.cookie("track",'mall.360.cn_pc',{maxAge:1000*60*60*24*30})
            res.send(JSON.stringify(obj))
            return
        }
        obj={
            code:400,
            msg:"验证码错误"
        }
        res.send(JSON.stringify(obj))
    })

    app.listen(8088,(err)=>{
      if(err){
          console.log("服务器启动失败,错误信息:"+err)
      }else{
          console.log("服务器启动成功")
      }
  })
})()