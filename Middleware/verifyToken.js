var jwt = require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
  // console.log(req.headers)
    let token=req.headers.token
    // console.log(token)
    next()
    // try {
    //   jwt.verify(token, 'secrect_key', (err, decoded) => {
    //     if (err) {
    //       console.log("ki hoilo")
    //       console.error(err);
          
    //       res.status(401).json("Your token has been expired. Please login again")
    //     } else {
    //       console.log(decoded);
    //       next()
    //     }
    //   });
    // } catch (error) {
    //   res.status(401).json("Your token has been expired. Please login again")
    // }
    
    
}
module.exports=verifyToken