import express from "express";
import { createAdoption, deleteAdoption, getAdoptions, getOneAdoption, updateAdoption } from "../controllers/adoptionController";
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware';
import { authorizeRole } from '../middleware/authMiddleware';
import uploadImage from "../middleware/uploadImage";
const adoptionRouter = express.Router();


adoptionRouter.get('/', getAdoptions);
adoptionRouter.get('/:id', verifyTokenMiddleware, getOneAdoption);
adoptionRouter.post('/', verifyTokenMiddleware, createAdoption); 
adoptionRouter.delete('/:id',uploadImage, verifyTokenMiddleware, authorizeRole(['admin']), deleteAdoption); 
adoptionRouter.put('/:id', verifyTokenMiddleware, authorizeRole(['admin']), updateAdoption);

export default adoptionRouter;
