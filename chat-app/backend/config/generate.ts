import jwt from "jsonwebtoken";
interface generateDTO{
    id:number;
    isAdmin:boolean;
}
const secretKey=process.env.JWT_SECRET;
export function generate(user:generateDTO){
    return jwt.sign({id:user.id,isAdmin:user.isAdmin},secretKey,{expiresIn:"7d"}); 
}