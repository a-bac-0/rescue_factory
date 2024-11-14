import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Definimos las variables necesarias para la base de datos de desarrollo
const DB_DATABASE: string = process.env.DB_DATABASE as string;
const DB_USERNAME: string = process.env.DB_USERNAME as string;
const DB_PASSWORD: string = process.env.DB_PASSWORD as string;
const DB_HOST: string = process.env.DB_HOST as string;
const DB_PORT: number = Number(process.env.DB_PORT) || 3306;
const NODE_ENV: string = process.env.NODE_ENV as string;
const TEST_DB_DATABASE: string = process.env.DB_TEST_NAME as string;
const DB_DIALECT: string = process.env.DB_DIALECT as string;

// Exportar las variables
export { DB_USERNAME, DB_DATABASE, DB_PASSWORD, DB_HOST, DB_PORT, NODE_ENV, TEST_DB_DATABASE, DB_DIALECT };

// Exportar JWT_SECRET
export const JWT = process.env.JWT_SECRET;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
