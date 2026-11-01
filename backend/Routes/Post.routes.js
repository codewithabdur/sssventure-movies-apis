import express from "express";
import { createPost } from "../Controller/Post.controller.js";   // adjust path/folder name to yours

const router = express.Router();

router.post("/add", createPost);

export default router;

/* In your app.js / server.js:
   import postRoutes from "./Routes/postRoutes.js";
   app.use(express.json({ limit: "5mb" }));
   app.use("/api/posts", postRoutes);
*/