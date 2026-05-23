import express from "express";
import { createController, deleteController, getAllUserController, getByIdController, loginController, updateController,logout, checkAuth} from "../controller/userController";
import protect from "../middleware/protect";

const userRouter=express.Router()

userRouter.get('/',protect,getAllUserController);
userRouter.get('/:id',protect,getByIdController);
userRouter.post('/signup',createController);
userRouter.post('/login',loginController);
userRouter.put('/:id',protect,updateController);
userRouter.delete('/:id',protect,deleteController);
userRouter.post("/logout",protect,logout)
userRouter.get('/checkauth',protect,checkAuth)
export default userRouter;
