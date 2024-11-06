import express from "express";
import { createAdoption, deleteAdoption, getAdoptions, getOneAdoption, updateAdoption } from "../controllers/adoptionController";
import { authorizeRole } from '../middleware/authMiddleware';

const adoptionRouter = express.Router();

// Rutas públicas
adoptionRouter.get('/', getAdoptions);
adoptionRouter.get('/:id', getOneAdoption);

// Rutas protegidas por rol
adoptionRouter.post('/', authorizeRole(['admin']), createAdoption); // Solo admin puede crear adopciones
adoptionRouter.delete('/:id', authorizeRole(['admin']), deleteAdoption); // Solo admin puede eliminar adopciones
adoptionRouter.put('/:id', authorizeRole(['admin']), updateAdoption); // Solo admin puede actualizar adopciones

export default adoptionRouter;
