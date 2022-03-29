const express =require( "express")
const cors = require( "cors")
const myLogger =require( "./middleware/logger.js")
const cookieParser = require('cookie-parser')
const isLoggedIn = require("./middleware/isLoggedIn")
require("./middleware/passportAuth")

// IMPORTING ROUTERS
const usersRouter = require('./routers/users.router')
const  notesRouter =require( './routers/notes.router')
const  authRouter = require( './routers/auth.router')

const app = express()
const PORT = 3005;

// INITIATING MIDDLEWARES
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin:["http://localhost:3000","http://localhost:8080"],
    credentials: true
}));
app.use(express.json())

// CUSTOM MIDDLEWARES
app.use(myLogger)

// USING ROUTER
app.use("/auth",authRouter)
app.use(isLoggedIn)
app.use("/users",usersRouter)
app.use("/notes",notesRouter)



app.listen(PORT,()=>{
    console.log(`Server is Running at http://localhost:${PORT}`);
})