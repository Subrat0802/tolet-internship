import express from "express";
import { createPost, deletePost, getAllPost, updatePost, getPostById, getUserAllPost } from "../controllers/post.js";
import { middleware } from "../middleware/middleware.js";
const postRouter = express.Router();
postRouter.post("/createPost", middleware, createPost);
postRouter.get("/getUserAllPost", middleware, getUserAllPost);
postRouter.put("/updatePost/:postId", middleware, updatePost);
postRouter.post("/deletePost/:postId", middleware, deletePost);
postRouter.get("/getPostById/:postId", middleware, getPostById);
postRouter.get("/getAllPost", getAllPost);
export default postRouter;
//# sourceMappingURL=postRoute.js.map