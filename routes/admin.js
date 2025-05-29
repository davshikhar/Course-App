const {Router} = require('express');
const adminRouter = Router();
const bcrypt = require('bcrypt');
const { adminModel } = require('../db');
const jwt = require('jsonwebtoken');

const admin_secret = "admin1234";//this is different than that of the user's secret password that is used for signing jwt

adminRouter.post("/signup",async function(req,res){
    const {email,password,firstName,lastName} = req.body;

    const hashedPassword = await bcrypt.hash(password,3);

    await adminModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName
    });
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

adminRouter.post("/",function(req,res){

});

adminRouter.put("/",function(req,res){

});

adminRouter.get("/bulk",function(req,res){

});

module.exports = {
    adminRouter : adminRouter
};