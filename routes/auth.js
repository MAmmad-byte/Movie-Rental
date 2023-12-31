const { User } = require("../models/user")
const router = require("express").Router()
const _ = require("lodash")
const bcrypt = require("bcrypt")
const Joi = require("joi")


router.post("/", async(req,res)=>{
    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        let user = await User.findOne({email:req.body.email})
        if(!user) return res.status(400).send("Invalid email or password.") 
        
        const validPassword  = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).send("Invalid email or password.") 
        const token = user.generateAuthToken()
        res.send(token)

    } catch (error) {
        res.send(error.message).status(400)    
    }
})


function validate(req){
    const userSchema = Joi.object({
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    })
    return userSchema.validate(req)
}




module.exports = router;







