const { Router } = require("express")
const courseRoutes = Router()
const { purchaseModel, courseModel } = require("../database/db.js")
const { userMiddleware } = require("../middleware/userAuthenication.js")

courseRoutes.post("/purchase",userMiddleware, async function (req, res) {
    const userId = req.userId
    const courseId = req.body.courseId

    try {
        const coursePurchase=await purchaseModel.create({
            userId,
            courseId,
        })
        console.log(coursePurchase);
        
        res.status(200).json({ message: "course purchases", staus: "purchased" })
    } catch (error) {
        res.json({ message: "Someting Went Wrong", error: error })
    }

})
courseRoutes.get("/preview", async function (req, res) {

    try {
        const allCourses = await courseModel.find({})
        res.status(200).json({ message: "All Courses List", courses: allCourses })
    } catch (error) {
        res.status(200).json({ message: "Something went wrong", error: error })
    }
})

module.exports = {
    courseRoutes: courseRoutes
}