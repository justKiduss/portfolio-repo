// import express, { Router } from "express";
// import protect from "../middleware/protect";
// import isMember from "../middleware/isMember";
// import isMessageOwnerOrAdmin from "../middleware/isMessageOwnerorAdmin";
// import { deleteMessageController, getAllConversationController, sendMessageController, updateMessageController } from "../controller/groupMessageController";

// const groupMessage_route=express.Router();

// groupMessage_route.get('/message/:id',protect,isMember,getAllConversationController);
// groupMessage_route.get('/:id',protect,isMember,sendMessageController);
// groupMessage_route.post('/:id',protect,isMember,isMessageOwnerOrAdmin,updateMessageController);
// groupMessage_route.delete("/:id",protect,isMember,isMessageOwnerOrAdmin,deleteMessageController);

// export default groupMessage_route;


import express from "express";
import protect from "../middleware/protect";
import isMember from "../middleware/isMember";
import isMessageOwnerOrAdmin from "../middleware/isMessageOwnerorAdmin";
import { 
    deleteMessageController, 
    getAllConversationController, 
    sendMessageController, 
    updateMessageController 
} from "../controller/groupMessageController";

const groupMessage_route = express.Router();

// Get conversations (Group Context)
groupMessage_route.get('/message/:id', protect, isMember, getAllConversationController);

// Send message (Group Context)
groupMessage_route.post('/:id', protect, isMember, sendMessageController);

// Update/Delete message (Group Context + Specific Message Context)
groupMessage_route.put('/:id/message/:messageId', protect, isMember, isMessageOwnerOrAdmin, updateMessageController);
groupMessage_route.delete('/:id/message/:messageId', protect, isMember, isMessageOwnerOrAdmin, deleteMessageController);

export default groupMessage_route;