import express from "express";
import { createAdoption, deleteAdoption, getAdoptions, getOneAdoption, updateAdoption } from "../controllers/adoptionController";

const adoptionRouter = express.Router();

adoptionRouter.get('/', getAdoptions);
adoptionRouter.get('/:id', getOneAdoption);
adoptionRouter.delete('/:id', deleteAdoption);
adoptionRouter.post('/', createAdoption)
adoptionRouter.put('/:id', updateAdoption);

export default adoptionRouter;