
import { Request, Response } from "express";
import  postModel  from "../models/postsModel";



// Get de los posts

export const getPosts = async (req: Request, res: Response) => { // EN ESTA LINEA EL req SE UTILIZA PARA LA SOLICITUD HTTP Y EL res PARA LA RESPUESTA✅
    
    try {
      const posts = await postModel.findAll(); // EN ESTE LINEA SE ESTA LLAMANDO A LA FUNCION findAll() DEL MODELO postModel PARA OBTENER TODOS LOS POSTS DE LA BASE DE DATOS 🔍
      res.json(posts); 

    } catch (error) {
      res.status(500).json({ error: "Error al obtener los posts" });
    }
};

// Get one id de un post

export const getPostById = async (req: Request, res: Response) => {

    try {

      const { id } = req.params;      // AQUI EXTRAE EL PARAMETRO id  DE LA URL DONE req.params CONTIENE ↙️
      const post = await postModel.findByPk(id); //  LOS PARAMETROS DINAMICOS DEL id DONDE ESTE ES EL IDENTIFICADOR DEL POST

      if (post) {    // AQUI LO QUE SE HACE ES QUE SI EL POST SE ENCONTRO LA INFORMACION LA ENVIA EN FORMATO JSON 📖
        res.json(post);
      } 

    } catch (error) {
      res.status(500).json({ error: "Error al obtener el post" });
    }

};

// Delete de los posts

export const deletePost = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;  // AQUI SE TRAE EL PARAMETRO id  DE LA URL PARA ELIMINAR EL POST QUE SE QUIERE ELIMINAR
        const post = await postModel.findByPk(id);  // AQUI SE BUSCA EL POST EN LA BASE DE DATOS POR EL ID 🆔

        await post?.destroy(); // Y AQUI SI EXITE SE ELIMINA EL POST ✅
        res.json({ message: "Post eliminado correctamente" });
   
   } catch (error) {
        res.status(500).json({ error: "Error al eliminar el post" });
    }   
}

// Post de los posts

export const createPost = async (req: Request, res: Response) => {

   try {
        const { title, content, user_id,  category, status, like_count, url_images, date } = req.body // EN ESTA PARTE EXTRAIMOS LAS PROPIEDADES DEL req.body QUE CONTIENE LA SOLICITUD HTTP👤
        const post = await postModel.create({
          title,                                 
          content,                               
          user_id,           // Y EN ESTAS LINEAS 
          category,         // CREAMOS EL POST CON
          status,          // EL METODO create DE SEQUELIZE
          like_count,
          url_images,
          date
        })
        res.json(post) // Y LE ENVIAMOS LA RESPUETA EN FORMATO JSON

      } catch(error) { 
          console.log('No se ha subir la publicacion', error)
   }
}

// Put de un post

export const updatePost = async( req: Request, res: Response ) =>{

  try {

    const { id } = req.params  // HACEMOS UNA CONSTANTE ID PARA EXTRAER LOS PARAMETROS QUE TIENE EL POST
    const {  title, content, user_id,  category, status, like_count, url_images, date } = req.body
    const update = await postModel.findByPk(id); // HACEMOS UNA CONSTANTE PARA ESPECIFICARLE QUE VA A EXTRAER UN ID ESPECIFICO
    
    await update?.update({ // Y AQUI LE PASAMOS LO QUE PODRA ACTUALIZAR 🔄️
      title,                                 
          content,                               
          user_id,         
          category,      
          status,          
          like_count,
          url_images,
          date
    })
      res.json(update)

  } catch(error) {
      console.log('No se ha podido actualizar', error)
  }
}