
import { Request, Response } from "supertest";
//import { petsModel } from "../models/petsModel";


//Get del los post

export const getAllPets = async (req: Request, res: Response) => {
    try {
      const pets = await petsModel.findAll(); 
      res.json(pets);
      
} catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


