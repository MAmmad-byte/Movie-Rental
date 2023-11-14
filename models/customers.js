const Joi = require("joi")
const mongoose = require("mongoose")

exports.validateCustomer= function validateCustomer(customer){
    const customerSchema = Joi.object({
        isGold: Joi.bool().required(),
        name: Joi.string().min(5).max(55).required(),
        phone: Joi.string().min(5).required()
    })
    return customerSchema.validate(customer)
}

exports.validateId =function validateId(id) {
    return mongoose.isValidObjectId(id)
}


exports.customerSchema = new mongoose.Schema({
    isGold:{
        type:Boolean,
        required:true
    },
    name : {
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    phone:{
        type:String,
        required:true,
        minlength:5,
        maxlength:10
    }
})
exports.Customer =  mongoose.model("Customer", this.customerSchema)