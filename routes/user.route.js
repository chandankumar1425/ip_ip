
const { Router } = require("express")

const { register, login, logout } = require("../controller/user.controller")

const { auth } = require("../middlewares/auth")

const userRouter = Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",logout)

module.exports ={userRouter}

