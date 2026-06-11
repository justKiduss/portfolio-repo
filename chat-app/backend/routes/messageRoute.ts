import express from "express";
import { upload } from "../config/storage";
import protect from "../middleware/protect";
import { deleteService, getAllConversationController, getInteractedUsersController, sendMessageController, updateMessageController } from "../controller/messageController";
const messageRouter=express.Router();

messageRouter.get('/:id',protect,getAllConversationController);
messageRouter.post('/:id',protect,upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'voice', maxCount: 1 },
        { name: 'video', maxCount: 1 }
    ]),sendMessageController);
messageRouter.put('/:id',protect,updateMessageController);
messageRouter.delete('/:id',protect,deleteService);
messageRouter.get('/',protect,getInteractedUsersController);
export default messageRouter;
