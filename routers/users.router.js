const express = require("express")
const {
    getAllUsers,
    addUsers,
    updateUsers,
    deleteUsers
} = require("./users.controller")

const usersRouter = express.Router()

//////  --- NOTES-ROUTING  --- //////
usersRouter.get('/',getAllUsers)
usersRouter.post('/',addUsers)
usersRouter.put('/:id',updateUsers)
usersRouter.delete('/:id',deleteUsers)


module.exports = usersRouter