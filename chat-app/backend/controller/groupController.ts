import type {Request,Response,NextFunction} from "express";
import { createService, getByGroupNameService,getAllGroupsService, getGroupsByIdService, deleteService} from "../service/groupService";
import { AppError } from "../middleware/error";
import { addGroupMemberSerice } from "../service/groupMemberService";

export async function getAllGroupsController(req:Request,res:Response,next:NextFunction){
    try{
        const result=await getAllGroupsService();
        return res.status(200).json({
            success:true,
            data:result
        })
    }catch(error){
        next(error);
    }
}
export async function getGroupsByNameController(req:Request,res:Response,next:NextFunction){
    try{
        const group_name = req.query.name as string; 

        if (!group_name) {
            return res.status(400).json({ success: false, message: "Group name query is required" });
        }
        const result=await getByGroupNameService(group_name);
        return res.status(200).json({
            success:true,
            data:result
        })
    }catch(error){
        next(error)
    }
}

export async function createGroupController(req:Request,res:Response,next:NextFunction){
    try{
        const adminId=req.user.id;
        const result=await createService({...req.body,group_admin:adminId});
        res.status(201).json({
            success:true,
            data:result
        })
    }catch(error){
        next(error);
    }
}

export async function deleteController(req:Request,res:Response,next:NextFunction){
    try{
        const adminId=req.user.id;
        const group_id=req.params.id;
        const group=await getGroupsByIdService(Number(group_id));
        if(!group){
            throw new AppError("group not found",404);
        }
        const groupAdminId=group.group_admin;

        if(adminId!==groupAdminId){
            throw new AppError("only admin can delete the group",404);
        }
        
        const result=await deleteService(Number(group_id));
        res.status(200).json({
            succss:true,
            data:result
        })
    }catch(error){
        next(error);
    }
}