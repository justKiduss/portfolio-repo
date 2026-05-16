import { generate } from "../config/generate";
import { AppError } from "../middleware/error";
import model from "../models/userModel"
import bcrypt from "bcrypt";

interface updateDTO{
    username:string,
    email:string,
    profilePic:string,
    currentPassword:string,
    newPassword:string,
    confirmPassword:string
}
interface createDTO{
    username:string,
    email:string,
    password:string,
    profilePic:string,
    isAdmin:boolean
}

interface loginDTO{
    username:string,
    password:string
}
export const getAllUserService=async ()=>{
    const res=await model.getAllUsers();
        return res;
}

export const getByIdService=async (id:number)=>{
    if(!id) throw new AppError("Email required",400);
    const res=await model.getById(id);
        return res;
}

export const getByUsernameService=async(username:string)=>{
    if(!username) throw new AppError("Email required",400);
    const res=await model.getByUsername(username);
    return res;
}

export const getByEmailService=async(email:string)=>{
    if(!email) throw new AppError("Email required",400);
    const res=await model.getByEmail(email);
    return res;
}


export const create=async(data:createDTO)=>{
    if(!data.username||!data.email||!data.password){
        throw new AppError("Missing required Fields",400);
    }
    const existingUser=await model.getByUsername(data.username);
    if(existingUser){
        throw new AppError("Username already Exists",409);
    }
    const existingEmail=await model.getByEmail(data.email);
    if(existingEmail){
        throw new AppError("Email already Exists",409);
    }

    const hashedPassword=await bcrypt.hash(data.password,10);
    const normalized = {
        username: data.username.trim(),
        email: data.email.trim(),
        password: hashedPassword,
        profilePic:
            data.profilePic ??
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        isAdmin: data.isAdmin ?? false
    }
    return await model.create(normalized);
}

export const update=async(id:number,data:updateDTO)=>{

    const user=await model.getById(id);
    if(!user){
        throw new AppError("User not found",404);
    }
    const existingUser=await model.getByUsername(data.username);
    if(existingUser && existingUser.id !== id){
        throw new AppError("Username already Exists",409);
    }
    const existingEmail=await model.getByEmail(data.email);
    if(existingEmail){
        throw new AppError("Email already Exists",409);
    }
    
    let hashedPassword = user.password_hash;
    const isChangingPassword =
        data.newPassword || data.confirmPassword || data.currentPassword;

    if(isChangingPassword){
        if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
            throw new AppError("All password fields are required", 400);
        }
        const isMatch=await bcrypt.compare(
            data.currentPassword,user.password_hash
        );
        if(!isMatch){
            throw new AppError("Current Passowrd incorrect",401);
        }

        if(data.newPassword !== data.confirmPassword){
            throw new AppError("passwords do not match",400);
        }
        const samePassword=await bcrypt.compare(
            data.newPassword,
            user.password_hash
        )
        if(samePassword){
            throw new AppError('New Password must be different',400);
        }
        hashedPassword=await bcrypt.hash(data.newPassword,10);

    }
    const normalized={
        username:data.username?.trim()||user.username,
        email:data.email?.trim() || user.email,
        password:hashedPassword,
        profilePic:data.profilePic|| user.profilePic,
    }

    return await model.update(id,normalized);
}

export const deleteUser=async(id:number)=>{
    if(!id ) throw new AppError("required all inputs",400);
    const user=await model.getById(id);
    if(!user){
        throw new AppError("user not found",404);
    }
    return await model.delete(id);
}

export const login=async(data:loginDTO)=>{
    if(!data.username||!data.password){
        throw new AppError("All fields requires",400);
    }
    const normalized={
        username:data.username.trim(),
        password:data.password.trim()
    }

    const user=await model.getByUsername(normalized.username);
    if(!user){
        throw new AppError("user doesn't exist",401);
    }
    const isMatch=await bcrypt.compare(normalized.password,user.password_hash);
    if(!isMatch){
        throw new AppError("Invalid credientials",401);
    }

    const token=generate(user);
    return {token,user}
}
