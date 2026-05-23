import type {Request,Response,NextFunction} from "express";
import { AppError } from "./error";
import jwt from "jsonwebtoken";
export default function protect(req:Request,res:Response,next:NextFunction){
    try{
        const token=req.cookies.token;
        if(!token){
            throw new AppError("unauthorized",401);
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET!) as {
            id:number;
            isAdmin:boolean;
        };

        req.user={id:decoded.id,isAdmin:decoded.isAdmin};
        next();
    }catch(error){
        next(error)
    }
}