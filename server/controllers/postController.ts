
import { Request, Response } from "express";
import  postModel  from "../models/postsModel";



// Get de los posts

export const getPosts = async (req: Request, res: Response) => { // EN ESTA LINEA EL req SE UTILIZA PARA LA SOLICITUD HTTP Y EL res PARA LA RESPUESTA✅
    
    try {
      const posts = await postModel.findAll(); // EN ESTE LINEA SE ESTA LLAMANDO A LA FUNCION findAll() DEL MODELO postModel PARA OBTENER TODOS LOS POSTS DE LA BASE DE DATOS 🔍
      res.json(posts); 

    } catch (error) {
      res.status(500).json({ error: "Error getting posts" });
    }
};

// Get one id de un post

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await postModel.findByPk(id);

    if (!post) {
      res.status(404).json({ message: "Post not found" }); // Respuesta 404 si no existe
      return;
    }

    res.status(200).json(post); // Código 200 explícito en caso de éxito
  } catch (error) {
    res.status(500).json({ error: "Error getting post" });
  }
};


// Delete de los posts

export const deletePost = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const post = await postModel.findByPk(id);

      if (!post) {
        res.status(404).json({ message: "Post not found" }); // Si no se encuentra
        return;
      }

      await post.destroy();
      res.status(200).json({ message: "Post deleted successfully" }); // Código 200 explícito
  } catch (error) {
      res.status(500).json({ error: "Error deleting post" });
  }
};


// Post de los posts

export const createPost = async (req: Request, res: Response) => {
  try {
       const { title, content, user_id, category, status, like_count, url_images, date } = req.body;
       const post = await postModel.create({
         title, content, user_id, category, status, like_count, url_images, date
       });
       res.status(201).json(post); // Código 201 para creación exitosa
     } catch(error) {
         console.error('The post could not be uploaded', error);
         res.status(500).json({ message: "Error creating post" }); // Respuesta de error
  }
}


// Put de un post

export const updatePost = async( req: Request, res: Response ) => {
  try {
    const { id } = req.params;
    const { title, content, user_id, category, status, like_count, url_images, date } = req.body;
    const post = await postModel.findByPk(id);

    if (!post) {
      res.status(404).json({ message: "Post not found" }); // Si no se encuentra
      return;
    }

    await post.update({ title, content, user_id, category, status, like_count, url_images, date });
    res.status(200).json(post); // Código 200 explícito para actualización
  } catch(error) {
      console.error('Failed to update', error);
      res.status(500).json({ message: "Error updating post" });
  }
}
