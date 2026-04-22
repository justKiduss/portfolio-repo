import model from "../models/reviewModel.js";
import {logger} from "../utilis/logger.js"
export async function getAllService(){
    return await model.getAll();
}

export async function getReviewByIdService(id){
    if(!id) return null
    return await model.getById(id);
}
export async function countReviewsByMovieIdService(movie_id){
    if(!movie_id) return 0;
    return await model.countReviewsByMovieId(movie_id);
}
export async function getReviewByMovieIdService(movie_id,page,limit){
    if(!movie_id) return null;
    //Page 1: $(1 - 1) *10 = {0}.The DB skips 0 rows and takes the first 10. (Rows 1–10).
    const start=Date.now();
    const offSet=(page-1)*limit;
    const reviews=await model.getReviewsByMovieId(movie_id,limit,offSet);
    const duration=Date.now() - start;

    logger.info({
        service:'getReviewByMovieIdService',
        movie_id,
        page,
        limit,
        duration:`${duration}ms`
    })
    return reviews;
}
export async function createService(data){
    if(!data) return null;
    // we use this write a script to import reviews from a CSV file example when their is data migration ? That script won't use your middleware.
    const normalized={
        movie_id:data.movie_id,
        movie_title:data.movie_title.trim(),
        rating:Number(data.rating),
        review:data.review? data.review.trim() : null,
        user_id:data.user_id
    }
    // const existing=await model.getReviewsByMovieId(normalized.movie_id);

    // const duplicate=existing.find(r=>
    //     r.review===normalized.review &&
    //     r.movie_title
    // )
    return await model.create(normalized);
}

export async function updateService(id,data){
    if(!id || !data) return null;
    return await model.update(id,data);
}

export async function deleteService(id,user_id){
    if(!id || !user_id) return null;
    return  await model.delete(id,user_id);
}