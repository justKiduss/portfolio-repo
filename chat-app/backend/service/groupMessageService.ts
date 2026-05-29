import { AppError } from "../middleware/error";
import groupMessModel from "../models/groupMessage_Model";

interface sendMessageDTO {
    text?:string | null,
    image?:string | null,
    voice?:string | null,
    video?:string | null,
}

interface updateMessageDTO {
    text?:string,
    image?:string | null,
    voice?:string | null,
    video?:string | null,  
}

export async function getAllConversationService(group_id:number){
    if(!group_id){
        throw new AppError("group id is needed to get the message",400);
    }
    return await groupMessModel.getGroupMessages(group_id);
}

export async function sendMessageService(sender_id:number,group_id:number,data:sendMessageDTO){
    if(!sender_id || !group_id){
        throw new AppError('missing required fields',400);
    }
    if(!data.text && !data.image && !data.voice && !data.video ){
        throw new AppError('Message cannot be empty',400);
    }
    return await groupMessModel.create(sender_id,group_id,data)

}

export async function updateMessageService(id:number,data:updateMessageDTO){
    if(!id){
        throw new AppError("missing an id",400);
    }
    return await groupMessModel.update(id,data);
}

export async function deleteMessageService(id:number,sender_id:number){
    if(!id || !sender_id){
        throw new AppError("missing inputs",400);
    }
    return await groupMessModel.delete(id,sender_id);
}



