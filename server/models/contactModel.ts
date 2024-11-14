import { DataTypes, Model } from "sequelize";
import connection_db from "../database/db";

// Definimos una interfaz para los atributos del modelo
interface ContactMessageAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
}

// Definimos una interfaz para los atributos opcionales al crear una nueva entrada
interface ContactMessageCreationAttributes extends Omit<ContactMessageAttributes, "id"> {}

// Definimos el modelo utilizando `Model` de Sequelize
class ContactMessageModel extends Model<ContactMessageAttributes, ContactMessageCreationAttributes> implements ContactMessageAttributes {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public message!: string;
}

// Definir el modelo utilizando el método `define` de Sequelize
const contactMessageModel = connection_db.define<ContactMessageModel>(
  "Contact_Message",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validación para asegurar que sea un formato de email válido
      },
    },
    message: {
      type: DataTypes.TEXT, 
      allowNull: false,
    },
  },
  {
    tableName: "contact_message", // Nombre de la tabla en la base de datos
    timestamps: false, // Si no deseas utilizar createdAt y updatedAt
  }
);

export default contactMessageModel;
