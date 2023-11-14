const config = require("config")

module.exports = function(){
    if(!config.get("jwtPrivateKey")){
        console.log("FETAL ERROR: jwtPrivateKey is not set.")
        process.exit(1)
    }
}