import express from "express";
import { deleteUser, getAllUsers, getUserById, updateUser, createUser } from "../controllers/userController";
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware';
import { authorizeRole } from '../middleware/authMiddleware';

const userRouter = express.Router();


userRouter.get('/', verifyTokenMiddleware, getAllUsers);          
userRouter.get('/:id', verifyTokenMiddleware, getUserById);
userRouter.delete('/:id', verifyTokenMiddleware, authorizeRole(['admin']), deleteUser); 
userRouter.put('/:id', verifyTokenMiddleware, authorizeRole(['admin']), updateUser);    
userRouter.post('/', verifyTokenMiddleware, createUser);     

export default userRouter;
