import { Request, Response } from 'express'
import commentModel from '../models/commentsModel'

// Get de los comentarios

export const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await commentModel.findAll()
        res.json(comments)
    } catch (error) {
        console.log('Erros al cargar comentarios', error)
    }
}

// Get one id de un comentario

export const getOneComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const commentOne = await commentModel.findByPk(id)

        if (commentOne) {
            res.json(commentOne)
        }
    } catch (error) {
        console.log('No se pudo acceder al comentario')
    }
}

// Delete de un comentario

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const comentDelete = await commentModel.findByPk(id)

        await comentDelete?.destroy()
        res.json({ message: 'Comentario eliminado' })
    } catch (error) {
        res.status(500).json({ error: 'No se pudo eliminar el comentario' })
    }
}

// Post de un comentario

export const createComment = async (req: Request, res: Response) => {
    try {
        const { content, user_id, date } = req.body
        const post_id = parseInt(req.params.postId) // Convertir a número

        if (!content || !post_id || !user_id || !date) {
            return res.status(400).json({
                error: 'Faltan datos requeridos para crear el comentario',
            })
        }

        const comment = await commentModel.create({
            content,
            post_id: post_id, // Asignado el número parseado
            user_id: parseInt(user_id), // Asegurar que user_id también sea número
            date,
        })

        res.status(201).json(comment)
    } catch (error: any) {
        console.error('Error al crear el comentario:', error)
        res.status(500).json({
            error: 'No se pudo publicar el comentario',
            details: error?.message || 'Error desconocido',
        })
    }
}

// Put de un comentario

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { content, post_id, user_id, date } = req.body
        const commentUpdate = await commentModel.findByPk(id)

        await commentUpdate?.update({
            content,
            post_id,
            user_id,
            date,
        })
        res.json(commentUpdate)
    } catch (error) {
        console.log('No se pudo editar el comentario', error)
    }
}
