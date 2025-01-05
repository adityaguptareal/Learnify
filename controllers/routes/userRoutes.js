const { Router } = require("express")
const userRoutes = Router()
const { z } = require("zod")
const { userModel, purchaseModel, courseModel } = require("../database/db")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const { JWT_SECRET_USER } = require("../config.js")
const { userMiddleware } = require("../middleware/userAuthenication")

userRoutes.post("/signup", async function (req, res) {
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
        const creatingUser = await userModel.create({
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
userRoutes.post("/signin", async function (req, res) {
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
        var userCheck = await userModel.findOne({
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
        }, JWT_SECRET_USER)
        res.json({ message: "signin successfully", idToken: token })
    }
    else {
        res.json({ error: "Invalid Credentials" })
    }


})
userRoutes.get("/purchases", userMiddleware, async function (req, res) {
    const userId = req.userId
    const purchases = await purchaseModel.find({
        userId,
    })

    console.log(purchases);


    const courseData = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    })
    res.json({ "purchases": purchases, 'course': courseData })
})

module.exports = {
    userRoutes: userRoutes
}