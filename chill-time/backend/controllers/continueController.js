import { addContinueService, getAllContinueService } from "../services/continueWatching.js";
import { asyncHandler } from "../utilis/asyncHandler.js";

export const getAll=asyncHandler(async (req,res)=>{
    if(!req.user.id){
        const error=new Error("empty field not allowed");
        error.status=404;
        throw error;
    }
    const result=await getAllContinueService(req.user.id);
    res.status(200).json({
        success:true,
        data:result
    })
})

export const AddMovie=asyncHandler(async (req,res)=>{
    if(!req.user.id || !req.body){
        const error=new Error("empty field not allowed");
        error.status=404;
        throw error;
    }
    const result=await addContinueService(req.body,req.user.id);
    res.status(200).json({
        success:true,
        data:result
    })
})