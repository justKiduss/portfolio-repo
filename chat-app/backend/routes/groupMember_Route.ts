import express, { Router } from "express";
import protect from "../middleware/protect";
import { addGroupMemberController, getAllMembersController, leaveGroupController, searchMembersController } from "../controller/groupMemberController";

const groupMember_route=express.Router();

groupMember_route.get('/:id',protect,getAllMembersController);
groupMember_route.get('/search/:id',protect,searchMembersController);
groupMember_route.post('/',protect,addGroupMemberController);
groupMember_route.delete("/:id",protect,leaveGroupController);

export default groupMember_route;
