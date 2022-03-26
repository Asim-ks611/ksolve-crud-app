const jwt = require("jsonwebtoken");
// const { PrismaClient } = require("@prisma/client");

// let prisma = new PrismaClient();

const isLoggedIn = async function (req, res, next) {
  try {
    const token = req.cookies.jwt;
    const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
    if(verifiedUser.role ==="admin"){
      return next()
    }else{
      return res.status(401).json({ message: "Your are not authorized to visit this page!"});
    }
    // let getUser = await prisma.user.findUnique({
    //             where:{
    //                 id:verifiedUser.id
    //             }
    //         }).catch(err=>new Error(err))
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized User", error: error.name });
  }
};

module.exports = isLoggedIn;
