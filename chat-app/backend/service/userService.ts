import { generate } from "../config/generate";
import { AppError } from "../middleware/error";
import model from "../models/userModel"
import bcrypt from "bcrypt";

interface updateDTO {
    username: string,
    email: string,
    profilePic: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}
interface createDTO {
    username: string,
    email: string,
    password: string,
    profilePic: string,
    isAdmin: boolean
}
interface loginDTO {
    username: string,
    password: string
}

export const getAllUserService = async () => {
    return await model.getAllUsers();
}

export const getByIdService = async (id: number) => {
    if (!id) throw new AppError("userId required", 400);
    return await model.getById(id);
}

export const getByUsernameService = async (username: string) => {
    if (!username) throw new AppError("Username required", 400);
    return await model.getByUsername(username);
}

export const getByEmailService = async (email: string) => {
    if (!email) throw new AppError("Email required", 400);
    return await model.getByEmail(email);
}

export const create = async (data: createDTO) => {
    if (!data.username || !data.email || !data.password) {
        throw new AppError("Missing required Fields", 400);
    }
    
    // 🚀 Fix: getByUsername returns an array. Check if any exact matches exist.
    const matchingUsers = await model.getByUsername(data.username.trim());
    const existingUser = matchingUsers?.find(u => u.username.toLowerCase() === data.username.trim().toLowerCase());
    if (existingUser) {
        throw new AppError("Username already Exists", 409);
    }

    const existingEmail = await model.getByEmail(data.email.trim());
    if (existingEmail) {
        throw new AppError("Email already Exists", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const normalized = {
        username: data.username.trim(),
        email: data.email.trim(),
        password: hashedPassword,
        profilePic: data.profilePic ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        isAdmin: data.isAdmin ?? false
    }
    
    await model.create(normalized);
    
    const usersFound = await model.getByUsername(normalized.username);
    const user = usersFound?.[0]; // 🚀 Fix: Pick the first user out of the array
    const token = generate(user);
    return { user, token }
}

export const update = async (id: number, data: updateDTO) => {
    const user = await model.getById(id);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    
    const matchingUsers = await model.getByUsername(data.username);
    const existingUser = matchingUsers?.find(u => u.username.toLowerCase() === data.username?.trim().toLowerCase());
    if (existingUser && existingUser.id !== id) {
        throw new AppError("Username already Exists", 409);
    }
    
    const existingEmail = await model.getByEmail(data.email);
    if (existingEmail && existingEmail.id !== id) { // Double check ownership mapping here too
        throw new AppError("Email already Exists", 409);
    }
    
    let hashedPassword = user.password_hash;
    const isChangingPassword = data.newPassword || data.confirmPassword || data.currentPassword;

    if (isChangingPassword) {
        if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
            throw new AppError("All password fields are required", 400);
        }
        const isMatch = await bcrypt.compare(data.currentPassword, user.password_hash);
        if (!isMatch) {
            throw new AppError("Current Password incorrect", 401);
        }

        if (data.newPassword !== data.confirmPassword) {
            throw new AppError("passwords do not match", 400);
        }
        const samePassword = await bcrypt.compare(data.newPassword, user.password_hash)
        if (samePassword) {
            throw new AppError('New Password must be different', 400);
        }
        hashedPassword = await bcrypt.hash(data.newPassword, 10);
    }
    
    const normalized = {
        username: data.username?.trim() || user.username,
        email: data.email?.trim() || user.email,
        password: hashedPassword,
        profilePic: data.profilePic || user.profilePic,
    }

    return await model.update(id, normalized);
}

export const deleteUser = async (id: number) => {
    if (!id) throw new AppError("required all inputs", 400);
    const user = await model.getById(id);
    if (!user) {
        throw new AppError("user not found", 404);
    }
    return await model.delete(id);
}

export const login = async (data: loginDTO) => {
    if (!data.username || !data.password) {
        throw new AppError("All fields requires", 400);
    }
    const normalized = {
        username: data.username.trim(),
        password: data.password.trim()
    }

    const usersFound = await model.getByUsername(normalized.username);
    const user = usersFound?.find(u => u.username.toLowerCase() === normalized.username.toLowerCase());
    
    if (!user) {
        throw new AppError("user doesn't exist", 401);
    }
    
    const isMatch = await bcrypt.compare(normalized.password, user.password_hash);
    if (!isMatch) {
        throw new AppError("Invalid credentials", 401);
    }

    const token = generate(user);
    return { token, user }
}