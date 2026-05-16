import type {Request,Response,NextFunction} from "express";
import { create, deleteUser, getAllUserService,getByIdService,login, update } from "../service/userService";
import { AppError } from "../middleware/error";



export async function getAllUserController(req:Request,res:Response,next:NextFunction){
    try{
        const result=await getAllUserService();
        return res.status(200).json(
            {
                success:true,
                data:result,
            }
        ) 
    }catch(error){
        next(error)
    }
}

export async function getByIdController(req:Request,res:Response,next:NextFunction){
    try{
        const result=await getByIdService(Number(req.params.id));
        return res.status(200).json({
            success:true,
            data:result,
        })
    }catch(error){
        next(error);
    }
}

export async function createController(req:Request,res:Response,next:NextFunction){
    try{
        const result=await create(req.body);
        if(!result){
            throw new AppError("user not created",400);
        }
        const {password_hash,...safeUser}=result;
        return res.status(201).json({
            success:true,
            data:safeUser,
        })
    }catch(error){
        next(error)
    }
}

export async function loginController(req:Request,res:Response,next:NextFunction){
    try{
        const result=await login(req.body);
        if(!result){
            throw new AppError("invalid credentails",400);
        }

        const {user,token}=result;

        const {password_hash,...safeUser}=user;

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            success:true,
            msg:"user logged in",
            data:{
                user:safeUser
            }
        })
    }catch(error){
        next(error)
    }
}

export async function updateController(req:Request,res:Response,next:NextFunction){
    try{
        const isOwner=Number(req.params.id)===Number(req.user.id);

        if(!isOwner){
            throw new AppError("forbidden",403);
        }
        const updated=await update(Number(req.params.id),req.body);

        if(!updated){
            throw new AppError("user not found",404);
        }
        const {password_hash,...safeUser}=updated;
        return res.status(200).json({
            success:true,
            data:safeUser,
            msg:"user updated"

        })
    }catch(error){
        next(error)
    }
}

export const deleteController=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        if(Number(req.params.id)!==Number(req.user.id)){
            throw new AppError("forbidden",403);
        }
        const deleted=await deleteUser(Number(req.params.id));
        if(!deleted){
            throw new AppError("user not found",404);
        }

        const {password_hash,...safeUser}=deleted;
        res.status(200).json({
            success:true,
            data:safeUser,
            msg:"user deleted successfuly"
        })
    }catch(error){
        next(error)
    }
}

export async function logout(req:Request,res:Response,next:NextFunction){
    try{
        res.clearCookie("token",{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="production"
        });
        res.status(200).json({
            success:true,
            msg:"logged out"
        })
    }catch(error){
        next(error)
    }
}

