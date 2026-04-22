import express from "express";
import { createUser, deleteOwnAccount, deleteUser, getUser, getUsers, loginUser, updateUser } from "../controllers/userController.js";
import { validateUser } from "../middleware/validateUser.js";
import { protect } from "../middleware/protect.js";
import { authorized } from "../middleware/authorize.js";
import {validateUserUpdate} from "../middleware/validateUserUpdate.js"
const router=express.Router();

    router.get('/',protect,authorized('admin'),getUsers);

    router.post('/',validateUser, createUser);
    router.post('/login',loginUser);

    router.get('/:id',protect,getUser);
    router.put('/:id',protect,validateUserUpdate,updateUser);
    router.delete('/me',protect,deleteOwnAccount);
    router.delete('/:id',protect,authorized('admin'),deleteUser);


export default router;