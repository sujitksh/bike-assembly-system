const jwt = require("jsonwebtoken");
const { validateTokenForUser } = require("../utils/authentication");

const authMiddleware = (req,res,next)=>{
   const token = req.header("Authorization");
   if(!token){
     return res.status(401).json({msg:"Unauthorized user"})
   }
   const jwtToken = token.replace("Bearer","").trim();
   try {
       const isVerified = validateTokenForUser(jwtToken);
       req.user = isVerified;
       next();
   } catch (error) {
     return res.status(401).json({msg:"Unauthorized user"})
   }
   
}
module.exports = {authMiddleware}