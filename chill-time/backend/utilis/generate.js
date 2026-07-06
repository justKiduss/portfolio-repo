import jwt from "jsonwebtoken";
console.log("key",process.env.JWT_SECRET);
export function generateToken(user){
    return jwt.sign({ id:user.id,username:user.username,role:user.role },process.env.JWT_SECRET,{expiresIn:"7d"});
}