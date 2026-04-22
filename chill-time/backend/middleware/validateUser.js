export const validateUser=(req,res,next)=>{
    const {username,email,password}=req.body;
    if (
        !username || typeof username !== "string" ||
        !email || typeof email !== "string" ||
        !password || typeof password !== "string"
    ) {
        const error = new Error("Invalid input");
        error.status = 400;
        return next(error);
    }

    req.body = {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        avatar: req.body.avatar ? req.body.avatar.trim() : null
    };

    next();
}
