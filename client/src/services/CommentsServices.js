import axios from 'axios'

const BaseUrl = 'http://localhost:8000'

// GET para obtener todos los comentarios
export const getComments = async () => {
    try {
        const response = await axios.get(
            BaseUrl + '/comments?_=' + new Date().getTime()
        )
        return response.data
    } catch (error) {
        console.error('Error al obtener los comentarios', error)
        throw error
    }
}

// GET para obtener comentarios por ID de post
export const getCommentsByPostId = async (post_id) => {
    try {
        const response = await axios.get(`${BaseUrl}/posts/${post_id}/comments`) // URL corregida para usar post_id
        return response.data
    } catch (error) {
        console.error('Error al obtener los comentarios por ID de post', error)
        throw error
    }
}

// POST un nuevo comentario
export const createComment = async (commentsData) => {
    try {
        const response = await axios.post(
            `${BaseUrl}/posts/${commentsData.post_id}/comments`,
            commentsData
        )
        return response.data
    } catch (error) {
        console.error('Error al crear el comentario:', error)
        throw error
    }
}

// UPDATE un comentario existente por ID
export const updateComment = async (id, updatedCommentData) => {
    try {
        const response = await axios.put(
            `${BaseUrl}/comments/${id}`,
            updatedCommentData
        ) // URL corregida
        return response.data
    } catch (error) {
        console.error('Error al actualizar el comentario', error)
        throw error
    }
}

// DELETE un comentario por ID
export const deleteComment = async (id) => {
    try {
        const response = await axios.delete(`${BaseUrl}/comments/${id}`)
        return response.data
    } catch (error) {
        console.error('Error al eliminar el comentario', error)
        throw error
    }
}
