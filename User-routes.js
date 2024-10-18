const express = require('express')
const { signUp, logIn, getAllUser, updatePassword } = require('../controller/User-controller')


const userRouter = express.Router()
userRouter.get("/", getAllUser)
userRouter.post("/signup", signUp)
userRouter.post("/login", logIn)
userRouter.put("/forgetPassword",updatePassword)
 
module.exports = userRouter;
 