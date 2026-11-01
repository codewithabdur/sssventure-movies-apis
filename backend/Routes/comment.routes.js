import { Router } from "express";
import { addCommentController, fetchCommentsController } from "../Controller/comment.controller.js";

const router = Router();

router.post("/add", addCommentController)
router.post("/fetch", fetchCommentsController)

export default router;