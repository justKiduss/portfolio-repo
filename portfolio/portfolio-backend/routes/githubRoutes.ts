import express from "express";
import { githubActivity } from "../controller/github";

const router = express.Router();

router.get('/github-activity', githubActivity);

export default router;