import watchLatermodel from "../models/watch_later.js";
import model from "../models/watch_later.js";

export const getAllWatchService=async(user_id)=>{
    if(!user_id){
        return null;
    } 
    const res=await watchLatermodel.getall(user_id);
    return res;
}

export const addWatchLaterService=async(data,user_id)=>{
    const {movieId,title,poster,type,timestamp}=data;

    if(!movieId || !title || !poster ||!user_id){
        return null;
    }

    const res=await watchLatermodel.addMovie(data,user_id);
    return res;
}

