import React, { useState, useEffect } from 'react'
import { getCommentsByPostId } from '../services/CommentsServices'
import { getUsersById } from '../services/UsersServices'

const BoxComments = ({ postId }) => {
    const [comments, setComments] = useState([])
    const [users, setUsers] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const commentData = await getCommentsByPostId(postId)

                if (Array.isArray(commentData) && commentData.length > 0) {
                    setComments(commentData)

                    const userIds = new Set(
                        commentData.map((comment) => comment.user_id)
                    )

                    const userData = {}
                    for (const userId of userIds) {
                        const user = await getUsersById(userId)
                        userData[user.id] = user
                    }
                    setUsers(userData)
                } else {
                    setError(
                        'No hay comentarios disponibles para este contenido.'
                    )
                }
                setLoading(false)
            } catch (err) {
                setLoading(false)
                console.error('Error al obtener los comentarios', err)
                if (err.response?.status === 404) {
                    setError('No se encontraron comentarios para este post.')
                } else {
                    setError(
                        'Ha ocurrido un error al cargar los comentarios. Por favor, inténtalo de nuevo más tarde.'
                    )
                }
            }
        }

        if (postId) {
            fetchData()
        }
    }, [postId])

    if (error) {
        return (
            <div className="w-full">
                <p className="w-[90%] font-inter text-sm text-red-500 mt-7">
                    {error}
                </p>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="w-full p-4 text-center font-inter">
                Cargando comentarios...
            </div>
        )
    }

    return (
        <div className="w-full h-auto flex flex-col mt-7">
            {comments.length === 0 ? (
                <p className="font-inter text-sm text-gray-600 mt-2">
                    No hay comentarios aún.
                </p>
            ) : (
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-[#D1B85E] p-4 rounded-md mt-4 w-full flex flex-col items-start"
                    >
                        <div className="flex flex-col items-start justify-between w-full">
                            <p className="font-inter font-bold text-gray-900">
                                {users[comment.user_id]?.name ||
                                    'Usuario desconocido'}
                            </p>
                            <p className="font-inter text-sm text-gray-700">
                                {comment.date}
                            </p>
                        </div>
                        <p className="font-inter text-sm mt-2 text-gray-800">
                            {comment.content}
                        </p>
                    </div>
                ))
            )}
        </div>
    )
}

export default BoxComments
