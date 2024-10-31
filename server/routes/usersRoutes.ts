import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController";
import express from "express";

const bookRouter = express.Router();

bookRouter.get('/users', getAllUsers);
bookRouter.get('/users/:id', getUserById);
bookRouter.delete('/users/:id', deleteUser);
bookRouter.put('/users/:id', updateUser);

export default bookRouter;