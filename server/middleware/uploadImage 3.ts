import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Request, Response, NextFunction } from "express";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config';

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});



const fileFilter = (req: any, file: Express.Multer.File, cb: Function) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.mimetype)) {
    req.fileValidationError = 'No se acepta este tipo. Solo JPG, PNG, y WEBP son permitidos.';
    return cb(null, false);
  }
  cb(null, true);
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: 'uploads', // carpeta en Cloudinary para almacenar imágenes
      format: 'webp',
      public_id: file.originalname.split('.')[0], // Genera un nombre único para la imagen
    };
  }
});

const upload = multer({ storage, fileFilter });

export default upload;