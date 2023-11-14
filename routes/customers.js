const router = require("express").Router()
const {  validateCustomer, validateId, Customer } = require("../models/customers")


router.get("/",async(req, res)=>{
    const customer = await Customer.find()
    res.send(customer)
})
router.get("/:id",async(req, res)=>{
    const result = validateId(req.params.id)
    if (!result) return res.status(400).send("Invalid ID!")

    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).send("Customer with the given Id is not found.")

    res.send(customer)
})
router.post("/", async(req,res)=>{
    try {
        const result = validateCustomer(req.body)
        if(result.error) return res.status(400).send(result.error.details[0].message)
        
        const customer = new Customer(req.body)
        const response = await customer.save()
        res.status(200).send(response)
    } catch (error) {
        res.send(error.message).status(400)    
    }
})

router.delete("/:id", async (req, res) => {
    const result = validateId(req.params.id)
    if (!result) return res.status(400).send("Invalid ID!")

    const customer = await Customer.findByIdAndRemove({ _id: req.params.id })
    if (!customer) return res.status(404).send("Customer with the given Id is not found.")

    res.status(200).send(customer)
})

router.put("/:id", async (req, res) => {
    try {
        
        const result = validateId(req.params.id)
        if (!result) return res.status(400).send("Invalid ID!")
        
        const resultCustomer = validateCustomer(req.body)
        if (resultCustomer.error) return res.status(400).send(resultCustomer.error.details[0].message)
        
        const customer = await Customer.findOneAndUpdate({ _id: req.params.id }, {
         
                name: req.body.name
            
        }, { new: true })
        if (!customer) return res.status(404).send("Genre with the given Id is not found.")
        
        res.status(200).send(customer)
    } catch (error) {
     res.status(400).send(error.message)   
    }
})

module.exports = router;







