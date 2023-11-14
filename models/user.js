const Joi = require("joi")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const config = require("config")
exports.validateUser= function validateUser(user){
    const userSchema = Joi.object({
        name: Joi.string().min(5).max(55).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    })
    return userSchema.validate(user)
}


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:55
    },
    email : {
        type:String,
        required:true,
        minlength:5,
        maxlength:55,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    },
    isAdmin:Boolean
})
userSchema.methods.generateAuthToken = function(){
   const token =  jwt.sign({_id:this.id, isAdmin:this.isAdmin}, config.get("jwtPrivateKey"))
   return token
}
exports.User =  mongoose.model("User", userSchema)
exports.userSchema = userSchema;