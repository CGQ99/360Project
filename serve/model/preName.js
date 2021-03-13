const mongoose = require('mongoose')
const schema = mongoose.Schema
const user_schema = new schema({
    preUsername:{
        type:String,
        required:true
    }
})
const name_model = mongoose.model("userName",user_schema)
module.exports = name_model