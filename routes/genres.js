const router = require("express").Router()
const { validateGenre, Genre } = require("../models/genres")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const asyncMiddleware = require("../middleware/async")
const validateObjectid = require("../middleware/validateObjectid")


router.get("/", async(req,res)=>{
        const result = await Genre.find()
        res.status(200).send(result)
})

router.get("/:id",validateObjectid, asyncMiddleware(async(req,res) => {
    const genre = await Genre.findById(req.params.id)
    if (!genre) return res.status(404).send("Genre with the given Id is not found.")

    res.status(200).send(genre)
}))

router.post("/", auth, asyncMiddleware(async(req,res) => {
        const result = validateGenre(req.body)
        if (result.error) return res.status(400).send(result.error.details[0].message)
        const genre = await new Genre(req.body)

        const response = await genre.save()
        res.status(200).send(response)

}))

router.put("/:id",[auth, validateObjectid], asyncMiddleware(async(req,res) => {

        const resultGenre = validateGenre(req.body)
        if (resultGenre.error) return res.status(400).send(resultGenre.error.details[0].message)

        const genre = await Genre.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                name: req.body.name
            }
        }, { new: true })
        if (!genre) return res.status(404).send("Genre with the given Id is not found.")

        res.status(200).send(genre)

}))

router.delete("/:id", auth, admin,validateObjectid, asyncMiddleware(async(req,res) => {


    const genre = await Genre.findByIdAndRemove({ _id: req.params.id })
    if (!genre) return res.status(404).send("Genre with the given Id is not found.")

    res.status(200).send(genre)
}))

module.exports = router;