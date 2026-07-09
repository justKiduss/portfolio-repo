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
    // [
    //     {
    //         id: '4',
    //         user_id: 1,
    //         movie_id: '12',
    //         movie_title: 'kingdom of heaven',
    //         rating: 4.5,
    //         review: 'this is an amazing movie',
    //         created_at: 2026-07-08T22:59:27.622Z,
    //         updated_at: 2026-07-08T22:59:27.622Z,
    //         parent_id: null
    //     }
    // ]

    const reviewMap={};
    const tree=[];

    for(const review of reviews){

        reviewMap[review.id] = {
            ...review,
            replies:[]
        };

    }

    for(const review of reviews){

        if(review.parent_id){

            const parent = reviewMap[review.parent_id];

            if(parent){
                parent.replies.push(
                    reviewMap[review.id]
                );
            }

        }else{

            tree.push(
                reviewMap[review.id]
            );

        }

    }

    console.log("revirews",reviews)
    logger.info({
        service:'getReviewByMovieIdService',
        movie_id,
        page,
        limit,
        duration:`${duration}ms`
    })
    return tree;
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
    return await model.create(normalized);
}
// req.params.id,req.user,req.body
export async function createReplyService(parentId,user,data){
    if(!parentId || !user || !data){
        return null;
    }
    const normalized={
        movie_id:data.movie_id,
        movie_title:data.movie_title ? data.movie_title.trim():null,
        rating:data.rating?Number(data.rating):null,
        review:data.review? data.review.trim() : null,
        // user_id:data.user_id
    }
    console.log("normalize",normalized);
    console.log("parent_id",parentId);
    console.log("user",user)
    return await model.createReply(parentId,user,normalized);
}

export async function updateService(id,data){
    // id is the review id
    // data = {...req.body,user:req.user} 
    if(!id || !data ||!data.user) return null;
    const existingReview = await model.getById(id);
    if (!existingReview) return null;
    const isOwner = existingReview.user_id === data.user.id;
    const isAdmin = data.user.role === 'admin';

    if (!isOwner && !isAdmin) {
        // Return a special flag or throw an error your asyncHandler can catch
        const error = new Error("Not authorized");
        error.status = 403;
        throw error;
    }
    return await model.update(id,data)
}

export async function deleteService(id,user){
    if(!id || !user) return null;

    const existingReview = await model.getById(id);
    if (!existingReview) return null;
    const isOwner = existingReview.user_id === user.id;
    const isAdmin = user.role === 'admin';

    if (!isOwner && !isAdmin) {
        // Return a special flag or throw an error your asyncHandler can catch
        const error = new Error("Not authorized");
        error.status = 403;
        throw error;
    }
    return  await model.delete(id,user);
}