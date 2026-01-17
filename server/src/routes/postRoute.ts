import express from "express";
import { createPost, deletePost, getAllPost, updatePost, getPostById } from "../controllers/post.js";
import { middleware } from "../middleware/middleware.js";

const postRouter = express.Router();

postRouter.post("/createPost", middleware, createPost)
postRouter.get("/getAllPost", middleware, getAllPost)
postRouter.post("/updatePost/:postId", middleware, updatePost)
postRouter.post("/deletePost/:postId", middleware, deletePost)
postRouter.get("/getPostById/:postId", middleware, getPostById)

export default postRouter;