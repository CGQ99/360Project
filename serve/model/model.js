const mongoose = require('mongoose')
const schema = mongoose.Schema
const user_schema = new schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
        default:Date.now()
    }
})
const user_model = mongoose.model("userlist",user_schema)
module.exports = user_model