import { addWatchLaterService, getAllWatchService } from "../services/watchLater.js";
import { asyncHandler } from "../utilis/asyncHandler.js";

export const getWatchLaterController=asyncHandler(async(req,res)=>{
    if(!req.user.id){
        const error=new Error("empty field not allowed");
        error.status=404;
        throw error;
    }
    const result=await getAllWatchService(req.user.id);
    res.status(200).json({
        success:true,
        data:result
    })
}) 


export const addWatchLateController=asyncHandler(async(req,res)=>{
    if(!req.user.id || !req.body){
        const error=new Error("empty field not allowed");
        error.status=404;
        throw error;
    }
    const result=await addWatchLaterService(req.body,req.user.id);
    res.status(201).json({
        success:true,
        data:result
    })
})