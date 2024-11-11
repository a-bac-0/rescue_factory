import React, { useState, useEffect } from 'react'
import { getCommentsByPostId } from '../services/CommentsServices'
import { getUsersById } from '../services/UsersServices'
import { MdDeleteOutline } from 'react-icons/md'
import { deleteComment } from '../services/CommentsServices'

const BoxComments = ({ post_id }) => {
    const [comments, setComments] = useState([])
    const [users, setUsers] = useState({})

    const handleDeleteClick = async (commentId) => {
        const confirmation = window.confirm(
            '¿Estás seguro de eliminar este comentario?'
        )
        if (confirmation) {
            try {
                await deleteComment(commentId)
                setComments((prevComments) =>
                    prevComments.filter((comment) => comment.id !== commentId)
                )
            } catch (error) {
                console.error('Error al eliminar el comentario', error)
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const commentData = await getCommentsByPostId(post_id)

                if (Array.isArray(commentData) && commentData.length > 0) {
                    setComments(commentData)

                    // Obtenemos los usuarios por Id
                    const userIds = [
                        ...new Set(
                            commentData.map((comment) => comment.user_id)
                        ),
                    ]
                    const userDataArray = await Promise.all(
                        userIds.map((id) => getUsersById(id))
                    )

                    // Almacenamos los datos de los usuarios por ID
                    const userData = {}
                    userDataArray.forEach((user) => {
                        userData[user.id] = user
                    })
                    setUsers(userData)
                }
            } catch (err) {
                console.error('Error al obtener los comentarios', err)
            }
        }
        fetchData()
    }, [post_id])

    return (
        <div className="w-full h-auto flex flex-col mt-7">
            {comments.length === 0 ? (
                <p className="font-inter text-sm text-black mt-2">
                    No hay comentarios aún. Se el primero en comentar esta
                    noticia
                </p>
            ) : (
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-[#D1B85E] shadow-2xl p-4 rounded-md mt-4 w-full flex flex-col items-start"
                    >
                        <div className="flex flex-col items-start justify-between w-full">
                            <p className="font-inter font-bold  text-black">
                                {users[comment.user_id]?.name ||
                                    'Usuario desconocido'}
                            </p>
                            <p className="font-inter text-sm  text-black">
                                {comment.date}
                            </p>
                        </div>
                        <p className="font-inter text-sm mt-2 text-black">
                            {comment.content}
                        </p>
                        <MdDeleteOutline
                            className="text-red-500 cursor-pointer hover:text-red-700 w-7 h-7"
                            size={25}
                            onClick={() => handleDeleteClick(comment.id)}
                        />
                    </div>
                ))
            )}
        </div>
    )
}

export default BoxComments
