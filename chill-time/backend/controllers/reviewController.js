import { validateReview } from "../middleware/validateReview.js";
import { getAllService, getReviewByIdService, createService, updateService, deleteService,getReviewByMovieIdService, countReviewsByMovieIdService } from "../services/reviewService.js";
import { asyncHandler } from "../utilis/asyncHandler.js";
export const getReviews=asyncHandler(async(req,res,next)=>{
        const reviews=await getAllService();
        res.status(200).json({success:true,data:reviews});
});

export const getReview=asyncHandler(async (req,res,next)=>{
                const review=await getReviewByIdService(req.params.id);
                if (!review) {
                        const error = new Error("Review not found");
                        error.status = 404;
                        throw error;
                }
                res.status(200).json({success:true,data:review});
});
export const getReviewsByMovieId=asyncHandler(async (req,res,next)=>{
        const {movie_id}=req.params;

        let page=parseInt(req.query.page);
        let limit=parseInt(req.query.limit);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;
        if (limit > 50) limit = 50;
        
        const reviewForAmovie=await getReviewByMovieIdService(movie_id,page,limit);
        const total=await countReviewsByMovieIdService(movie_id);
        const pages=Math.ceil(total/limit);
        if(reviewForAmovie.length === 0){
                return res.status(200).json({success:true,page,limit,total,pages,data: []});
        }
        res.status(200).json({success:true,page,limit,total,pages,data:reviewForAmovie});

});

export const createReviews=asyncHandler(async (req,res,next)=>{

        const newReview=await createService({...req.body,user_id:req.user.id});
        if (!newReview) {
                const error = new Error("Review is not created");
                error.status = 400;
                throw error;
        }

        res.status(201).json({success:true,data:newReview});   
});

export const updateReview=asyncHandler(async (req,res,next)=>{   

        const updated=await updateService(req.params.id,{...req.body,user_id:req.user.id});
        if (!updated) {
                const error = new Error("Review not found");
                error.status = 404;
                throw error;
        }
        res.status(200).json({success:true,data:updated});
});

export const deleteReview=asyncHandler(async (req,res)=>{
        const deleted=await deleteService(req.params.id,req.user.id);
        if (!deleted) {
                const error = new Error("Review not found");
                error.status = 404;
                throw error;
        }
        res.status(200).json({
                success:true,
                data:deleted
        });   
});


