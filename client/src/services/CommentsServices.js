import axios from 'axios'

const BaseUrl = 'http://localhost:8000/posts'

// GET para obtener todos los comentarios
export const getComments = async () => {
    try {
        const response = await axios.get(
            `${BaseUrl}/comments?_=${new Date().getTime()}`
        )
        return response.data
    } catch (error) {
        console.error('Error al obtener los comentarios', error)
        throw error
    }
}

// GET para obtener comentarios por ID de post
export const getCommentsByPostId = async (postId) => {
    try {
        if (!postId) {
            throw new Error('El ID del post es necesario')
        }

        const response = await axios.get(`${BaseUrl}/${postId}/comments`)
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('No se encontraron comentarios para este post.')
        } else {
            throw new Error(
                'Error al obtener los comentarios: ' + error.message
            )
        }
    }
}

// POST un nuevo comentario
export const createComment = async (commentsData) => {
    try {
        const response = await axios.post(
            `${BaseUrl}/${commentsData.post_id}/comments`,
            commentsData
        )
        return response.data
    } catch (error) {
        console.error('Error al crear el comentario', error)
        throw error
    }
}

// UPDATE un comentario existente por ID
export const updateComment = async (postId, commentId, updatedCommentData) => {
    try {
        const response = await axios.put(
            `${BaseUrl}/${postId}/comments/${commentId}`,
            updatedCommentData
        )
        return response.data
    } catch (error) {
        console.error('Error al actualizar el comentario', error)
        throw error
    }
}

// DELETE un comentario por ID
export const deleteComment = async (postId, commentId) => {
    try {
        await axios.delete(`${BaseUrl}/${postId}/comments/${commentId}`)
    } catch (error) {
        console.error('Error al eliminar el comentario', error)
        throw error
    }
}
