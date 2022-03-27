const express =require( "express")
const cors = require( "cors")
const myLogger =require( "./middleware/logger.js")
const cookieParser = require('cookie-parser')
const isLoggedIn = require("./middleware/isLoggedIn")

// IMPORTING ROUTERS
const usersRouter = require('./routers/users.router')
const  notesRouter =require( './routers/notes.router')
const  authRouter = require( './routers/auth.router')

const app = express()
const PORT = 3005;

// INITIATING MIDDLEWARES
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser());

// CUSTOM MIDDLEWARES
app.use(myLogger)

// USING ROUTER
app.use("/auth",authRouter)
app.use("/users",isLoggedIn,usersRouter)
app.use("/notes",notesRouter)



app.listen(PORT,()=>{
    console.log(`Server is Running at http://localhost:${PORT}`);
})