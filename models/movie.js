const mongoose = require("mongoose")
const { genreSchema } = require("./genres")
const Joi = require("joi")


exports.movieSchema = mongoose.Schema({
    title: {
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        trim:true
    },
    genre: {
        type: genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
})


exports.validateMovie = function(movie){
    const movieSchema = Joi.object({
        title:Joi.string().min(5).max(255).required(),
        numberInStock:Joi.number().max(1000).required(),
        dailyRentalRate:Joi.number().max(1000).required(),
        genreId:Joi.string().required()
    })
    return movieSchema.validate(movie)
}

exports.validateId = function validateId(id) {
    return mongoose.isValidObjectId(id)
}

exports.Movie = mongoose.model("Movie", this.movieSchema)