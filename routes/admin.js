const {Router} = require('express');
const adminRouter = Router();
const bcrypt = require('bcrypt');
const { adminModel, courseModel } = require('../db');
const jwt = require('jsonwebtoken');

const {admin_secret}=require('../config');//this is different than that of the user's secret password that is used for signing jwt
const { adminMiddleware } = require('../middleware/admin');

adminRouter.post("/signup",async function(req,res){
    const {email,password,firstName,lastName} = req.body;

    const hashedPassword = await bcrypt.hash(password,3);

    await adminModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName
    });
    res.json({
        message:"admin is created successfully"
    })
});

/*can also use the cookie based or session based authentication here*/
adminRouter.post("/signin",async function(req,res){
    const {email,password} = req.body;

    const response = await adminModel.findOne({
        email:email
    });

    console.log(response.password);

    //checks if the user is present or not.
    if(!response){
        res.status(403).json({
            message:"User does not exits"
        });
    }
    else{
        const passwordMatch = await bcrypt.compare(password, response.password);
        if(passwordMatch){
            const token = jwt.sign({
                id:response._id.toString()
            },admin_secret);
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
    }
});

/*we can also make use of thsi middleware to make sure that the admin is autheticated for any endpoints below
adminRouter.use(adminMiddleware);
*/

adminRouter.post("/course",adminMiddleware,async function(req,res){
    const adminId = req.adminId;

    const {title,description,price,imageUrl} = req.body;

    const course = await courseModel.create({
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl,
        creatorId:adminId
    });

    res.json({
        message:"Course created successfully",
        courseId:course._id
    });

});

adminRouter.put("/course",adminMiddleware, async function(req,res){
     const adminId = req.adminId;

    const {title,description,price,imageUrl,courseId } = req.body;

    const course = await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId
    },
        {
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl,
    });

    res.json({
        message:"Course updated successfully",
        courseId:course._id
    });
});

adminRouter.get("/course/bulk",adminMiddleware, async function(req,res){
    const adminId = req.adminId;

    const courses = await courseModel.find({
        creatorId:adminId
    });

    res.json({
        message:"course updated",
        courses
    })
    
});

module.exports = {
    adminRouter : adminRouter
};