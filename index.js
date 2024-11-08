const express=require("express")
const app=express()
const {userRoutes}=require("./routes/userRoutes")
const {courseRoutes}=require("./routes/coursesRoutes")
const {adminRoutes}=require("./routes/adminRoutes")
const mongoose=require("mongoose")
require("dotenv").config()
app.use(express.json())
const MONGOODB_URL=process.env.MONGOODB_URL

const port=3000

// Version 1 api
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/courses",courseRoutes)
app.use("/api/v1/admin",adminRoutes)

async function main() {
  try {
    await mongoose.connect(MONGOODB_URL)
 } catch (error) {
     console.log(error);
     
 }
 
 app.listen(port,()=>{
     console.log('App is running at', port);
     
 })
}
main()