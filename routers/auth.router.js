const express = require( "express")

const {authRegister,authLogin,authLogout} = require("./auth.controller.js")

const authRouter = express.Router()

//////  --- NOTES-ROUTING  --- //////

authRouter.post('/register', authRegister)
authRouter.post('/login', authLogin)
authRouter.get('/logout', authLogout)

module.exports = authRouter;