import express from "express";
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware';
import { authorizeRole } from '../middleware/authMiddleware'; 
import { createContact, deleteContact, getContactById, getContacts, updateContact } from "../controllers/contactController";
import contactMessageModel from '../models/contactModel';

const contactRouter = express.Router();

contactRouter.get('/', verifyTokenMiddleware, async (req, res) => {     
    try {
        const messages = await contactMessageModel.findAll();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({ message: 'Error fetching contact messages' });
    }
});    
contactRouter.get('/:id', verifyTokenMiddleware, getContactById);    
contactRouter.post('/', verifyTokenMiddleware, createContact);
contactRouter.delete('/:id', verifyTokenMiddleware, authorizeRole(['admin']), deleteContact);
contactRouter.put('/:id', verifyTokenMiddleware, authorizeRole(['admin']), updateContact);   

export default contactRouter;