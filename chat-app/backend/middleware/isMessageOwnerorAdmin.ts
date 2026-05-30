import type { Request, Response, NextFunction } from "express";
import { AppError } from "./error";
import groupMessModel from "../models/groupMessage_Model";
import groupModel from "../models/groupModel";

export default async function isMessageOwnerOrAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const user_id = req.user.id;
        const group_id = req.params.id; 
        const message_id = req.params.messageId;

        if (!message_id || !group_id) {
            throw new AppError("Group ID and Message ID are required for authorization", 400);
        }

        // 1. Check if the user is the owner of the message
        const isOwner = await groupMessModel.checkMessageOwnership(Number(message_id), user_id);
        if (isOwner) {
            return next(); // User owns the message, allow deletion!
        }

        // 2. Fallback: Check if the user is the group admin
        const isAdmin = await groupModel.isAdmin(Number(message_id), user_id);
        if (isAdmin) {
            return next(); // User is the admin, allow deletion!
        }

        // 3. Both checks failed
        throw new AppError("Access denied. Only the message sender or group admin can delete this message.", 403);
    } catch (error) {
        next(error);
    }
}