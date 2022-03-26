const fs = require("fs")


const logger = function(req,res,next){
    let currentTime = Date.now()
    let method = req.method;
    let path = req.url
    let status = res.statusCode
    res.on("finish",async ()=>{
         let timeTaken = Date.now() - currentTime
         let log = `${method}: ${path}: ${status}: ${timeTaken} ms:`
         console.log(log)
         fs.appendFile("./middleware/logger.txt",log+"\n",err=>{
            if (err) {
                console.log(err);
              }
        })
    })
    
    next();
}

module.exports = logger