import { AppError } from "../middleware/error";
import groupmodel from "../models/groupModel";
import model from "../models/userModel";
import { addGroupMemberSerice } from "./groupMessageService";

interface createGroupDTO {
    group_name:string,
    group_admin:number,
    group_profile_pic?:string,
}

export async function getAllGroupsService(){
    const res=await groupmodel.getAllGroups();
    return res;
}

export async function getGroupsByIdService(group_id:number){
    if(!group_id) throw new AppError("groupId required",400);
    const res=await groupmodel.getGroupsById(group_id);
    return res;
}

export async function getByGroupNameService(group_name:string){
    if(!group_name) throw new AppError("group_name required",400);
    const res=await groupmodel.getByGroupName(group_name);
    return res;
}

export async function createService(data:createGroupDTO){
    if(!data.group_name||!data.group_admin){
        throw new AppError("Missing required Fields",400);
    }
    const existingUser=await model.getById(data.group_admin);
    if (!existingUser) {
        throw new AppError("Admin user not found", 404);
    }
    const existingGroup=await groupmodel.getByGroupName(data.group_name);
    if(existingGroup){
        throw new AppError("group_name already Exists",409);
    }
    const normalized={
        group_name:data.group_name.trim(),
        group_admin:data.group_admin,
        group_profile_pic:data.group_profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.group_name)}`
    }
    const group=
        await groupmodel.create(
            normalized
        );

    await addGroupMemberSerice(
        group.group_id,
        existingUser.username
    );

    return group;
}

export async function deleteService(group_id:number){
    if(!group_id ) throw new AppError("required all inputs",400);
    const group=await groupmodel.getGroupsById(group_id);
    if(!group){
        throw new AppError("group not found",404);
    }
    return await groupmodel.delete(group_id);
}