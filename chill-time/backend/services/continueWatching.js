import model from "../models/continue_watching.js";

export const getAllContinueService=async(user_id)=>{
    if(!user_id){
        return null;
    } 
    const res=await model.getall(user_id);
    return res;
}

export const addContinueService=async(data,user_id)=>{
    const {movie_id,movie_title,poster_path}=data;

    if(!data.movie_id || !data.movie_title || !data.poster_path || !user_id){
        return null;
    }

    const res=await model.addMovie(data,user_id);
    return res;
}

