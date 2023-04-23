const mongoose = require('mongoose')

const Bookschema = new mongoose.Schema({
    title :{type:String, required:true},
    desc :{type:String, required:true},
    publisher :{type:String, required:true},
    publisher_date :{type:String},
    author :{type:String, required:true},
    isbn :{type:String, required:true},
    userid :{type:String, required:true},
})

module.exports = mongoose.model("book",Bookschema)