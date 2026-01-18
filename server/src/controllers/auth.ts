import type { Request, Response } from "express";
import { signinValidation, signupValidation } from "../utils/authZodValidation.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { success, ZodError } from "zod";
import dotenv from "dotenv";
dotenv.config()

export const signup = async (req: Request, res: Response) => {
    try{
        const {firstName, lastName, email, password} = await signupValidation.parseAsync(req.body);

        const checkUser = await User.findOne({email: email});
        if(checkUser){
            return res.status(409).json({
                message: "User already registered. Please sign in.",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        if(!response){
            return res.status(404).json({
                message:"Error while signup",
                success:false
            })
        }


        return res.status(200).json({
            message:"User signup successfully",
            success: true,
        })

    }catch (err: unknown) {
        if (err instanceof ZodError) {
        return res.status(400).json({
            errors: err.issues.map((e) => ({
            path: e.path.join("."),
            message: e.message,
            })),
        });
        } else {
        return res.status(500).json({
            message: "Server error while user signup",
            success: false,
        });
        }
    }
}


export const signin = async (req: Request, res: Response) => {
    try{
        const {email, password} = await signinValidation.parseAsync(req.body);
        const checkUser = await User.findOne({email: email});

        if(!checkUser){
            return res.status(409).json({
                message:"Invalid User",
                success:false
            })
        }

        const verifyPassword = await bcrypt.compare(password, checkUser.password);
        if(!verifyPassword){
            return res.status(404).json({
                message:"Invalid password",
                success: false
            })
        }

        if(process.env.JWT_SECRET == null) return;

        const token = jwt.sign({
            id: checkUser._id,
            email: checkUser.email
        }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        })

        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        return res.cookie("token", token, options).status(200).json({
            message:"User signin successfully",
            success:true,
            token
        })

    }catch (err: unknown) {
        if (err instanceof ZodError) {
        return res.status(400).json({
            errors: err.issues.map((e) => ({
            path: e.path.join("."),
            message: e.message,
            })),
        });
        } else {
        return res.status(500).json({
            message: "Server error while validation user. Me Route",
            success: false,
        });
        }
    }
}


export const me = async (req: Request, res: Response) => {
    try{
        //@ts-ignore
        const {id} = req.user;
        if(!id) {
            return res.status(404).json({
                message:"Invalid credentials",
                success:false
            })
        }

        const response = await User.findById(id).select("-password");;
        if(!response){
            return res.status(404).json({
                message:"User not found, Try to login again",
                success: false
            })
        }

        return res.status(200).json({
            user: response,
            success:true,
            message:"User token authenticated"
        })
    }catch(error){
        return res.status(500).json({
            message:"Server error while authenticating user",
            success:false
        })
    }
}
