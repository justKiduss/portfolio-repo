import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    
    const token = req.cookies.token;
    if(!token){
        return next(new AppError("Token is not found",401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id:decoded.id,username:decoded.username,role:decoded.role}; // { id: ... }
        next();
        console.log("from protect js",req.user);
    } catch {
        return next(new AppError("Invalid token",401));
    }
};