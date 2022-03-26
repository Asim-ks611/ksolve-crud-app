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
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser());
// CUSTOM MIDDLEWARES
app.use(myLogger)


// USING ROUTER
app.use("/users",isLoggedIn,usersRouter)
app.use("/notes",notesRouter)
app.use("/auth",authRouter)

app.listen(PORT,()=>{
    console.log(`Server is Running at http://localhost:${PORT}`);
})