import express from "express";

import protect from "../middleware/protect";
import { deleteService, getAllConversationController, sendMessageController, updateMessageController } from "../controller/messageController";
const messageRouter=express.Router();

messageRouter.get('/:id',protect,getAllConversationController);
messageRouter.post('/:id',protect,sendMessageController);
messageRouter.put('/:id',protect,updateMessageController);
messageRouter.delete('/:id',protect,deleteService);

export default messageRouter;
