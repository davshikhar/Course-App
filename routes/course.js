//we have written all the course routes in this js file
const { Router } = require('express');
const { courseModel } = require('../db');
const { purchaseModel } = require('../db');

const courseRouter = Router();
const { userMiddleware } = require('../middleware/user');

//this endpoint does not need to be authenticated since it has to show all the courses that are there.
courseRouter.get("/preview",async function(req,res){

    const courses = await courseModel.find({});//to find and get all the courses that are present.

    res.json({
        message:"all the courses are:-",
        courses
    })
});

courseRouter.post("/purchase",userMiddleware, async function(req,res){
    const userId = req.userId;
    const courseId = req.courseId;

    //should check that the user has actually paid the price we'll skip that for now.
    await purchaseModel.create({
        userId,
        courseId
    });

    res.json({
        message:"You have successfully bought the course!"
    });

});

module.exports = {
    courseRouter : courseRouter
};