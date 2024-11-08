import express from "express";
import { createComment, deleteComment, getAllComments, getOneComment, updateComment } from "../controllers/commentController";

const commentRouter = express.Router();

commentRouter.get('/', getAllComments);
commentRouter.get('/:id', getOneComment);
commentRouter.delete('/:id', deleteComment);
commentRouter.post('/', createComment)
commentRouter.put('/:id', updateComment);

export default commentRouter;