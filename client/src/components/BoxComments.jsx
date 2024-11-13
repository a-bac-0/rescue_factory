import React, { useState, useEffect } from 'react'
import {
    getCommentsByPostId,
    deleteComment,
} from '../services/CommentsServices'
import { getUsersById } from '../services/UsersServices'
import { MdDeleteOutline } from 'react-icons/md'

const BoxComments = ({ post_id }) => {
    const [comments, setComments] = useState([])
    const [users, setUsers] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleDeleteClick = async (commentId) => {
        const confirmation = window.confirm(
            '¿Estás seguro de eliminar este comentario?'
        )
        if (confirmation) {
            try {
                await deleteComment(commentId)
                // Actualiza el estado local de los comentarios
                setComments((prevComments) =>
                    prevComments.filter((comment) => comment.id !== commentId)
                )
                // No es necesario recargar la página
            } catch (error) {
                console.error('Error al eliminar el comentario', error)
                setError('Error al eliminar el comentario')
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)

            try {
                if (!post_id) throw new Error('ID del post no válido')

                const commentData = await getCommentsByPostId(post_id)

                // Filtrar comentarios comparando los IDs como números
                const filteredComments = commentData.filter(
                    (comment) => Number(comment.post_id) === Number(post_id)
                )

                setComments(filteredComments)

                // Obtener información de los usuarios de los comentarios
                const userIds = [
                    ...new Set(
                        filteredComments.map((comment) => comment.user_id)
                    ),
                ]
                const userDataArray = await Promise.all(
                    userIds.map((id) => getUsersById(id).catch(() => null))
                )

                const userData = {}
                userDataArray.forEach((user) => {
                    if (user) userData[user.id] = user
                })
                setUsers(userData)
            } catch (err) {
                console.error('Error al obtener los comentarios', err)
                setError('Error al cargar los comentarios')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [post_id])

    if (loading) {
        return (
            <p className="font-inter text-sm text-black mt-2">
                Cargando comentarios...
            </p>
        )
    }

    if (error) {
        return <p className="font-inter text-sm text-red-500 mt-2">{error}</p>
    }

    return (
        <div className="w-full h-auto flex flex-col mt-7">
            {comments.length === 0 ? (
                <p className="font-inter text-sm text-gray-600 mt-2">
                    No hay comentarios aún. Sé el primero en comentar esta
                    noticia.
                </p>
            ) : (
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-[#D1B85E] shadow-2xl p-4 rounded-md mt-4 w-full flex flex-col items-start"
                    >
                        <div className="flex flex-col items-start justify-between w-full">
                            <p className="font-inter font-bold text-black">
                                {users[comment.user_id]?.name ||
                                    'Usuario desconocido'}
                            </p>
                            <p className="font-inter text-sm text-black">
                                {new Date(comment.date).toLocaleString()}
                            </p>
                        </div>
                        <p className="font-inter text-sm mt-2 text-black">
                            {comment.content}
                        </p>
                        <MdDeleteOutline
                            className="text-red-500 cursor-pointer hover:text-red-700 w-7 h-7"
                            onClick={() => handleDeleteClick(comment.id)}
                        />
                    </div>
                ))
            )}
        </div>
    )
}

export default BoxComments
