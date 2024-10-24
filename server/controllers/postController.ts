
import { Request, Response } from "express";
import  postModel  from "../models/postsModel";

// Get de los posts

export const getPosts = async (req: Request, res: Response) => {
    try {
      const posts = await postModel.findAll();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los posts" });
    }
  };


