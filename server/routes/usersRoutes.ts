import { deleteUser, getAllUsers, getUserById, updateUser, createUser } from "../controllers/userController";
import express from "express";

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updateUser);
userRouter.post('/', createUser)


export default userRouter;