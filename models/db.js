const mongoose=require("mongoose")
const Schema=mongoose.Schema
const objectId=mongoose.Types.ObjectId


const userSchema= new Schema({
    "email":{type:String, unique:true},
    "password":String,
    "firstName":String,
    "lastName":String
})

const adminSchema= new Schema({
    "email":{type:String, unique:true},
    "password":String,
    "firstName":String,
    "lastName":String
})

const courseSchema= new Schema({
    "Title":String,
    "description":String,
    "price":Number,
    "imageUrl":String,
    "creatorId":objectId
})
const purchaseSchema= new Schema({
    "courseId":objectId,
    "userId":objectId,

})

const userModel=mongoose.model("user",userSchema)
const adminModel=mongoose.model("admin",adminSchema)
const courseModel=mongoose.model("course",courseSchema)
const purchaseModel=mongoose.model("purchase",purchaseSchema)


module.exports={
    userModel:userModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchaseModel:purchaseModel,
}