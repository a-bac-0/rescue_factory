import axios from 'axios'

const BaseUrl = 'http://localhost:8000/contact_messages'

// GET para obtener todos los mensajes de contacto
export const getmessages = async () => {
    try {
        const response = await axios.get(BaseUrl + '?_=' + new Date().getTime())
        return response.data
    } catch (error) {
        console.error('Error al obtener los mensajes', error)
        throw error
    }
}

// GET BY ID para obtener un mensaje concreto
export const getMessagesById = async (id) => {
    try {
        const response = await axios.get(`${BaseUrl}/${id}`)
        return response.data
    } catch (error) {
        console.error('Error al obtener el mensaje', error)
        throw error
    }
}

// POST  un nuevo mensaje
export const createMessage = async (messagesData) => {
    try {
        const response = await axios.post(BaseUrl, messagesData)
        return response.data
    } catch (error) {
        console.error('Error al enviar el mensaje', error)
        throw error
    }
}
