import { logger } from "../utilis/logger.js"

export const requestLogger=(req,res,next)=>{
    logger.info({
        method: req.method,
        url:req.originalUrl,
        user:req.user?.id || null
    })
    next();
}