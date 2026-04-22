export const validateId=(req,res,next)=>{
    const {id}=req.params;

    if(!id || isNaN(Number(id))){
        const error=new Error("Invalid id");
        error.status=400;
        return next(error);
    }
    next();
};