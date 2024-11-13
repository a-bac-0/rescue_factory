import express from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost,updateLike } from "../controllers/postController";
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware';
import { authorizeRole } from '../middleware/authMiddleware';
import upload from "../middleware/uploadImage";
const postRouter = express.Router();


postRouter.get('/', getPosts);          
postRouter.get('/:id', verifyTokenMiddleware, getPostById);    
postRouter.post('/',verifyTokenMiddleware,upload.single('url_images'), createPost);  
postRouter.delete('/:id', verifyTokenMiddleware, authorizeRole(['admin']), deletePost); 
postRouter.put('/:id', verifyTokenMiddleware, authorizeRole(['admin']), updatePost);    
postRouter.put('/:id/like', updateLike)
export default postRouter
