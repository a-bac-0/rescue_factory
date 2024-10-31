import connection_db from "../database/db";
import { DataTypes, Model, Optional } from "sequelize";

// Definición de atributos del modelo
interface AdoptionAttributes {
    id?: number; // Puede ser opcional si es auto-incremental
    name: string;
    age: number;
    sex: string;
    category: 'Cat' | 'Dog' | 'Other'; // Cambia las opciones según tu lógica
    content: string;
    url_images: string;
    user_id: number;
}

// Los atributos opcionales para la creación de nuevos registros
interface AdoptionCreationAttributes extends Optional<AdoptionAttributes, 'id'> {}

// Clase del modelo que extiende de Sequelize Model
class AdoptionModel extends Model<AdoptionAttributes, AdoptionCreationAttributes> implements AdoptionAttributes {
    public id!: number;
    public name!: string;
    public age!: number;
    public sex!: string;
    public category!: 'Cat' | 'Dog' | 'Other'; // Cambia las opciones según tu lógica
    public content!: string;
    public url_images!: string;
    public user_id!: number;

    // Timestamps opcionales
    // public readonly createdAt!: Date;
    // public readonly updatedAt!: Date;
}

const adoptionModel = connection_db.define<AdoptionModel>(
    'Adoptions',
    {
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
            allowNull: false,
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM('Cat', 'Dog', 'Other'), // Cambia las opciones según tu lógica
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        url_images: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'users', // Debe coincidir con la tabla de usuarios
                key: 'id',
            },
        },
    },
    {
        tableName: 'adoptions', // Asegúrate de que el nombre de la tabla es correcto
        timestamps: false, // Esto es opcional, según tu modelo
    }
);

export default adoptionModel;
