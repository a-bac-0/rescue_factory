import express from "express";
import { createAdoption, deleteAdoption, getAdoptions, getOneAdoption, updateAdoption } from "../controllers/adoptionController";
import uploadImage from "../middleware/uploadImage";
const adoptionRouter = express.Router();

adoptionRouter.get('/', getAdoptions);
adoptionRouter.get('/:id', getOneAdoption);
adoptionRouter.delete('/:id', deleteAdoption);
adoptionRouter.post('/',uploadImage, createAdoption)
adoptionRouter.put('/:id', updateAdoption);

export default adoptionRouter;