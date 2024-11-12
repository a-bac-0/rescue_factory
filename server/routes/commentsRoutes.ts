import express from "express";
import { createComment, deleteComment, getAllComments, getOneComment, updateComment } from "../controllers/commentController";
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware';
import { authorizeRole } from '../middleware/authMiddleware'; 

const commentRouter = express.Router();

commentRouter.get('/', verifyTokenMiddleware, getAllComments);     
commentRouter.get('/:id', verifyTokenMiddleware, getOneComment);    
commentRouter.post('/', verifyTokenMiddleware, createComment);
commentRouter.delete('/:id', verifyTokenMiddleware, authorizeRole(['admin']), deleteComment);
commentRouter.put('/:id', verifyTokenMiddleware, authorizeRole(['admin']), updateComment);   

export default commentRouter;
