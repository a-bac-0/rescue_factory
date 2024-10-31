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

// Geto one de una adopcion

export const getOneAdoption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const adoptionOne = await adoptionModel.findByPk(id)

        if (adoptionOne) {
            res.json(adoptionOne)
        }
        
    } catch (error) {
        console.log('No se pudo obtener la informacion de esta adopcion', error)
        
    }
}

// Post de una adopcion 

export const createAdoption = async (req: Request, res: Response) => {
    try {
        const {name, age, sex, category, content, url_images, user_id} = req.body;
        const adoption = await adoptionModel.create({
            name,
            age, 
            sex,
            category,
            content,
            url_images,
            user_id,
        })
            res.json(adoption)

    } catch (error) {
            console.log('Erro al subir la adopcion', error)
    }
}