const jwt = require("jsonwebtoken");

const isLoggedIn = async function (req, res, next) {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.SECRET_KEY)
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token", error: error.name });
  }
};

module.exports = isLoggedIn;

/**
 const isLoggedIn = async function (req, res, next) {
  try {
    const token = req.cookies.jwt;
    const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
    if(verifiedUser.role ==="admin"){
      return next()
    }else{
      return res.status(401).json({ message: "Your are not authorized to visit this page!"});
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized User", error: error.name });
  }
};
 */