const mongoose = require("mongoose")
// const winston = require("winston")
const config = require("config")


module.exports = function(){
    return mongoose.connect(config.get("db"))
    .then(() =>console.log(`Connected to DataBase...`))
}