module.exports = function asyncMiddleware(hanlder){
    return async function(req,res,next){
        try {
            await hanlder(req,res)
        } catch (err) {
            next(err)
        }
    }
}