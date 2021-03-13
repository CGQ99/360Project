const mongoose = require('mongoose')
const schema = mongoose.Schema
const phone_schema = new schema({
    phone:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }
})
const phone_model = mongoose.model("nowcode",phone_schema)
module.exports = phone_model