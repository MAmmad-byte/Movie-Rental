const Joi = require("joi")
const auth = require("../middleware/auth")
const { Movie } = require("../models/movie")
const { Rental } = require("../models/rental")
const router = require("express").Router()
const validate = require("../middleware/validate")


router.post("/",[auth, validate(validateReturn)], async(req,res)=>{
    const { customerId, movieId } = req.body;
    const rental = await Rental.lookup(customerId, movieId)

    if(!rental) return res.status(404).send("No Rental Found")
    if(rental.dateReturned) return res.status(400).send("Rental is already proccessed.")

    rental.return();
    await rental.save()

    await Movie.updateOne({_id: rental.movie._id}, {
        $inc:{numberInStock:1}
    })

    return res.send(rental)
})



function validateReturn(req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })
    return schema.validate(req)
}

module.exports = router;