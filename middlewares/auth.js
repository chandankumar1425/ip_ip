const jwt = require("jsonwebtoken")

const redis_client = require("../helpers/redis")

const auth = async (req, res, next) =>{

    try {
        const token = req.headers?.authorization?.split(" ")[1];

        if(!token) return res.status(401).send("Please login Again")

        const token_valid = await jwt.verify(token, process.env.jwt_secret);

        if(!token_valid) return res.send("Authencation failed< Please login again")

        const token_blacklist= await redis_client.get(token)

        if(!token_blacklist) return res.send( "Unauthorized")

        req.body.userId = token_valid.userId

        req.body.current_city = token_valid.current_city

        next()
        
    } catch (err) {
        res.send(err.message)
    }
}



module.exports ={auth}