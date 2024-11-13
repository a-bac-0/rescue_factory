import React, { useState, useEffect } from 'react'
import {
    getCommentsByPostId,
    deleteComment,
} from '../services/CommentsServices'
import { getUsersById } from '../services/UsersServices'
import { MdDeleteOutline } from 'react-icons/md'
import Alert from './Alert'

const BoxComments = ({ post_id }) => {
    const [comments, setComments] = useState([])
    const [users, setUsers] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [commentToDelete, setCommentToDelete] = useState(null)

    const handleDeleteClick = (commentId) => {
        setCommentToDelete(commentId)
        setShowAlert(true)
    }

    // Función para confirmar eliminación
    const handleConfirmDelete = async () => {
        if (commentToDelete) {
            try {
                await deleteComment(commentToDelete)
                setComments((prevComments) =>
                    prevComments.filter(
                        (comment) => comment.id !== commentToDelete
                    )
                )
            } catch (error) {
                setError('Error al eliminar el comentario')
            }
        }
        setShowAlert(false)
        setCommentToDelete(null)
    }

    // Función para cancelar eliminación
    const handleCancelDelete = () => {
        setShowAlert(false)
        setCommentToDelete(null)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)

            try {
                if (!post_id) throw new Error('ID del post no válido')

                const commentData = await getCommentsByPostId(post_id)

                const filteredComments = commentData.filter(
                    (comment) => Number(comment.post_id) === Number(post_id)
                )

                setComments(filteredComments)

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
        <>
            {showAlert && (
                <Alert
                    message="¿Estás seguro de eliminar este comentario?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
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
        </>
    )
}

export default BoxComments
