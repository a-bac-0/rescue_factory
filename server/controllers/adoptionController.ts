import adoptionModel from "../models/adoptionsModel";
import { Response, Request} from "express"

// Get de las adopciones 

export const getAdoptions = async (req: Request, res: Response) => {
    try {
        const adoption = await adoptionModel.findAll();
        res.json(adoption);
    } catch (error) {
        res.json({message: "No se pudo cargar las adopciones"});
    }
}

