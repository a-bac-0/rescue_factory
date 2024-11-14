import { DataTypes, Model } from "sequelize";
import connection_db from "../database/db";

// Definimos una interfaz para los atributos del modelo
export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string; // El tipo puede ser string, pero lo detallaremos como ENUM en el modelo
}

// Definimos una interfaz para los atributos opcionales al crear un nuevo usuario
interface UserCreationAttributes extends Omit<UserAttributes, "id"> {}

// Definimos el modelo utilizando `Model` de Sequelize
class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

// Definir el modelo utilizando el método `define` de Sequelize
const userModel = connection_db.define<UserModel>(
  "Users",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"), // Definir valores posibles del ENUM
      allowNull: false,
      defaultValue: "user", // Valor por defecto si no se especifica
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export default userModel;
