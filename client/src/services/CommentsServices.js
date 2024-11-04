import axios from 'axios'

const BaseUrl = 'http://localhost:8000/comments'

// GET para obtener todos los comentarios
export const getComments = async () => {
    try {
        const response = await axios.get(BaseUrl + '?_=' + new Date().getTime())
        return response.data
    } catch (error) {
        console.error('Error al obtener los comentarios', error)
        throw error
    }
}

// POST  un nuevo comentario
export const createComment = async (commentsData) => {
    try {
        const response = await axios.post(BaseUrl, commentsData)
        return response.data
    } catch (error) {
        console.error('Error al crear el comentario', error)
        throw error
    }
}

// UPDATE un comentario existente por ID
export const updateComment = async (id, updatedCommentData) => {
    try {
        const response = await axios.put(`${BaseUrl}/${id}`, updatedCommentData)
        return response.data
    } catch (error) {
        console.error('Error al actualizar el comentario', error)
        throw error
    }
}

// DELETE un comentario por ID
export const deleteComment = async (id) => {
    try {
        await axios.delete(`${BaseUrl}/${id}`)
    } catch (error) {
        console.error('Error al eliminar el comentario', error)
        throw error
    }
}
