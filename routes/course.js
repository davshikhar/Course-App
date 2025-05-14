//we have written all the course routes in this js file
const { Router } = require('express');
const { courseModel } = require('../db');

const courseRouter = Router();

courseRouter.get("/preview",function(req,res){
    res.json({
        message:"this is the course preview"
    })
});

courseRouter.post("/purchase",function(req,res){

});

module.exports = {
    courseRouter : courseRouter
};