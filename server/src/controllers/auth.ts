import type { Request, Response } from "express";
import { signupValidation } from "../utils/authZodValidation.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";


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

        

    }catch(error){

    }
}