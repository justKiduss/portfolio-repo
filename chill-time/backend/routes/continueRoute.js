import express from "express";
import { protect } from "../middleware/protect.js";
import { AddMovie, getAll } from "../controllers/continueController.js";

const continueRouter=express.Router();

continueRouter.get("/getAll",protect,getAll);
continueRouter.post("/addTOContinue",protect,AddMovie);

export default continueRouter;
