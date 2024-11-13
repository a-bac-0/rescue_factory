import express from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/postController";
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware';
import { authorizeRole } from '../middleware/authMiddleware';
import  uploadImage  from "../middleware/uploadImage";
const postRouter = express.Router();


postRouter.get('/', getPosts);          
postRouter.get('/:id', verifyTokenMiddleware, getPostById);    
postRouter.post('/',verifyTokenMiddleware,uploadImage, createPost);  
postRouter.delete('/:id', verifyTokenMiddleware, authorizeRole(['admin']), deletePost); 
postRouter.put('/:id', verifyTokenMiddleware, authorizeRole(['admin']), updatePost);    

export default postRouter;
