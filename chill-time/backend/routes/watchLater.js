import express from "express";
import { protect } from "../middleware/protect.js";
import { addWatchLateController, getWatchLaterController } from "../controllers/watchLaterController.js";

const watchLaterRouter=express.Router();

watchLaterRouter.get("/getAll",protect,getWatchLaterController);
watchLaterRouter.post("/addToWatchLater",protect,addWatchLateController);

export default watchLaterRouter;
