import { AppError } from "../middleware/error";
import model from "../models/messageModel";
interface sendMessageDTO{
    receiverId:number;
    text:string;
    image:string;
}

interface updateMessageDTO{
    text:string;
    image:string;
}
export async function getAllConversationService(senderId:number,receiverId:number){
    if(!senderId || !receiverId){
        throw new AppError("Both user id is needed",400);
    }

    return await model.getConversationMessages(senderId,receiverId)
}

export async function sendMessageService(senderId:number,data:sendMessageDTO){
    if (!senderId || !data.receiverId) throw new AppError("Missing required fields", 400);
    if (!data.text && !data.image) throw new AppError("Message cannot be empty", 400);
    return await model.create(senderId,data);

}
// id is for the userid
export async function updateMessageService(id:number,data:updateMessageDTO){
    if(!data.text && !data.image){
        throw new AppError("can't be empty",400);
    }
    return await model.update(id,data);
}

// delets by message id
export async function deleteMessageService(id:number,userId:number){
    if(!id){
        throw new AppError("id is needded",400);
    }
    const message=await model.getById(id);
    if(!message){
        throw new AppError("message not found",400);
    }
    const senderId=message.senderId===userId;
    if(!senderId) throw new AppError("sender id is mandatory",400);
    return await model.delete(id,userId);
}

