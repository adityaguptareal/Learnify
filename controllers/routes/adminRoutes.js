const { Router } = require("express")
const adminRoutes = Router()
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const { adminModel, courseModel } = require("../database/db")
const { z } = require("zod")
const { JWT_SECRET_AMDIN } = require("../config.js")
const { adminMiddleware } = require("../middleware/adminAuthenication")

adminRoutes.post("/signup", async function (req, res) {
    const requiredData = z.object({
        email: z.string().email(),
        password: z.string().max(20).min(6),
        firstName: z.string().max(20),
        lastName: z.string().max(20)
    })
    const validateData = requiredData.safeParse(req.body)
    if (!validateData.success) {
        res.status(406).json({
            status: "Invalid Format",
            error: validateData.error
        })
        return
    }
    const { email, password, firstName, lastName } = validateData.data
    const hashedPassword = await bcrypt.hash(password, 8)
    try {
        const creatingUser = await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        await creatingUser.save()
        res.status(201).json({ message: "user signed up successfully !" })
    } catch (error) {
        res.status(500).json({ "error": error, message: "error in db entry" })
    }
})

adminRoutes.post("/signin", async function (req, res) {
    const signinData = z.object({
        email: z.string().email(),
        password: z.string().max(20)
    })

    const validateSiginData = signinData.safeParse(req.body)
    if (!validateSiginData.success) {
        res.status(406).json({ message: "Invalid Format", error: validateSiginData.error })
        return
    }

    const { email, password } = validateSiginData.data
    try {
        var userCheck = await adminModel.findOne({
            email: email
        })
        if (!userCheck) {
            res.json({ error: "user not found" })
            return
        }
    } catch (error) {
        res.status(500).json({ error: "database error while checking" })
    }

    const passwordCheck = await bcrypt.compare(password, userCheck.password)


    if (passwordCheck) {
        const token = jsonwebtoken.sign({
            idToken: userCheck._id
        }, JWT_SECRET_AMDIN)
        res.json({ message: "signin successfully", idToken: token })
    }
    else {
        res.json({ error: "Invalid Credentials" })
    }


})
adminRoutes.post("/course", adminMiddleware, async function (req, res) {
    const adminID = req.adminId
    const { title, description, imageUrl, price } = req.body
    const course = await courseModel.create({

        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminID
    })

    res.status(200).json({
        message: "course created",
        courseID: course._id
    })



})
adminRoutes.put("/course", adminMiddleware, async function (req, res) {
    const adminID = req.adminId
    const { title, description, imageUrl, price, courseID } = req.body
    const updatedCourse = await courseModel.updateOne({
        _id: courseID,
        creatorId:adminID
    },
      {  title,
        description,
        imageUrl,
        price
}
    )
    res.status(200).json({
        message:courseID+" Course Updated ",
    })
})



adminRoutes.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminID = req.adminId
    const getCourses = await courseModel.find({

// Testing API's for deployment 
        creatorId:adminID
    })


    res.json({
        message:"Your Courses",
        courses:getCourses
    })
})

adminRoutes.delete("/course/delete", adminMiddleware, async function(req,res){
    const adminID = req.adminId
    const courseID=req.body.courseID
   try {
    const checkingUser= await courseModel.deleteOne({
        creatorId:adminID,
        _id:courseID
    })
    res.json({
        message:"Course is Deleted",

    })
} catch (error) {
    res.json({
        message:`Cause Error ${error}`
    })
   }
    
})

module.exports = {
    adminRoutes: adminRoutes
}
