const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    username : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    dark_mode : {
        type:Boolean,
        required:true
    },
    image : {
        type:Object,
        required:false
    }
})

const user_model = mongoose.model("users" , user_schema);
module.exports = user_model