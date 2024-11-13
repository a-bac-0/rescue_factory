import express from "express";
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware';
import { authorizeRole } from '../middleware/authMiddleware'; 
import { createContact, deleteContact, getContactById, getContacts, updateContact } from "../controllers/contactController";
import contactMessageModel from '../models/contactModel';

const contactRouter = express.Router();

contactRouter.get('/', getContacts); 
contactRouter.get('/:id', getContactById);    
contactRouter.post('/', createContact);
contactRouter.delete('/:id', deleteContact)
contactRouter.put('/:id', updateContact);   

export default contactRouter;