import express from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/postController";
import uploadImage from "../middleware/uploadImage";
const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', getPostById);
postRouter.delete('/:id', deletePost);
postRouter.post('/',uploadImage, createPost)
postRouter.put('/:id', updatePost);

export default postRouter;