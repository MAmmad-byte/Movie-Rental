const { User, validateUser } = require("../models/user")
const router = require("express").Router()
const _ = require("lodash")
const bcrypt = require("bcrypt")
const auth = require("../middleware/auth")

router.get("/me", auth, async(req,res)=>{
    const user = await User.findById(req.user._id).select("-password")
    res.send(user)
})

router.post("/", async(req,res)=>{
    try {
        const result = validateUser(req.body)
        if(result.error) return res.status(400).send(result.error.details[0].message)

        let user = await User.findOne({email:req.body.email})
        if(user) return res.send("email is already registered.") 
        
        user = new User(_.pick(req.body, ["name", "email", "password"]))
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        const response = await user.save()

        const token = user.generateAuthToken()

        res.header("x-auth-token", token).status(200).send(_.pick(response, ["_id", "name", "email"]))
    } catch (error) {
        res.send(error.message).status(400)    
    }
})




module.exports = router;







