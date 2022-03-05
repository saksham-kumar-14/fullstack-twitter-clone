const mongoose = require("mongoose");

const post_schema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    username : {
        type:String,
        required:true 
    },
    time : {
        type:String,
        required:true
    },
    likes : {
        type:Number,
        required:true
    },
    people_liked : {
        type:Array,
        required:true
    },
    text : {
        type:String,
        required:true
    },
    comments : {
        type:Array,
        default : []
    }
})

const post_model = mongoose.model("posts" , post_schema);
module.exports = post_model;