import { generateToken } from "../utilis/generate.js";
import { createUserService, deleteUserService, getUserService, getUsersService, loginService, updateUserService } from "../services/userService.js"
import { asyncHandler } from "../utilis/asyncHandler.js";

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
    const {password,...safeUser}=newUser;
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
    res.status(200).json({success:true,data:{user:safeUser,token:token},msg:"user logging in"});
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