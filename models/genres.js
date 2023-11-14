const Joi = require("joi")
const mongoose = require("mongoose")

exports.validateGenre = function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    })
    return schema.validate(genre)
}
const genreSchema  = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
})
exports.genreSchema = genreSchema
exports.Genre = mongoose.model("Genre", genreSchema)