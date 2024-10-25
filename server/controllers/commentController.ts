import { Request, Response } from "express";
import commentModel from "../models/commentsModel";
import { error } from "console";


// Get de los comentarios

export const getAllComments = async(req: Request, res:Response) => {
    try {
        const comments = await commentModel.findAll();
        res.json(comments)
        
    } catch (error) {
        console.log('Erros al cargar comentarios', error)
    }
}

// Get one id de un comentario

export const getOneComment = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const commentOne = await commentModel.findByPk(id);

        if(commentOne){
            res.json(commentOne)
        }
    } catch (error) {
        console.log('No se pudo acceder al comentario')
    }
}

// Delete de un comentario

export const deleteComment = async (req:Request, res:Response) => {

        const { id } = req.params;
    try { 
        const comentDelete = await commentModel.findByPk(id);

    if(!comentDelete) {
      return  res.status(404).json({error:'El comentario no existe'})
    }    

    await comentDelete?.destroy()
    res.json({message: 'Comentario eliminado'})
    
    } catch (error) {
        res.status(500).json({ error: 'No se pudo eliminar el comentario' });
    }
}

// Post de un comentario

export const createComment = async (req:Request, res:Response) => {
    try {
        const { content, post_id, user_id, createAd } = req.body;
        const comment = await commentModel.create({
            content,
            post_id,
            user_id,
            createAd,

        });
            res.json(comment)

     } catch (error) {
        console.log('No se pudo publicar el comentario', error)
    }
}

// Put de un comentario

export const updateComment = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const { content, post_id, user_id, createAd } = req.body;
        const commentUpdate = await commentModel.findByPk(id);

        await commentUpdate?.update({
            content,
            post_id,
            user_id,
            createAd,
        });
            res.json(commentUpdate)
    } catch (error) {
        console.log('No se pudo editar el comentario', error)
    }
}