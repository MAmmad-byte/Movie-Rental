
module.exports = function(error, req, res, next){
    winston.error("New Error")
    res.status(500).send("Something Failed.")
}
