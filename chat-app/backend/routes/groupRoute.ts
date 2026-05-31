import  express from "express"
import protect from "../middleware/protect";
import { checkGroupAdmin, createGroupController, deleteController, getAllGroupsController, getGroupsByNameController} from "../controller/groupController";
const groupRoute=express.Router();

groupRoute.get('/',protect,getAllGroupsController);
groupRoute.get('/group_name',protect,getGroupsByNameController);
groupRoute.post('/',protect,createGroupController);
groupRoute.delete('/:id',protect,deleteController);
groupRoute.get('/:id/isAdmin',protect,checkGroupAdmin);

export default groupRoute;
