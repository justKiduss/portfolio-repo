// export const validateReview=(req,res,next)=>{
//         const {movie_id,movie_title,rating,review}=req.body;

//         const parsedRating = parseFloat(rating);
//         const hasReview = review && typeof review === "string" && review.trim().length > 0;
//         const hasRating = !isNaN(parsedRating) && parsedRating > 0 && parsedRating <= 5;

//         const inValid = !movie_id || typeof movie_id !== "number" ||
//                 !movie_title || typeof movie_title !== "string" ||
//                 (!hasReview && !hasRating);

//         if(inValid){
//             const error=new Error("Invalid input")
//             error.status = 400;
//             return next(error);
//         }
//         req.body={
//             movie_id:movie_id,
//             movie_title:movie_title.trim(),
//             rating:hasRating ? parsedRating : null,
//             review:review?review.trim():null
//         }

//         next();
// } 


export const validateReview = (req, res, next) => {
    const { movie_id, movie_title, rating, review } = req.body;
    
    // NEW: Check if this is an update
    const isUpdate = req.method === 'PATCH' || req.method === 'PUT';

    const parsedRating = parseFloat(rating);
    const hasReview = review && typeof review === "string" && review.trim().length > 0;
    const hasRating = !isNaN(parsedRating) && parsedRating >= 0 && parsedRating <= 5;

    // NEW: Only require movie info if we aren't updating
    const movieDataMissing = !isUpdate && (!movie_id || !movie_title);
    const contentMissing = (!hasReview && !hasRating);

    if (movieDataMissing || contentMissing) {
        const error = new Error("Invalid input");
        error.status = 400;
        return next(error);
    }

    // NEW: Flexible body mapping
    req.body = {
        movie_id: movie_id ? Number(movie_id) : undefined,
        movie_title: movie_title ? movie_title.trim() : undefined,
        rating: hasRating ? parsedRating : null,
        review: review ? review.trim() : null
    };

    next();
};