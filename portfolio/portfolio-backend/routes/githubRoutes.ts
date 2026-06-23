import express from "express";
import { githubActivity } from "../controller/github";

const router = express.Router();
console.log("router is loaded");
router.get('/github-activity', githubActivity);

export default router;