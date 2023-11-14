const router = require("express").Router()
const { Customer } = require("../models/customers")
const Fawn = require("modified_fawn")
const { Movie } = require("../models/movie")
const { Rental, validateRental } = require("../models/rental")
const { mongoose } = require("mongoose")

Fawn.init(mongoose);

router.get("/", async(req,res)=>{
    let rental = await Rental.find().sort("-dateOut")
    res.send(rental)
})

router.post("/", async(req,res)=>{
    const { error } = validateRental(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId)
    if(!customer) return res.status(400).send("Invalid Customer")
    
    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(400).send("Invalid Movie")

    if(movie.numberInStock === 0) return res.status(400).send("Movie not in Stock.")

    let rental = new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            isGold:customer.isGold,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }
    })
try {
    new Fawn.Task()
        .save("rentals", rental)
        .update("movies", {_id:movie._id}, {
            $inc:{numberInStock: -1}
        })
        .run()
        res.send(rental)
} catch (error) {
  res.status(500).send("Something Failed!")  
}
})


module.exports = router;