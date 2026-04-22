import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        const error = new Error("Not authorized");
        error.status = 401;
        return next(error);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id: ... }
        next();
        console.log("from protect js",req.user);
    } catch {
        const error = new Error("Invalid token");
        error.status = 401;
        next(error);
    }
};