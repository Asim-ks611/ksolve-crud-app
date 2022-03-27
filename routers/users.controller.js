const {PrismaClient} = require('@prisma/client')
const bcrypt = require("bcryptjs");
let prisma = new PrismaClient()

////// -- GET All USERS -- //////
async function getAllUsers(req, res) {
    const allUsers = await prisma.user.findMany({
        // select:{
        //     username:true,
        //     email:true,
        //     role:true,
        //     notes:{
        //         select:{title:true}
        //     }
        // }
    })
    res.status(200).json(allUsers)
  }

////// -- ADD USER -- //////
async function addUsers(req, res) {
  const { username,email, password ,role} = req.body;
  const userExist = await prisma.user.findUnique({where:{email:email}})
  .catch(err=>{
      console.log(err);
      res.json({err:err})
  })
  if(userExist){
      return res.status(400).json({ message: "User with email already exists!" })
  }
  const hashPass = await bcrypt.hash(password,8)
  const userData = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashPass,
      role:role,
    },
  });
  res.json({id:userData.id,username:userData.username,email:userData.email});
}

////// -- UPDATE USER -- //////
async function updateUsers(req, res) {
  const id = Number(req.params.id)
  const {username,email,role} = req.body
  const updatedUser = await prisma.user.update({
    where:{id:id},
    data:{
      username:username,
      email:email,
      role:role,
    }
  }).catch(err=>res.json({error:err}))
  res.json({id:id,username:updatedUser.username})
}
////// -- DELETE USER-- //////
async function deleteUsers(req, res) {
   let id = Number(req.params.id)
    const deletedUser = await prisma.user.delete({
        where: {
          id:id,
        },
      })
    res.json({"Deleted user":deletedUser.username})
  }

module.exports = {getAllUsers,
    addUsers,
    updateUsers,
    deleteUsers}