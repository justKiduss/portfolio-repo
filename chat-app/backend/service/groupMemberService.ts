import { AppError } from "../middleware/error";
import model from "../models/groupMember_Model";
import groupModel from "../models/groupModel";


export async function checkMember(group_id:number,user_id:number){
    if(!group_id || !user_id){
        throw new AppError("group_id and user id is needed",400);
    }
    const res=await model.isUserInGroup(group_id,user_id);
    return res;
}

export async function getAllMembersService(group_id:number){
    if(!group_id){
            throw new AppError("group not found",400);
    }
    const res=await model.getAllGroupMembers(group_id);
    return res;
}

export async function searchMembersService(group_id: number, username: string) {
    // 1. Ensure the required parameters are provided
    if (!group_id) {
        throw new AppError("Group ID is required", 400);
    }
    if (!username || !username.trim()) {
        throw new AppError("Search query (username) is required", 400);
    }

    // 2. Call the scoped model function with both parameters
    const res = await model.searchGroupMembers(group_id, username.trim());
    return res;
}

export async function addGroupMemberSerice(group_id:number,username:string){
    if(!group_id || !username){
        throw new AppError("group_name not found",400);
    }
    // const userExistingInGroup=await model.searchGroupMembers(group_id,username);
    // if(userExistingInGroup){
    //     throw new AppError("this user is already in this group",404);
    // }

    const existing=await model.checkExactMember(group_id,username.trim() );

    if(existing){
        throw new AppError(
            "user already exists in group",
            409
        );
    }

    const res=await model.addGroupMember(group_id,username.trim());
    return res;
}

export async function leaveGroupService(group_id: number, loggedInUserId: number, targetUserId: number) {
    // 1. Fetch the group to check who the admin is
    const group = await groupModel.getGroupsById(group_id);
    if (!group) {
        throw new AppError("Group not found", 404);
    }
    console.log(loggedInUserId);
    console.log(targetUserId);

    // CASE 1: The user is trying to leave voluntarily
    if(Number(loggedInUserId)===Number(targetUserId)){
        // Rule: Group admins cannot leave and create adminless groups
        console.log("true, are loggedInUserId === targetUserId equal")
        if (group.group_admin === loggedInUserId) {
            throw new AppError("Admin cannot leave the group. You must delete the group or transfer ownership first.", 400);
        }
    } 
    // CASE 2: The logged-in user is trying to kick someone else out
    else {
        // Rule: Only the group admin can kick other members
        if (group.group_admin !== loggedInUserId) {
            throw new AppError("Access denied. Only the group admin can kick members.", 403);
        }
    }

    // 2. Execute the deletion since validations passed
    const res = await model.leaveGroup(group_id, targetUserId);
    if (!res) {
        throw new AppError("The user is not a member of this group", 404);
    }

    return res;
}

