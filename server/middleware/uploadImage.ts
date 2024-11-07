    import { v2 as cloudinary } from 'cloudinary';
    import { Request, Response, NextFunction } from "express";

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { imageUrl } = req.body;

            if (!imageUrl) {
                 res.status(400).json
                
            }

            const result = await cloudinary.uploader.upload(imageUrl);
        
            req.body.url_images = result.secure_url;
            next();

        } catch (error) {
            console.log('no se pudo subir la imagen',error);
        }
    };

export default uploadImage;