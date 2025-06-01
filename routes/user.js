//we have written all the user routes in this file
/*
const express = require('express');
const Router = express.Router;
*/

//we can write either of the statement

const { Router } = require('express');//here we just get the Router by destructuring and getting only the "Router" and not the entire express
const userRouter = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userModel, purchaseModel, courseModel } = require('../db');
const {user_secret} = require('../config');
const { userMiddleware } = require('../middleware/user');

userRouter.post("/signup",async function(req,res){

    /*we can also do this
    const {email, password, firstName, lastName} = req.body;
    this is called as destructuring.
    */

    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const hashedPassword = await bcrypt.hash(password,3);
    
    //put the userModel.create in a try catch block
    await userModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName
    });

    res.json({
        message:"You are signed up"
    })
});

userRouter.post("/signin",async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    const response = await userModel.findOne({
        email:email
    });

    console.log(response.password);

    if(!response){
        res.status(403).json({
            message:"User does not exist"
        });
    }

    //You can also do cookie based login in this part 
    const passwordMatch = await bcrypt.compare(password, response.password);

    if(passwordMatch){
        const token = jwt.sign({
            id:response._id.toString()
        },user_secret);
        res.json({
            token:token
        });
        return;
    }
    else{
        res.status(403).json({
            message:"Incorrect credentials"
        });
    }
});

userRouter.get("/purchases",userMiddleware, async function(req,res){
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    //this creates an array of courseId and then checks if there "_id" is present in the pruchases.courseId.
    const courseData = await courseModel.find({
        _id: { $in : purchases.map(x => x.courseId)}
    });

    res.json({
        purchases,
        courseData
    });
});

/*
this is also an auth function that can be used in place of userMiddleware.
function auth(req,res,next){
    const token = req.headers.token;

    const decodedata = jwt.verify(token,secret);
    if(decodedata){
        req.userId = decodedata.id;
        next();
    }
    else{
        res.json({
            message:"incorrect credentials"
        });
    }
}
    */

module.exports = {
    userRouter : userRouter
};