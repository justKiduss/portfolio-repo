import type { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/error";
import { 
    deleteMessageService, 
    getAllConversationService, 
    sendMessageService, 
    updateMessageService 
} from "../service/groupMessageService";
import { io } from "../socket/socket";

export async function getAllConversationController(req: Request, res: Response, next: NextFunction) {
    try {
        const sender_id = req.user.id;
        const group_id = req.params.id;

        if (!sender_id || !group_id) {
            throw new AppError('Sender ID and Group ID are required', 400);
        }
        const result = await getAllConversationService(Number(group_id), Number(sender_id));
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export async function sendMessageController(req: Request, res: Response, next: NextFunction) {
    try {
        const sender_id = req.user.id;
        const group_id = req.params.id;
        const text = req.body.text?.trim() || null;
        let image = null; let voice = null; let video = null;

        if (!text && !image && !voice && !video) {
            throw new AppError('Message required', 400);
        }

        const result = await sendMessageService(Number(sender_id), Number(group_id), { text, image, voice, video });
        io.to(`group_${group_id}`).emit("newGroupMessage",result);

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export async function updateMessageController(req: Request, res: Response, next: NextFunction) {
    try {
        const message_id = req.params.messageId; // Fixed parameter targeting
        const text = req.body.text?.trim() || null;
        const image = req.body.image || null;
        const voice = req.body.voice || null;
        const video = req.body.video || null;

        if (!text && !image && !voice && !video) {
            throw new AppError('Message content required to update', 400);
        }

        const result = await updateMessageService(Number(message_id), { text, image, voice, video });

        const targetRoomId =result?.group_id;
        if (targetRoomId) {
            io.to(`group_${targetRoomId}`).emit("updateGroupMessage", result);
        }

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteMessageController(req: Request, res: Response, next: NextFunction) {
    try {
        const message_id = req.params.messageId; // Fixed parameter targeting

        if (!message_id) {
            throw new AppError("Message ID is required", 400);
        }

        const result = await deleteMessageService(Number(message_id));

        if (result.group_id) {
            io.to(`group_${result.group_id}`).emit("deleteGroupMessage", { messageId: Number(message_id) });
        }

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}