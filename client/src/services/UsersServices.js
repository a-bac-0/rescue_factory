import axios from 'axios'

const BaseUrl = 'http://localhost:8000/users'

// GET para obtener todos los usuarios
export const getUsers = async () => {
    try {
        const response = await axios.get(BaseUrl + '?_=' + new Date().getTime())
        return response.data
    } catch (error) {
        console.error('Error al obtener los usuarios', error)
        throw error
    }
}

// GET BY ID para obtener un usuario concreto
export const getUsersById = async (id) => {
    try {
        const response = await axios.get(`${BaseUrl}/${id}`)
        return response.data
    } catch (error) {
        console.error('Error al obtener el usuario', error)
        throw error
    }
}

// POST  un nuevo usuario
export const createUser = async (usersData) => {
    try {
        const response = await axios.post(BaseUrl, usersData)
        return response.data
    } catch (error) {
        console.error('Error al crear el usuario', error)
        throw error
    }
}

// UPDATE un usuario existente por ID
export const updateUser = async (id, updatedUserData) => {
    try {
        const response = await axios.put(`${BaseUrl}/${id}`, updatedUserData)
        return response.data
    } catch (error) {
        console.error('Error al actualizar el usuario', error)
        throw error
    }
}

// DELETE un usuario por ID
export const deleteUser = async (id) => {
    try {
        await axios.delete(`${BaseUrl}/${id}`)
    } catch (error) {
        console.error('Error al eliminar el usuario', error)
        throw error
    }
}
