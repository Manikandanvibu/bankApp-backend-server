// server mongo db integration
// steps

// 1 import mongoose
const mongoose=require('mongoose')
// 2 state connection string via mongoose
mongoose.connect('mongodb://localhost:27017/bankServer',{useNewUrlParser:true})
// 3 define a bank databse model
const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:Number,
    balance:Number,
    transcation:[]
})
// 4 export the schema to use in another file
module.exports={
    User
}