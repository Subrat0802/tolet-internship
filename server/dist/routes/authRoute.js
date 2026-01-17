import express from "express";
import { signin, signup, me } from "../controllers/auth.js";
import { middleware } from "../middleware/middleware.js";
const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/me", middleware, me);
export default authRouter;
//# sourceMappingURL=authRoute.js.map