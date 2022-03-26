const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("node:util");
const { PrismaClient } = require("@prisma/client");

let prisma = new PrismaClient();

//////// ------- USER REGISTRATION/SIGNUP -----------//////////
const authRegister = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const userExist = await prisma.user
    .findUnique({ where: { email: email } })
    .catch((err) => {
      console.log(err);
      res.json({ err: err });
    });
  if (userExist) {
    return res.status(400).json({ message: "User with email already exists!" });
  }
  if(password!==confirmPassword){
    return res.status(400).json({ message: "Passwords Does not Match!" });
  }
  const hashPass = await bcrypt.hash(password, 8);
  const userData = await prisma.user
    .create({
      data: {
        username: username,
        email: email,
        password: hashPass,
      },
    })
    .catch((err) => console.log(err));
  res.json({username,message: "User added successfully" });
};

//////// ------- USER LOGIN -----------//////////
const authLogin = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await prisma.user
    .findUnique({ where: { email: email } })
    .catch((err) => {
      console.log(err);
      res.json({ err: err });
    });
  if (!userExist) {
    return res.status(400).json({ message: "User with email does not exist!" });
  }
  if (userExist && !(await bcrypt.compare(password,userExist.password))) {
    return res.status(400).json({ message: "Incorrect Password!" });
  }
  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    let id = userExist.id;
    const token = jwt.sign({ id,username:userExist.username,role:userExist.role }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    })
    const cookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("jwt", token, cookieOptions);
      res.status(200).json({message:"success",token});
  }
};

//////// ------- USER LOGOUT -----------//////////

const authLogout = (req,res)=>{
    res.cookie('jwt','logout',{ 
      expires : new Date(Date.now()+ 200),
      httpOnly : true
    })
    return res.status(200).json({message:"User loggedOut"})
  }

  module.exports = {
      authRegister,
      authLogin,
      authLogout,
  }