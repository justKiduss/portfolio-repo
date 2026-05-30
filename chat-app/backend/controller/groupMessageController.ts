// import type {Request,Response,NextFunction} from "express";
// import { AppError } from "../middleware/error";
// import { deleteMessageService, getAllConversationService, sendMessageService, updateMessageService } from "../service/groupMessageService";



// export async function getAllConversationController(req:Request,res:Response,next:NextFunction){
//     try{
//         const sender_id=req.user.id;
//         const group_id=req.params.id;

//         if(!sender_id || !group_id){
//             throw new AppError('sender id and group is needed',400);
//         }
//         const result=await getAllConversationService(Number(group_id),Number(sender_id));
//         res.status(200).json({
//             success:true,
//             data:result
//         })
//     }catch(error){
//         next(error);
//     }
// }

// export async function sendMessageController(req:Request,res:Response,next:NextFunction){
//     try{
//         const sender_id=req.user.id;
//         const group_id=req.params.id;
//         const text=req.body.text?.trim();
//         let image=null;
//         let voice=null;
//         let video=null;

//         // if (req.file) {
//         //     image = await uploadToCloudinary(req.file.buffer);
//         // }

//         if(!text && !image && voice && video){
//             throw new AppError('message required',400);
//         }

//         const result=await sendMessageService(Number(sender_id),Number(group_id),{text,image,voice,video});
        
//         res.status(201).json({
//             success:true,
//             data:result
//         })

//     }catch(error){
//         next(error);
//     }
// }

// export async function updateMessageController(req:Request,res:Response,next:NextFunction){
//     try{
//         const group_id=req.params.id;
//         let text=req.body.text?.trim();
//         let image=req.body.image;
//         let voice=req.body.voice;
//         let video=req.body.video;

//         if(!text && !image && voice && video){
//             throw new AppError('message required',400);
//         };
//         const result=await updateMessageService(Number(group_id),{text,image,voice,video});

//         res.status(201).json({
//             success:true,
//             data:result
//         })
//     }catch(error){
//         next(error)
//     }
// }

// export async function deleteMessageController(req:Request,res:Response,next:NextFunction){
//     try{
//         const id=req.params.id;
//         const sender_id=req.user.id;

//         if(!id || sender_id){
//             throw new AppError("id and sender_id needed",400);
//         }

//         const result=await deleteMessageService(Number(id),Number(sender_id));
//         res.status(200).json({
//             success:true,
//             data:result
//         })
        
//     }catch(error){
//         next(error);
//     }
// }


import type { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/error";
import { 
    deleteMessageService, 
    getAllConversationService, 
    sendMessageService, 
    updateMessageService 
} from "../service/groupMessageService";

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
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}