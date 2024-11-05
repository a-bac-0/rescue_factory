import { Request, Response } from "express";
import userModel from "../models/usersModel";


//GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => { // EN ESTA LINEA EL req SE UTILIZA PARA LA SOLICITUD HTTP Y EL res PARA LA RESPUESTA✅

  try {
    const users = await userModel.findAll(); // EN ESTE LINEA SE ESTA LLAMANDO A LA FUNCION findAll() DEL MODELO userModel PARA OBTENER TODOS LOS USUARIOS DE LA BASE DE DATOS 🔍
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
};

//GET USER BY ID
export const getUserById = async (req: Request, res: Response) => {

  try {

    const { id } = req.params;      // AQUI EXTRAE EL PARAMETRO id  DE LA URL DONE req.params CONTIENE ↙️
    const user = await userModel.findByPk(id); //  LOS PARAMETROS DINAMICOS DEL id DONDE ESTE ES EL IDENTIFICADOR DEL USUARIO

    if (isNaN(Number(id))) {       // EN ESTE LINEA SE ESTA VALIDANDO EL ID, QUE SIGNIFICA, SIGNIFICA QUE SE LE ESTA DANDO UN VALOR DE NUMERO AL ID
      res.status(400).json({ error: "Invalid ID, Its not a number❌" });  // ENTONCES SI EL ID NO ES UN NUMERO CON EL (isNaN) SE LE DICE: is not a number❌
    }

    if (user) {    // AQUI LO QUE SE HACE ES QUE SI EL USUARIO SE ENCONTRO LA INFORMACION LA ENVIA EN FORMATO JSON 📖
      res.status(200).json(user);
    }

  } catch (error) {
    res.status(500).json({ error: "Error getting user" });
  }

};

//UPDATE USER BY ID
export const updateUser = async (req: Request, res: Response) => {

  try {

    const { id } = req.params  // HACEMOS UNA CONSTANTE ID PARA EXTRAER LOS PARAMETROS QUE TIENE EL POST
    const { name, email, password, role } = req.body
    const update = await userModel.findByPk(id); // HACEMOS UNA CONSTANTE PARA ESPECIFICARLE QUE VA A EXTRAER UN ID ESPECIFICO

    await update?.update({ // Y AQUI LE PASAMOS LO QUE PODRA ACTUALIZAR 🔄️
      name,
      email,
      password,
      role
    })
    res.json(update)

  } catch (error) {
    console.log('Failed to update', error)
  }
}

// POSTS USER

export const createUser = async (req: Request, res: Response) => {

  try {
       const { name, email, password, role } = req.body // EN ESTA PARTE EXTRAIMOS LAS PROPIEDADES DEL req.body QUE CONTIENE LA SOLICITUD HTTP👤
       const user = await userModel.create({
         name,                                 
         email,                               
         password,           
         role, 
       })
       res.json(user) // Y LE ENVIAMOS LA RESPUETA EN FORMATO JSON

     } catch(error) { 
         console.log('No se ha podido crear el usuario', error)
  }
}

//DELETE USER BY ID
export const deleteUser = async (req: Request, res: Response) => {

  try {
    const { id } = req.params;  // AQUI SE TRAE EL PARAMETRO id  DE LA URL PARA ELIMINAR EL POST QUE SE QUIERE ELIMINAR
    const user = await userModel.findByPk(id);  // AQUI SE BUSCA EL USUARIO EN LA BASE DE DATOS POR EL ID 🆔

    if (!user) {   // AQUI ESPECIFICA QUE SI NO ENCONTRO EL USUARIO DEVOLVERA ESO↙️
      res.status(404).json({ error: "user does not exist" });
    }
    await user?.destroy(); // Y AQUI SI EXITE SE ELIMINA EL USUARIO ✅
    res.json({ message: "user deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
}