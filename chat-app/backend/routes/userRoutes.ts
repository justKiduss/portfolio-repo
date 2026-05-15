import express from "express";
import { createController, deleteController, getAllUserController, getByIdController, loginController, updateController } from "../controller/userController";
import protect from "../middleware/protect";

const router=express.Router()

router.get('/',protect,getAllUserController);
router.get('/:id',protect,getByIdController);
router.post('/signup',createController);
router.post('login',loginController);
router.put('/:id',protect,updateController);
router.delete('/:id',protect,deleteController);

export default router;
