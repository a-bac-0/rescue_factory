import { Request, Response } from "express";
import commentModel from "../models/commentsModel";

// Get de los comentarios
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentModel.findAll();
    res.json(comments);
  } catch (error) {
    console.log('Error loading comments', error);
    res.status(500).json({ error: 'Error retrieving comments' });
  }
}

// Get one id de un comentario
export const getOneComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const commentOne = await commentModel.findByPk(id);

    if (commentOne) {
      res.json(commentOne);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    console.log('Unable to access the comment');
    res.status(500).json({ error: 'Error retrieving the comment' });
  }
}

// Delete de un comentario
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const commentToDelete = await commentModel.findByPk(id);

    if (commentToDelete) {
      await commentToDelete.destroy();
      res.json({ message: 'Comment successfully deleted' });
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    console.log('Error deleting the comment', error);
    res.status(500).json({ error: 'Unable to delete the comment' });
  }
}

// Post de un comentario

export const createComment = async (req:Request, res:Response) => {
  try {
     
      const { content, post_id, user_id, date } = req.body;
      const comment = await commentModel.create({
          content,
          post_id,
          user_id,         
          date,

      });
          res.json(comment)

   } catch (error) {
      console.log('No se pudo publicar el comentario', error)
  }
}

// Put de un comentario
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, post_id, user_id, date } = req.body;
    const commentToUpdate = await commentModel.findByPk(id);

    if (commentToUpdate) {
      await commentToUpdate.update({
        content,
        post_id,
        user_id,
        date,
      });
      res.json(commentToUpdate);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    console.log('Unable to update the comment', error);
    res.status(500).json({ error: 'Error updating the comment' });
  }
}
