import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Definir una interfaz para las variables de entorno que vamos a usar
interface EnvVariables {
    DB_DATABASE: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_DIALECT: string;
    DB_PORT: number;
    TEST_DB_DATABASE?: string;
    NODE_ENV?: string;
}

// Verificar que las variables de entorno existan y asignarlas
const env: EnvVariables = {
    DB_DATABASE: process.env.DB_DATABASE as string,
    DB_USERNAME: process.env.DB_USERNAME as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    DB_HOST: process.env.DB_HOST as string,
    DB_DIALECT: process.env.DB_DIALECT as string,
    DB_PORT: parseInt(process.env.DB_PORT as string, 10), // Parseamos a número
    TEST_DB_DATABASE: process.env.TEST_DB_DATABASE,
    NODE_ENV: process.env.NODE_ENV
};

// Usar la base de datos de pruebas si estamos en un entorno de test
const database = env.NODE_ENV === 'test' ? env.TEST_DB_DATABASE : env.DB_DATABASE;

// Crear la conexión a la base de datos con Sequelize
const connection_db = new Sequelize(
    env.DB_DATABASE,   // Nombre de la base de datos
    env.DB_USERNAME,   // Nombre de usuario
    env.DB_PASSWORD,   // Contraseña
    {
        host: env.DB_HOST,     // Host de la base de datos
        dialect: env.DB_DIALECT as any, // Dialecto (mysql, postgres, etc.)
        port: env.DB_PORT, 
        define: {
            timestamps: false,  // Desactivar timestamps globalmente
        }
    }
);

export default connection_db;
