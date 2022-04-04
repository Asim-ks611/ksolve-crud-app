const fs = require("fs");
const jwt = require("jsonwebtoken");

const logger = function (req, res, next) {
  let token = req?.cookies["jwt"]
  if (token === undefined) {
    let currentTime = Date.now();
    let method = req.method;
    let path = req.url;
    let status = res.statusCode;
    res.on("finish", async () => {
      try {
        let timeTaken = Date.now() - currentTime;
        let log = `${method}: ${path}: ${status}: ${timeTaken} ms: Guest:`;
        console.log(log);
        fs.appendFile("./logs/logger.txt", log + "\n", (err) => {
          if (err) {
            console.log(err);
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
    next();
  } else {
    let currentUser = jwt.verify(token,process.env.SECRET_KEY);
    let currentTime = Date.now();
    let method = req.method;
    let path = req.url;
    let status = res.statusCode;
    res.on("finish", async () => {
      try {
        let timeTaken = Date.now() - currentTime;
        let log = `${method}: ${path}: ${status}: ${timeTaken} ms: ${currentUser?.username}:`;
        console.log(log);
        fs.appendFile("./middleware/logger.txt", log + "\n", (err) => {
          if (err) {
            console.log(err);
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
    next();
  }
};

module.exports = logger;
