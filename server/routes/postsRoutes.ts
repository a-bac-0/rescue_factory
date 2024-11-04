import express from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/postController";

const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', getPostById);
postRouter.delete('/:id', deletePost);
postRouter.post('/', createPost)
postRouter.put('/:id', updatePost);

export default postRouter;