const express = require("express")
const app = express()

require("./startup/routes")(app)
require("./startup/db")()
require("./startup/configuration")()
require("./startup/validation")()
require("./startup/prod")(app)
let port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`App is listening on port ${port}...`)
})