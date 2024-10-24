import connection_db from "../database/db.ts"
import { DataTypes } from "sequelize";

const bookModel = connection_db.define(
    'Adoptions',
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        url_images: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            },
           
    }, {
    tableName: 'books', // Asegúrate de que el nombre de la tabla es correcto
    timestamps: false, // Esto es opcional, según tu modelo
});

export default bookModel;