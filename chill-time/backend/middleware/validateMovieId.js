const validateMovieId=(req,res,next)=>{
    const { movie_id }=req.params;

    if(!movie_id){
        const error = new Error("Invalid movie_id");
        error.status = 400;
        return next(error);   
    }
    next();
}
export default validateMovieId;