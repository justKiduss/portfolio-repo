import  express from "express"
import protect from "../middleware/protect";
import { createGroupController, deleteController, getAllGroupsController, getGroupsByNameController } from "../controller/groupController";
const groupRoute=express.Router();

groupRoute.get('/',protect,getAllGroupsController);
groupRoute.get('/group_name',protect,getGroupsByNameController);
groupRoute.post('/',protect,createGroupController);
groupRoute.delete('/:id',protect,deleteController);

export default groupRoute;
