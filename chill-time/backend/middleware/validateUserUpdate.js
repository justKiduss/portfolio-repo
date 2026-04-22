export const validateUserUpdate = (req,res,next)=>{
    const { username, email, password } = req.body;

    if (username && typeof username !== "string") {
        return next(new Error("Invalid username"));
    }

    if (email && typeof email !== "string") {
        return next(new Error("Invalid email"));
    }

    if (password && typeof password !== "string") {
        return next(new Error("Invalid password"));
    }

    next();
};