import React, { useState } from 'react'
import { createComment } from '../services/CommentsServices'
import { useParams } from 'react-router-dom'
import MyButton from '../components/Button'

const SendComment = () => {
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showWarning, setShowWarning] = useState(false)

    // Extracción del post_id desde la url
    const { id: post_id } = useParams()

    // Función manejo de envío del formulario
    const handleSubmit = async (e) => {
        // Verificación de longitud minima y máxima
        if (content.trim().length < 40 || content.trim().length > 150) {
            setShowWarning(true)
            return
        }

        // Si el contenido es válido, comienza el proceso de envío
        setIsSubmitting(true)
        setShowWarning(false)

        try {
            // Obtiene el id del usuario desde localStorage
            const user_id = localStorage.getItem('userId')

            // Crea del objeto con los valores marcados en la base de datos
            const commentData = {
                content: content.trim(),
                post_id: parseInt(post_id),
                user_id: parseInt(user_id),
                date: new Date().toISOString().split('T')[0],
            }

            // Función para crear un comentario
            await createComment(commentData)
            setContent('')
        } catch (error) {
            console.error('Error al enviar el comentario:', error)
            alert(
                'No se pudo enviar el comentario. Por favor, intenta de nuevo.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    // Función que maneja el cambio en el campo de texto del comentario
    const handleContentChange = (e) => {
        if (e.target.value.length <= 150) {
            setContent(e.target.value)
        }
        setShowWarning(false)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col lg:items-end"
        >
            <div className="relative w-full">
                <textarea
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                    className="w-full h-[120px] text-inter p-2 border rounded bg-white"
                    placeholder="Escribe tu comentario aquí..."
                    disabled={isSubmitting}
                />
                <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                    {content.length}/150
                </span>
            </div>
            {showWarning && (
                <p className="text-sm text-red-500 mt-1">
                    El comentario debe tener entre 40 y 150 caracteres.
                </p>
            )}
            <div className="mt-2 lg:w-[30%]">
                <MyButton
                    label="Enviar Comentario"
                    type="submit"
                    className="w-full p-2 flex lg:w-[full] items-center mb-10 font-inter font-bold text-black"
                    disabled={isSubmitting}
                />
            </div>
        </form>
    )
}

export default SendComment
