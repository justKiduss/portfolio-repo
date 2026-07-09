import { generateToken } from "../utilis/generate.js";
import { createUserService, deleteUserService, getUserService, getUsersService, loginService, updateUserService } from "../services/userService.js"
import { asyncHandler } from "../utilis/asyncHandler.js";
import model from "../models/userModel.js";

export const getUsers=asyncHandler( async (req,res,next)=>{
    const users=await getUsersService();
    res.status(200).json({success:true,data:users});
})

export const getUser=asyncHandler( async (req,res,next)=>{
    if(req.user.role !== "admin" && req.user.id !== Number(req.params.id)){
        const error=new Error("forbidden");
        error.status=403;
        throw error;
    }
    const user=await getUserService(req.params.id);
    if(!user){
        const error=new Error("user not found");
        error.status=404;
        throw error;
    }
    const {password,...safeUser}=user;
    res.status(200).json({success:true,data:safeUser});
})

export const createUser=asyncHandler( async (req,res,next)=>{
    const newUser=await createUserService(req.body);
    if(!newUser){
        const error=new Error("user not created");
        error.status=400;
        throw error;
    }

    const {token}=newUser.token
    const {password,...safeUser}=newUser.user;
    res.cookie("token",token, {
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    });
    res.status(201).json({success:true,data:safeUser,msg:"user created"});
})

export const loginUser=asyncHandler( async(req,res,next)=>{
    const result=await loginService(req.body);
    if(!result){
        const error=new Error("Invalid credentials");
        error.status=400;
        throw error; 
    }
    const {user,token}=result;
    const {password,...safeUser}=user;
    res.cookie("token",token, {
        httpOnly:true,
        // secure:process.env.NODE_ENV==='production',
        secure:false,
        // process.env.NODE_ENV==='production'?"none":
        sameSite:"lax",
        maxAge:7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({success:true,user:safeUser,msg:"user logging in"});
})
export const updateUser=asyncHandler( async(req,res,next)=>{
    const isOwner=Number(req.user.id) == Number(req.params.id);
    

    if(!isOwner){
        const error=new Error("Forbidden");
        error.status=403;
        throw error;
    }
    const updated=await updateUserService(req.params.id,req.body);
 
    if(!updated){
        const error=new Error("user not found");
        error.status=404;
        throw error;
    }

    const {password,...safeUser}=updated;
    res.status(200).json({success:true,data:safeUser,msg:"user updated"});
})

export const deleteUser=asyncHandler( async (req,res,next)=>{
    const deleted=await deleteUserService(req.params.id);

    if(!deleted){
        const error=new Error("user not found");
        error.status=404;
        throw error; 
    }
    
    const {password,...safeUser}=deleted;
    res.status(200).json({success:true,data:safeUser,msg:"user deleted by admin/moderator"})
})

export const deleteOwnAccount = asyncHandler(async (req, res) => {
    const deleted = await deleteUserService(req.user.id);

    if (!deleted) {
        const error = new Error("user not found");
        error.status = 404;
        throw error;
    }

    const { password, ...safeUser } = deleted;

    res.status(200).json({
        success: true,
        data: safeUser,
        msg: "account deleted"
    });
});

export const logout=asyncHandler(async(req,res)=>{
    res.clearCookie("token",{
            httpOnly:true,
            samesite:process.env.NODE_ENV==='production'?"none":"lax",
            secure:process.env.NODE_ENV==="PRODUCTION"
        }
    )
    res.status(200).json({
            success:true,
            msg:"logged out"
        })
})

export const checkAuth=asyncHandler(async(req,res)=>{
        const {id}=req.user;
        const user=await model.getById(id);
        if(!user){
            const error = new Error("user not found");
            error.status = 404;
            throw error;
        };
        res.status(200).json({
            msg:"user authenticated",
            success:true,
            data:{
                user:{
                    id:user.id,
                    username:user.username,
                    email:user.email
                }
            }
        })
})