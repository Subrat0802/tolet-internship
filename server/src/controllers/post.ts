import type { Request, Response, response } from "express";
import { postZodValidation } from "../utils/postZodValidation.js";
import User from "../models/user.js";
import Post from "../models/post.js";
import { ZodError } from "zod";

export const createPost = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user?.id;
    const { title, content } = await postZodValidation.parseAsync(req.body);

    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        message: "Try to login again",
        success: false,
      });
    }

    const post = await Post.create({
      title,
      content,
      user: userId,
    });

    if (!post) {
      return res.status(404).json({
        message: "Error while creating post, Try again",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Post created successfully",
      success: true,
      data: post,
    });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        errors: err.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    } else {
      return res.status(500).json({
        message: "Server error while creating post",
        success: false,
      });
    }
  }
};

export const getAllPost = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user?.id;

    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        message: "Try to login again",
        success: false,
      });
    }

    const post = await Post.find().populate("User");

    if (!post) {
      return res.status(404).json({
        message: "Error while fetching all posts, Try again",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All Posts",
      success: true,
      data: post,
    });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        errors: err.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    } else {
      return res.status(500).json({
        message: "Server error while creating post",
        success: false,
      });
    }
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user?.id;
    const { postId } = req.params;
    const { title, content, imageUrl } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please login again.",
        success: false,
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    if (post.user !== userId) {
      return res.status(403).json({
        message: "You are not allowed to update this post",
        success: false,
      });
    }
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (imageUrl !== undefined) post.imageUrl = imageUrl;

    await post.save();

    return res.status(200).json({
      message: "Post updated successfully",
      success: true,
      data: post,
    });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        errors: err.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    }

    return res.status(500).json({
      message: "Server error while updating post",
      success: false,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user?.id;
    const { postId } = req.params;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please login again.",
        success: false,
      });
    }

    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not deleted, try again.",
        success: false,
      });
    }

    if (post.user !== userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this post",
        success: false,
      });
    }
    
    return res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        errors: err.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    } else {
      return res.status(500).json({
        message: "Server error while deleteing post",
        success: false,
      });
    }
  }
};