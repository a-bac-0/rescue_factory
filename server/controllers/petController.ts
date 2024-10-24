
import { Request, Response } from "supertest";
//import { petsModel } from "../models/petsModel";


//Get del los post

// export const getAllPets = async (req: Request, res: Response) => {
//     try {
//       const pets = await petsModel.findAll(); 
//       res.json(pets);
      
// } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

//get oone id de los post

// export const getPet = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       const pet = await petsModel.findByPk(id);
//       if (!pet) {
//         return res.status(404).json({ message: "Pet not found" });
//       }
//       res.json(pet);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

// delete de los post

// export const deletePet = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       const pet = await petsModel.findByPk(id);
//       if (!pet) {
//         return res.status(404).json({ message: "Pet not found" });
//       }
//       await pet.destroy();
//       res.json({ message: "Pet deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

