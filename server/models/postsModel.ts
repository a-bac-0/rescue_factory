import { Sequelize, DataTypes, Model } from "sequelize";
import connection_db from "../database/db";

// Definimos una interfaz para los atributos del modelo
interface PostAttributes {
    title: string;
    content: string;
    user_id: number;
    category: string; // Tipo ENUM, puedes definir los valores posibles en un tipo si lo prefieres
    status: string; // Tipo ENUM, también puedes definir los valores específicos si lo prefieres
    like_count: number;
    url_images: string;
}

// Opcional: si se crea un nuevo post, algunos campos pueden ser opcionales (e.g. ID autogenerado)
interface PostCreationAttributes extends Omit<PostAttributes, 'like_count'> {
    like_count?: number;
}

// Definimos el modelo utilizando `Model` de Sequelize con atributos tipados
class PostModel extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    public title!: string;
    public content!: string;
    public user_id!: number;
    public category!: string;
    public status!: string;
    public like_count!: number;
    public url_images!: string;
}

// Definir el modelo utilizando el método `define` de Sequelize
const postModel = connection_db.define<PostModel>(
    'Posts',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM('noticias', 'cuidado_animal', 'adopcion'), // Define los valores posibles para el ENUM
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'), // Define los valores posibles para el ENUM
            allowNull: false,
            defaultValue: 'inactive'
        },
        like_count: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0, // Es buena práctica inicializar contadores con un valor por defecto
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

