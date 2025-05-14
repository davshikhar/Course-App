const {Router} = require('express');
const adminRouter = Router();
const { adminModel } = require('../db');

adminRouter.post("/signup",function(req,res){

});

adminRouter.post("/signin",function(req,res){

});

/*we can also make use of thsi middleware to make sure that the admin is autheticated for any endpoints below
adminRouter.use(adminMiddleware);
*/

adminRouter.post("/course",function(req,res){

});

adminRouter.put("/course",function(req,res){

});

adminRouter.get("/course/bul",function(req,res){

});

module.exports = {
    adminRouter : adminRouter
};