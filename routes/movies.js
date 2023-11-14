const router = require("express").Router()
const { Movie, validateId, validateMovie } = require("../models/movie")
const { Genre } = require("../models/genres")



router.get("/", async (req, res) => {
    const movies = await Movie.find()
    res.send(movies)
})

router.get("/:id", async (req, res) => {
    const result = validateId(req.params.id)
    if (!result) res.send("Given ID is Invalid.")

    const movies = await Movie.findById(req.params.id)
    if (!movies) return res.send("Movie with the give ID is not found.")
    res.send(movies)
})

router.post("/", async (req, res) => {
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send("Invalid genre")


    let movie = await new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    movie = await movie.save()
    res.send(movie)
})

router.put("/:id", async (req, res) => {
    const result = validateId(req.params.id)
    if (!result) res.send("Given ID is Invalid.")

    const movies = await Movie.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            "genre.name": req.body.genre.name,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }
    }, { new: true })
    if (!movies) return res.send("Movie with the give ID is not found.")
    res.send(movies)
})

router.delete("/:id", async (req, res) => {
    const result = validateId(req.params.id)
    if (!result) res.send("Given ID is Invalid.")

    const movies = await Movie.findByIdAndRemove(req.params.id)
    if (!movies) return res.send("Movie with the give ID is not found.")
    res.send(movies)
})

module.exports = router;
