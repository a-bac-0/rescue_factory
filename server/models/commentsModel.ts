import { DataTypes, Model } from "sequelize";
import connection_db from "../database/db";

// Definimos una interfaz para los atributos del modelo
interface CommentAttributes {
    id: number;
    content: string;
    post_id: number;
    user_id: number;
    createAd: Date; // El tipo Date para manejar timestamps
}

// Opcional: si se crea un nuevo comentario, el `id` y `create_at` son generados automáticamente
interface CommentCreationAttributes extends Omit<CommentAttributes, 'id' | 'create_at'> {}

// Definimos el modelo utilizando `Model` de Sequelize con atributos tipados
class CommentModel extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    public id!: number;
    public content!: string;
    public post_id!: number;
    public user_id!: number;
    public createAd!: Date;
}

// Definir el modelo utilizando el método `define` de Sequelize
const commentModel = connection_db.define<CommentModel>(
    'Comments',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true, // Clave primaria con autoincremento
        },
        content: {
            type: DataTypes.TEXT, // Texto del comentario
            allowNull: false,
        },
        post_id: {
            type: DataTypes.BIGINT, // ID del post al que pertenece el comentario
            allowNull: false,
            references: {
                model: 'posts', // Debe coincidir con la tabla a la que se hace referencia
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.BIGINT, // ID del usuario que hizo el comentario
            allowNull: false,
            references: {
                model: 'users', // Debe coincidir con la tabla de usuarios
                key: 'id',
            },
        },
        createAd: {
            type: DataTypes.DATE, // Usamos DATE para manejar timestamps
            allowNull: false,
            defaultValue: DataTypes.NOW, // El valor por defecto será la fecha actual
        },
    },
    {
        tableName: 'comments', // Nombre de la tabla en la base de datos
        timestamps: false, // Para manejar manualmente los timestamps en lugar de usar los automáticos de Sequelize
    }
);

export default commentModel;
