import type {Request,Response,NextFunction} from "express";
import { AppError } from "./error";
import { checkMember } from "../service/groupMemberService";

export default async function isMember(req:Request,res:Response,next:NextFunction){
    try{
        const group_id=req.params.id;
        const user_id=req.user.id;

        const hasMemberShip=await checkMember(Number(group_id),user_id);
        if(!hasMemberShip){
            throw new AppError("user is not member in the group",404);
        }
        next();
    }catch(error){
        next(error)
    }
}