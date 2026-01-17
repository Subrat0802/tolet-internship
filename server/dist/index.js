import express from "express";
import { dbConnect } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import dotenv from "dotenv";
import postRouter from "./routes/postRoute.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true
}));
dbConnect();
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.listen(3000, () => {
    console.log("App is running at port 3000");
});
//# sourceMappingURL=index.js.map