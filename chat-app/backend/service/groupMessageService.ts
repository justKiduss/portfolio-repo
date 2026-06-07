import { AppError } from "../middleware/error";
import groupMessModel from "../models/groupMessage_Model";

interface sendMessageDTO {
    text?: string | null,
    image?: string | null,
    voice?: string | null,
    video?: string | null,
}

interface updateMessageDTO {
    text?: string | null,
    image?: string | null,
    voice?: string | null,
    video?: string | null,  
}

export async function getAllConversationService(group_id: number, sender_id: number) {
    if (!group_id || !sender_id) {
        throw new AppError("Group ID and Sender ID are required", 400);
    }
    return await groupMessModel.getGroupMessages(group_id, sender_id);
}

export async function sendMessageService(sender_id: number, group_id: number, data: sendMessageDTO) {
    if (!sender_id || !group_id) {
        throw new AppError('Missing required fields', 400);
    }
    if (!data.text && !data.image && !data.voice && !data.video) {
        throw new AppError('Message cannot be empty', 400);
    }
    return await groupMessModel.create(sender_id, group_id, data);
}

export async function updateMessageService(id: number, data: updateMessageDTO) {
    if (!id) {
        throw new AppError("Missing message ID", 400);
    }
    const updated = await groupMessModel.update(id, data);
    if (!updated) {
        throw new AppError("Message not found", 404);
    }
    return updated;
}

export async function deleteMessageService(id: number) {
    if (!id) {
        throw new AppError("Missing message ID", 400);
    }
    const deleted = await groupMessModel.delete(id);
    if (!deleted) {
        throw new AppError("Message not found", 404);
    }
    return deleted;
}

