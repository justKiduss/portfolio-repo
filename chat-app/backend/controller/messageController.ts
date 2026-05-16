import type {Request,Response,NextFunction} from "express";
import { AppError } from "../middleware/error";
import { deleteMessageService, getAllConversationService, sendMessageService, updateMessageService } from "../service/messageService";

export async function getAllConversationController(req:Request,res:Response,next:NextFunction){
    try{
        const senderId=req.user.id;
        const receiverId=req.params.id;

        if(!senderId||!receiverId){
            throw new AppError('both the sender and the receiver Id is needed',400);
        }
        const result=await getAllConversationService(Number(senderId),Number(receiverId));
        res.status(200).json({
            success:'true',
            data:result
        })
    }catch(error){
        next(error);
    }
} 

export async function sendMessageController(req:Request,res:Response,next:NextFunction){
    try{
        const senderId=req.user.id;
        const receiverId=req.params.id
        const {text,image}=req.body;
        if(!text&& !image){
            throw new AppError('message required',400);
        }
        const result =await sendMessageService(Number(senderId),Number(receiverId),{text,image});

        res.status(201).json({
            success:true,
            data:result
        })

    }catch(error){
        next(error);
    }
}

export async function updateMessageController(req:Request,res:Response,next:NextFunction){
    try{
        const {data}=req.body;
        const id=req.params.id;

        if(!data || !id){
            throw new AppError('for update the id and content required',400);
        }

        const result=await updateMessageService(Number(id),data);
        res.status(200).json({
            succes:true,
            data:result
        })
    }catch(error){
        next(error);
    }
}

export async function deleteService(req:Request,res:Response,next:NextFunction){
    try{
        const userId=req.user.id;
        const id=Number(req.params.id);
        
        if(!id || !userId){
            throw new AppError('delete service take to id arguments',400);
        }
        const result=await deleteMessageService(id,userId);
        res.status(200).json({
            success:true,
            data:result
        })
    }catch(error){
        next(error);
    }
}