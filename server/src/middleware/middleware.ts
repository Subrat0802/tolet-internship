import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { success } from "zod";

export const middleware = (req: Request, res: Response, next:NextFunction ) => {
    try{
        const cookie = req.cookies("token");
        if(!cookie){
            return res.status(404).json({
                message:"cookie not found",
                success:false
            })
        }

        if(!process.env.JWT_SECRET) return;

        const response = jwt.verify(cookie, process.env.JWT_SECRET);

        if(!response){
            return res.status(404).json({
                message:"Token validation error",
                success: false
            })
        }

        //@ts-ignore
        req.user = response;

        next();

    }catch(error){
        return res.status(500).json({
            message:"Server error while authenticating token",
            success: true
        })
    }
}