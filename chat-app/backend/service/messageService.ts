import { AppError } from "../middleware/error";
import model from "../models/messageModel";

interface sendMessageDTO {
    text?: string | null;
    image?: string | null;
    voice?: string | null;
    video?: string | null;
}

interface updateMessageDTO {
    text?: string | null;
    image?: string | null;
    voice?: string | null;
    video?: string | null;
}

export async function getAllConversationService(senderId: number, receiverId: number) {
    if (!senderId || !receiverId) {
        throw new AppError("Both user id is needed", 400);
    }

    return await model.getConversationMessages(senderId, receiverId);
}

export async function sendMessageService(senderId: number, receiverId: number, data: sendMessageDTO) {
    if (!senderId || !receiverId) throw new AppError("Missing required fields", 400);
    
    // 🚀 SERVICE LAYER FIX: Allows file payloads to pass without text
    if (!data.text && !data.image && !data.voice && !data.video) {
        throw new AppError("Message cannot be empty", 400);
    }
    
    return await model.create(senderId, receiverId, data);
}

export async function updateMessageService(id: number, data: updateMessageDTO) {
    if (!data.text && !data.image && !data.voice && !data.video) {
        throw new AppError("can't be empty", 400);
    }
    return await model.update(id, data);
}

export async function deleteMessageService(id: number, userId: number) {
    if (!id) {
        throw new AppError("id is needded", 400);
    }
    const message = await model.getById(id);
    if (!message) {
        throw new AppError("message not found", 400);
    }
    
    // Safety verification check: map schema properties to runtime values accurately
    const isSender = Number(message.sender_id ?? message.senderId) === Number(userId);
    if (!isSender) throw new AppError("sender id is mandatory", 400);
    
    return await model.delete(id, userId);
}

export async function getInteractedUsersService(id: number) {
    const userId = id;
    if (!userId) {
        throw new AppError("user id is missing", 400);
    }
    return await model.getInteractedUsers(userId);
}