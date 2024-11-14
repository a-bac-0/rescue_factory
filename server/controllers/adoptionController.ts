import adoptionModel from "../models/adoptionsModel";
import { Response, Request } from "express";

// Get all adoptions
export const getAdoptions = async (req: Request, res: Response) => {
    try {
        const adoption = await adoptionModel.findAll();
        res.json(adoption);
    } catch (error) {
        res.json({ message: "Could not load adoptions" });
    }
}

// Get one adoption by ID
export const getOneAdoption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const adoptionOne = await adoptionModel.findByPk(id);

        if (adoptionOne) {
            res.json(adoptionOne);
        }

    } catch (error) {
        console.log('Could not retrieve the adoption information', error);
    }
}

// Create an adoption
export const createAdoption = async (req: Request, res: Response) => {
    try {
        const { name, age, sex, category, content, url_images, user_id, date } = req.body;
        const adoption = await adoptionModel.create({
            name,
            age,
            sex,
            category,
            content,
            url_images,
            user_id,
            date
        });
        res.json(adoption);

    } catch (error) {
        console.log('Error while uploading the adoption', error);
    }
}

// Delete an adoption
export const deleteAdoption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const adoption = await adoptionModel.findByPk(id);

        await adoption?.destroy();
        res.json({ message: "Adoption deleted successfully" });

    } catch (error) {
        console.log('Could not delete the adoption', error);
    }
};

// Update an adoption
export const updateAdoption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, age, sex, category, content, url_images, user_id, date } = req.body;
        const updateAdoption = await adoptionModel.findByPk(id);

        await updateAdoption?.update({
            name,
            age,
            sex,
            category,
            content,
            url_images,
            user_id,
            date
        });
        res.json(updateAdoption);

    } catch (error) {
        console.log('Error while updating the adoption', error);
    }
};
