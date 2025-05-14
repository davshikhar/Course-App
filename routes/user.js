//we have written all the user routes in this file
/*
const express = require('express');
const Router = express.Router;
*/

//we can write either of the statement

const { Router } = require('express');//here we just get the Router by destructuring and getting only the "Router" and not the entire express
const userRouter = Router();
const { userModel } = require('../db');

userRouter.post("/signup",function(req,res){

});

userRouter.post("/signin",function(req,res){

});

userRouter.get("/purchases",function(req,res){

});

module.exports = {
    userRouter : userRouter
};