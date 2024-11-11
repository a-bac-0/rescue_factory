import { v2 as cloudinary } from 'cloudinary';
import { Request, Response, NextFunction } from "express";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config';

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Body recibido:", req.body);
        const { url_image } = req.body;
        
        if (!url_image) {
            console.log("No se encontró url_image en el body");
            res.status(400).json({ message: 'No se proporcionó una imagen' });
            return;
        }

        console.log("Intentando subir imagen:", url_image);
        const result = await cloudinary.uploader.upload(url_image, {
            folder: "pets_images",
            allowed_formats: ["jpg", "jpeg", "png", "gif"],
            transformation: [
                { width: 1000, height: 1000, crop: "limit" }
            ]
        });

        console.log("Imagen subida exitosamente:", result.secure_url);
        req.body.url_images = result.secure_url;
        next();

    } catch (error: any) {
        console.log('Error detallado:', error);
        res.status(500).json({ 
            message: 'Error al procesar la imagen',
            error: error.message
        });
        return;
    }
};

export default uploadImage;