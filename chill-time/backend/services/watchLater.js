import model from "../models/watch_later.js";

export const getAllWatchService=async(user_id)=>{
    if(!user_id){
        return null;
    } 
    const res=await model.getall(user_id);
    return res.rows;
}

export const addContinueService=async(data)=>{
    const {user_id,movie_id,movie_title,poster_path}=data;

    if(!data.user_id || !data.movie_id || !data.movie_title || !data.poster_path){
        return null;
    }

    const res=await model.addMovie(data);
    return res.rows[0];
}

