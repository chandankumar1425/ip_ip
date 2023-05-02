const user = require("../models/user.model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const redis_client = require("../helpers/redis")



//This is register section all data is predefined in user module only  in this section we have to request to the body takre all the data


const register = async (req, res) => {

    try {
        const { name, email, password, current_city } = req.body

        const userPresent = await user.findOne({ email });

        if (userPresent) return res.send("User is already have an account , Please Login Once")

        const hash = await bcrypt.hash(password, 3);

        const newUser = new user({ name, email, password: hash, current_city });

        await newUser.save()

        res.send("Register has been done")

    } catch (err) {
        res.send(ree.message)

    }

}


// here we can compare the password using bcrypt.compare when that allthings mathch then user should be login 

const login = async (req, res) => {

    try {

        const { email, password } = req.body

        const userPresent = await user.findOne({ email });

        if (!userPresent) return res.send("User has been not registered yet , please reregister first")

        const passwordCorrect = await bcrypt.compare(password, userPresent.password);

        if (!passwordCorrect) return res.send("Invaliv Crediantials check once")

        const token = await jwt.sign({ userId: userPresent._id, current_city: userPresent.current_city }, process.env.jwt_secret, { expiresIn: "6hr" })

        res.send({ message: "Login Sucessfully", token })

    } catch (err) {
        res.send(ree.message)

    }


}


//Here we add logout to blacklist and  stored the token in redis and the expire time was also mention above login section 
const logout = async (req, res) => {

    try {

        const token = req.headers?.authorization?.split(" ")[1];

        if (!token) return res.status(403)

        await redis_client.set(token, token);

        res.send("logout Sucessfully")

    } catch (err) {
        res.send(ree.message)

    }

}


module.exports = { register, login, logout }