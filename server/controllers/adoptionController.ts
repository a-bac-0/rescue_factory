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

// Get one de una adopcion

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

// Creacion de una adopcion 

export const createAdoption = async (req: Request, res: Response) => {
    try {
        const {name, age, sex, category, content, url_images, user_id, date} = req.body;
        const adoption = await adoptionModel.create({
            name,
            age, 
            sex,
            category,
            content,
            url_images,
            user_id,
            date
        })
            res.json(adoption)

    } catch (error) {
            console.log('Erro al subir la adopcion', error)
    }
}

// Delete de una adopcion

export const deleteAdoption = async (req:Request, res: Response) => {
    try {
        const { id } = req.params;
        const adoption = await adoptionModel.findByPk(id);

        await adoption?.destroy()
        res.json({ message: "Adoption  eliminado correctamente" });

    } catch (error) {
        console.log('No se pudo eliminar la adopcion', error)
    }
 };

// Update de una adopcion

export const updateAdoption = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const {name, age, sex, category, content, url_images, user_id, date} = req.body;
        const updateAdoption = await adoptionModel.findByPk(id)

        await updateAdoption?.update({
            name,
            age, 
            sex,
            category,
            content,
            url_images,
            user_id,
            date
        })
            res.json(updateAdoption);

    } catch (error) {
        
    }
};