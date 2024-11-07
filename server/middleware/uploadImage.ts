    import { v2 as cloudinary } from 'cloudinary';
    import { Request, Response, NextFunction } from "express";

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { imageUrl } = req.body;

            if (!imageUrl) {
                return res.status(400).json({
                    success: false,
                    message: "No image URL provided"
                });
            }

            const options = {
                folder: "pets-app",
                resource_type: "auto",
                fetch_format: "auto",
                quality: "auto"
            };

            const result = await cloudinary.uploader.upload(imageUrl,);
        
            
            req.body.url_images = result.secure_url;
            next();

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error uploading image",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    };

export default uploadImage;