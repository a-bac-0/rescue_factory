import express from "express";
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware';
import { authorizeRole } from '../middleware/authMiddleware'; 
import { createContact, deleteContact, getContactById, getContacts, updateContact } from "../controllers/contactController";
import contactMessageModel from '../models/contactModel';

const contactRouter = express.Router();

contactRouter.get('/', getContacts);  
contactRouter.get('/:id', verifyTokenMiddleware, getContactById);    
contactRouter.post('/', verifyTokenMiddleware, createContact);
contactRouter.delete('/:id', verifyTokenMiddleware, authorizeRole(['admin']), deleteContact);
contactRouter.put('/:id', verifyTokenMiddleware, authorizeRole(['admin']), updateContact);   

export default contactRouter;