import model from "../models/continue_watching.js";

export const getAllContinueService=async(user_id)=>{
    if(!user_id){
        return null;
    } 
    const res=await model.getall(user_id);
    return res;
}

export const addContinueService=async(data,user_id)=>{
    const { movieId, title, poster, type, timestamp, season, episode } = data;

    if(!movieId || !title || !poster || !type || !user_id){
        return null;
    }

    const res=await model.addMovie(data,user_id);
    return res;
}

