import { DataTypes, Model } from "sequelize";
import connection_db from "../database/db";

// Definimos los valores posibles para category y status
type Category = 'noticias' | 'cuidado_animal' | 'adopcion';
type Status = 'active' | 'inactive';

// Definimos una interfaz para los atributos del modelo
interface PostAttributes {
    id: number; // Campo ID agregado
    title: string;
    content: string;
    user_id: number;
    category: Category; // Tipo ENUM
    status: Status; // Tipo ENUM
    like_count: number;
    url_images: string;
}

// Opcional: si se crea un nuevo post, algunos campos pueden ser opcionales (e.g. ID autogenerado)
interface PostCreationAttributes extends Omit<PostAttributes, 'id' | 'like_count'> {
    like_count?: number;
}

// Definimos el modelo utilizando `Model` de Sequelize con atributos tipados
class PostModel extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    public id!: number; // Campo ID agregado
    public title!: string;
    public content!: string;
    public user_id!: number;
    public category!: Category; // Campo category tipado
    public status!: Status; // Campo status tipado
    public like_count!: number;
    public url_images!: string;
}

// Definir el modelo utilizando el método `define` de Sequelize
const postModel = connection_db.define<PostModel>(
    'Posts',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true, // Habilita el autoincremento
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
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
        category: {
            type: DataTypes.ENUM('noticias', 'cuidado_animal', 'adopcion'), // Define los valores posibles para el ENUM
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'), // Define los valores posibles para el ENUM
            allowNull: false,
            defaultValue: 'inactive', // Valor por defecto
        },
        like_count: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0, // Valor por defecto para el contador de "likes"
        },
        url_images: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'posts', // Asegúrate de que el nombre de la tabla es correcto
        timestamps: false,  // Esto es opcional, según tu modelo
    }
);

export default postModel;
