        import { v2 as cloudinary } from 'cloudinary';
        import { Request, Response, NextFunction } from "express";

        const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { url_image } = req.body;

                if (!url_image) {
                     res.status(400).json({
                        success: false,
                        message: "No se proporciona la URL de la imagen"
                    });
                }

                const result = await cloudinary.uploader.upload(url_image, {
                    folder: "pets_images",
                    allowed_formats: ["jpg", "jpeg", "png", "gif"],
                    transformation: [
                        { width: 1000, height: 1000, crop: "limit" }
                    ]
                });

                req.body.url_images = result.secure_url;
                next();

            } catch (error) {
                 res.status(500).json({
                    success: false,
                    message: "Error al procesar la imagen",
                    error: error instanceof Error ? error.message : "Unknown error"
                });
            }
        };

        export default uploadImage;