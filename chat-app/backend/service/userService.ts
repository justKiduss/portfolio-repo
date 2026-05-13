import { generate } from "../config/generate";
import { AppError } from "../middleware/error";
import model from "../models/userModel"
import bcrypt from "bcrypt";
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


export const create=async(username:string,email:string,password:string,profilePic:string,isAdmin:boolean)=>{
    if(!username||!email||password){
        throw new AppError("Missing required Fiels",400);
    }
    const existingUser=await model.getByUsername(username);
    if(existingUser){
        throw new AppError("Username already Exists",409);
    }
    const existingEmail=await model.getByEmail(email);
    if(existingEmail){
        throw new AppError("Email already Exists",409);
    }

    const hashedPassword=await bcrypt.hash(password.trim(),10);
    const normalized={
        username:username.trim(),
        email:email.trim(),
        password:hashedPassword
    }
    return await model.create(normalized);
}

export const update=async(id:number,username:string,email:string,profilePic:string,currentPassword:string,newPassword:string,confirmPassword:string)=>{

    const user=await model.getById(id);
    if(!user){
        throw new AppError("User not found",404);
    }
    const existingUser=await model.getByUsername(username);
    if(existingUser && existingUser.id !== id){
        throw new AppError("Username already Exists",409);
    }
    const existingEmail=await model.getByEmail(email);
    if(existingEmail){
        throw new AppError("Email already Exists",409);
    }

    const isMatch=await bcrypt.compare(
        currentPassword,user.password
    );

    if(!isMatch){
        throw new AppError("Current Passowrd incorrect",401);
    }

    if(newPassword !== confirmPassword){
        throw new AppError("passwords do not match",400);
    }

    const samePassword=await bcrypt.compare(
        newPassword,
        user.password
    )
    if(samePassword){
        throw new AppError('New Password must be different',400);
    }

    let hashedPassword=user.password;
    if(newPassword){
        hashedPassword=await bcrypt.hash(newPassword,10);
    }
    const normalized={
        username:username?.trim()||user.username,
        email:email?.trim() || user.email,
        password:hashedPassword || user.password,
        profilePic:profilePic|| user.profilePic,
    }

    return await model.update(id,normalized);
}

export const deleteUser=async(id:number,password:string)=>{
    if(!id || !password) throw new AppError("required all inputs",400);
    const user=await model.getById(id);
    if(!user){
        throw new AppError("user not found",404);
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new AppError("Wrong Password",401);
    }

    return await model.delete(id);
}

export const login=async(username:string,password:string)=>{
    if(!username||!password){
        throw new AppError("All fields requires",400);
    }
    const normalized={
        username:username.trim(),
        password:password.trim()
    }

    const user=await model.getByUsername(normalized.username);
    if(!user){
        throw new AppError("user doesn't exist",401);
    }
    const isMatch=await bcrypt.compare(normalized.password,user.password);
    if(!isMatch){
        throw new AppError("Invalid credientials",401);
    }

    const token=await generate(user);
    return {token,user}
}
