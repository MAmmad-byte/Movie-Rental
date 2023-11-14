const mongoose = require("mongoose")
const Joi = require("joi")
const moment = require("moment")


const rentalSchema =  mongoose.Schema({
    movie: {
        type:new mongoose.Schema({
            title: {
                type:String,
                required:true,
                minlength:5,
                maxlength:255,
                trim:true
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255
            }
        }),
        required:true 
    },
    customer:{
        type:new mongoose.Schema({
            isGold:{
                type:Boolean,
                default:false
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
        }),
        required:true
    },
    dateOut:{
        type:Date,
        default:Date.now(),
        required:true
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }
})


exports.validateRental = function(rental){
    const rentalSchema = Joi.object({
        movieId:Joi.string().required(),
        customerId:Joi.string().required()
    })
    return rentalSchema.validate(rental)
}

exports.validateId = function validateId(id) {
    return mongoose.isValidObjectId(id)
}


rentalSchema.statics.lookup =  function(customerId, movieId){
    return this.findOne({"customer._id":customerId, "movie._id" : movieId})
}
rentalSchema.methods.return = function(){
    this.dateReturned = new Date()

    const rentalDays = moment().diff(this.dateOut, "days")
    this.rentalFee = rentalDays * this.movie.dailyRentalRate
}
exports.Rental = mongoose.model("Rental", rentalSchema)



