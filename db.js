const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
require('dotenv').config();
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri);

const userSchema = new Schema({
    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String
});

const adminSchema = new Schema({
    email:{type:String, unique:true},
    password:String,
    firstName:String,
    lastName:String
});

const courseSchema = new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
});

const purchaseSchema = new Schema({
    userId:ObjectId,
    courseId:ObjectId
});

const userModel = mongoose.model('user',userSchema);
const adminModel = mongoose.model('admin',adminSchema);
const courseModel = mongoose.model('course',courseSchema);
const purchaseModel = mongoose.model('purchase',purchaseSchema);

module.exports = {
    userModel:userModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchaseModel:purchaseModel
};