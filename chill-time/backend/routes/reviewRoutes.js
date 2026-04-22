// POST //create review
// GET //get reviews 
// DELETE // delete review//:id
// PATCH //update review/:id

import express from "express";
import { getReviews,createReviews, getReview, updateReview, deleteReview,getReviewsByMovieId} from "../controllers/reviewController.js";
import { validateReview } from "../middleware/validateReview.js";
import { validateId } from "../middleware/validateId.js"
import validateMovieId from "../middleware/validateMovieId.js";
import { protect } from "../middleware/protect.js";
    const router=express.Router();
        router.get('/',getReviews);

        router.get('/movie/:movie_id',validateMovieId,getReviewsByMovieId);

        router.get('/:id',validateId, getReview);

        router.post('/',protect , validateReview ,createReviews);

        router.patch('/:id', protect ,validateId,validateReview ,updateReview);

        router.delete("/:id",protect ,validateId ,deleteReview);


    export default router;

    