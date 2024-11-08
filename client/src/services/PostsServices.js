import axios from 'axios'

const BaseUrl = 'http://localhost:8000/posts'

// GET para obtener todas la sección de noticias (posts)
export const getPosts = async () => {
    try {
        const response = await axios.get(BaseUrl + '?_=' + new Date().getTime())
        return response.data
    } catch (error) {
        console.error('Error al obtener las noticias', error)
        throw error
    }
}

// GET BY ID para obtener una noticia (posts) conreta
export const getPostsById = async (id) => {
    try {
        const response = await axios.get(`${BaseUrl}/${id}`)
        return response.data
    } catch (error) {
        console.error('Error al obtener la noticia', error)
        throw error
    }
}

//  GET para obtener todas las noticias (posts) por categoría
export const getPostsByCategory = async (category) => {
    try {
        const response = await axios.get(
            `${BaseUrl}?category=${encodeURIComponent(category)}`
        )
        console.log('Respuesta de la API por categoría:', response.data)
        return response.data
    } catch (error) {
        console.error('Error al obtener notivcias por categoría:', error)
        throw error
    }
}

// POST  una nueva noticia (posts)
export const createPost = async (PostsData) => {
    try {
        const response = await axios.post(BaseUrl, PostsData)
        return response.data
    } catch (error) {
        console.error('Error al crear la noticia', error)
        throw error
    }
}

// UPDATE una noticia (posts) existente por ID
export const updatePost = async (id, updatedPostData) => {
    try {
        const response = await axios.put(`${BaseUrl}/${id}`, updatedPostData)
        return response.data
    } catch (error) {
        console.error('Error al actualizar la noticia', error)
        throw error
    }
}

// DELETE una noticia (posts) por ID
export const deletePost = async (id) => {
    try {
        await axios.delete(`${BaseUrl}/${id}`)
    } catch (error) {
        console.error('Error al eliminar la noticia', error)
        throw error
    }
}

export const toggleLike = async (id, likeCount) => {
    try {
        const response = await axios.patch(`${BaseUrl}/${id}`, {
            like_count: likeCount,
        })
        return response.data
    } catch (error) {
        console.error('Error al actualizar el contador de likes', error)
        throw error
    }
}
