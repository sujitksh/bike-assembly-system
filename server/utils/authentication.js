const jwt = require("jsonwebtoken");

function createTokenForUser(user){
  const payload = {
    _id:user._id,
    username:user.username,
    role:user.role,
    name:user.fullname,
  }
  const token = jwt.sign(payload,process.env.JWT_SECRET_TOKEN);
  return token;
}

function validateTokenForUser(token){
     const payload = jwt.verify(token,process.env.JWT_SECRET_TOKEN);
     return payload;
}
module.exports = {createTokenForUser,validateTokenForUser}