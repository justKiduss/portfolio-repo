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
    const {movie_id,movie_title,poster_path}=data;

    if(!data.movie_id || !data.movie_title || !data.poster_path ||!user_id){
        return null;
    }

    const res=await watchLatermodel.addMovie(data,user_id);
    return res;
}

