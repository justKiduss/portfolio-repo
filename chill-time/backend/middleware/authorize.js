export const authorized=(...roles)=>{
    return(req,res,next)=>{
        if(!req.user){
            const error=new Error("not authenticated");
            error.status=401;
            return next(error);
        }
        const isOwner=Number(req.user.id) === Number(req.params.id);
        if(!roles.includes(req.user.role) && !isOwner){
            const error=new Error("not authorized");
            error.status=403;
            return next(error);  
        }
        next();
    }
}