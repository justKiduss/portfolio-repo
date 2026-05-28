import type {Request,Response,NextFunction} from "express";
import { addGroupMemberSerice, getAllMembersService, leaveGroupService, searchMembersService } from "../service/groupMessageService";
import { AppError } from "../middleware/error";
import { getGroupsByIdService } from "../service/groupService";

export async function getAllMembersController(req:Request,res:Response,next:NextFunction){
    try{
        const group_id=req.params.id;
        const result=await getAllMembersService(Number(group_id));
        return res.status(200).json({
            success:true,
            data:result
        })
    }catch(error){
        next(error);
    }
}

export async function searchMembersController(req:Request,res:Response,next:NextFunction){
    try{
        const username=req.body.username;
        const group_id=req.params.id;
        const result=await searchMembersService(Number(group_id),username);
        return res.status(200).json({
            success:true,
            data:result
        })
    }catch(error){
        next(error);
    }
}

export async function addGroupMemberController(req:Request,res:Response,next:NextFunction){
    try{
        const {group_id,username}=req.body;
        const adminId=req.user.id;
        const group=await getGroupsByIdService(group_id);

        if(!group){
            throw new AppError("group not found",404);
        }

        if(group.group_admin!==adminId){
            throw new AppError("only admin can add members",403);
        }

        const result=await addGroupMemberSerice(Number(group_id),username);
        return res.status(200).json({
            success:true,
            data:result
        })
    }catch(error){
        next(error);
    }
}

export async function leaveGroupController(req: Request, res: Response, next: NextFunction) {
    try {
        const loggedInUserId = req.user.id; // The person making the API request
        const group_id = req.params.id;
        
        // If target_user_id is in body, it's a kick. Otherwise, the user is leaving.
        const targetUserId = req.body.target_user_id ? Number(req.body.target_user_id) : loggedInUserId;

        const result = await leaveGroupService(Number(group_id), loggedInUserId, targetUserId);

        res.status(200).json({
            success: true,
            message: loggedInUserId === targetUserId ? "Left group successfully" : "Member kicked successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}
