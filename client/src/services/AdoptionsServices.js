import axios from 'axios'

const BaseUrl = 'http://localhost:8000/adoptions'

// GET para obtener todas las adopciones
export const getAdoptions = async () => {
    try {
        const response = await axios.get(BaseUrl + '?_=' + new Date().getTime())
        return response.data
    } catch (error) {
        console.error('Error al obtener las adopciones', error)
        throw error
    }
}

// GET BY ID para obtener una adopción conreta
export const getAdoptionsById = async (id) => {
    try {
        const response = await axios.get(`${BaseUrl}/${id}`)
        return response.data
    } catch (error) {
        console.error('Error al obtener la adopción:', error)
        throw error
    }
}

// POST Crear una nueva adopción
export const createAdoption = async (adoptionsData) => {
    try {
        const response = await axios.post(BaseUrl, adoptionsData)
        return response.data
    } catch (error) {
        console.error('Error al crear la adopción:', error)
        throw error
    }
}

// Update una adopción existente por ID
export const updateAdoption = async (id, updatedAdoptionData) => {
    try {
        const response = await axios.put(
            `${BaseUrl}/${id}`,
            updatedAdoptionData
        )
        return response.data
    } catch (error) {
        console.error('Error al actualizar la adopción', error)
        throw error
    }
}

// DELETE una adopción por ID
export const deleteAdoption = async (id) => {
    try {
        await axios.delete(`${BaseUrl}/${id}`)
    } catch (error) {
        console.error('Error al eliminar la adopción:', error)
        throw error
    }
}
