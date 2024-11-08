import React, { useState, useEffect } from 'react'
import { getCommentsByPostId } from '../services/CommentsServices'
import { getUsersById } from '../services/UsersServices'

const BoxComments = ({ post_id }) => {
    const [comments, setComments] = useState([])
    const [users, setUsers] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const commentData = await getCommentsByPostId(post_id)

                // Verificar que commentData sea un array y tenga elementos
                if (Array.isArray(commentData) && commentData.length > 0) {
                    setComments(commentData)

                    // Obtener los usuarios relacionados con los comentarios
                    const userIds = [
                        ...new Set(
                            commentData.map((comment) => comment.user_id)
                        ),
                    ]
                    const userDataArray = await Promise.all(
                        userIds.map((id) => getUsersById(id))
                    )

                    // Almacenar los datos de los usuarios por ID
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
                <p className="font-inter text-sm text-gray-600 mt-2">
                    No hay comentarios aún.
                </p>
            ) : (
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-[#D1B85E] shadow-2xl p-4 rounded-md mt-4 w-full flex flex-col items-start"
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
