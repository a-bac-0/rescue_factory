import React, { useState } from 'react'
import { createComment } from '../services/CommentsServices'
import { useParams } from 'react-router-dom'
import MyButton from '../components/Button'

const SendComment = () => {
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showWarning, setShowWarning] = useState(false)
    const { id: post_id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Verifica si el contenido cumple con los requisitos de longitud
        if (content.trim().length < 40 || content.trim().length > 150) {
            setShowWarning(true) // Muestra la advertencia
            return
        }

        setIsSubmitting(true)
        setShowWarning(false) // Oculta la advertencia si el envío es exitoso

        try {
            const user_id = localStorage.getItem('userId')

            const commentData = {
                content: content.trim(),
                post_id: parseInt(post_id),
                user_id: parseInt(user_id),
                date: new Date().toISOString().split('T')[0],
            }

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

    const handleContentChange = (e) => {
        if (e.target.value.length <= 150) {
            setContent(e.target.value)
        }
        setShowWarning(false) // Oculta la advertencia cuando el usuario está escribiendo
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
