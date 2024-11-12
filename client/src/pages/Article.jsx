import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAdoptionsById } from '../services/AdoptionsServices'
import { getUsersById } from '../services/UsersServices'
import { getPostsById, toggleLike } from '../services/PostsServices'
import LikeButton from '../components/LikeButton'
import BoxComments from '../components/BoxComments'
import { RxUpdate } from 'react-icons/rx'
import { MdDeleteOutline } from 'react-icons/md'
import { deletePost } from '../services/PostsServices'
import { deleteAdoption } from '../services/AdoptionsServices'
import ModalForm from '../components/ModalForm'
import SendComment from '../components/SendComment'

const Article = () => {
    //UseParams para obtener parámetros de URL: id y artículo
    const { id, type } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState({})
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

    // Obtención de los datos del artículo (posts o adoptions) y del usuario
    const fetchData = async () => {
        setLoading(true)
        try {
            let result
            if (type === 'posts') {
                result = await getPostsById(id)
            } else if (type === 'adoptions') {
                result = await getAdoptionsById(id)
            }
            setData(result)

            // Verificación si el artículo ya ha sido marcado con like
            const likedItems =
                JSON.parse(localStorage.getItem('likedItems')) || {}
            setIsLiked(likedItems[id] || false)
            setLikeCount(result.like_count || 0)

            // Se obtiene el user_id del artículo
            if (result.user_id) {
                const userResult = await getUsersById(result.user_id)
                setUser(userResult)
            }
            setLoading(false)
        } catch (error) {
            console.error('Error obteniendo los datos:', error)
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [id, type])

    // Manejo de la función de click en LikeButton
    const handleLikeClick = async () => {
        const newLikeStatus = !isLiked
        const newLikeCount = newLikeStatus ? likeCount + 1 : likeCount - 1

        try {
            if (type === 'posts') {
                await toggleLike(id, newLikeCount)
            }

            // Actualización del like y el contador
            setIsLiked(newLikeStatus)
            setLikeCount(newLikeCount)

            // Guardamos el estado del like en localStorage para que se guarde cuando navegamos a otra parte de la web
            const likedItems =
                JSON.parse(localStorage.getItem('likedItems')) || {}
            if (newLikeStatus) {
                likedItems[id] = true
            } else {
                delete likedItems[id]
            }
            localStorage.setItem('likedItems', JSON.stringify(likedItems))
        } catch (error) {
            console.error('Error al actualizar el like:', error)
        }
    }

    // Función para abrir el modal de actualizar
    const handleUpdateClick = () => {
        setIsUpdateModalOpen(true)
    }

    // Función para eliminar
    const handleDeleteClick = async () => {
        const confirmation = window.confirm(
            `¿Estás seguro de eliminar esta ${
                type === 'posts' ? 'noticia' : 'adopción'
            }?`
        )
        if (confirmation) {
            try {
                if (type === 'posts') {
                    await deletePost(data.id)
                } else {
                    await deleteAdoption(data.id)
                }
                // Si es eliminado dentro de article redirige un paso atrás en la navegación
                navigate(-1)
            } catch (error) {
                console.error(
                    `Error al eliminar la ${
                        type === 'posts' ? 'noticia' : 'adopción'
                    }`,
                    error
                )
            }
        }
    }

    // Mensaje de carga mientras los datos están siendo obtenidos
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl text-[#222f1e]">Cargando...</p>
            </div>
        )
    }

    return (
        <div className="width-full mt- flex flex-col h-auto items-center bg-[#76816A]">
            <div className="mt-28 lg:gap-5 w-full flex flex-col items-center sm:flex-row sm:w-[80%]">
                <div className="w-[80%] h-[auto] sm:w-[70%] flex flex-col justify-center">
                    <h1 className="font-inter sm:w-[50%] text-3xl sm:text-5xl font-bold flex text-[#222f1e] mb-3 lg:text-7xl">
                        {type === 'adoptions' ? data.name : data.title}
                    </h1>
                    {type === 'adoptions' && (
                        <>
                            <p className="font-inter text-lg flex text-[#222f1e] mb-1 lg:text-3xl">
                                {data.age} años
                            </p>
                            <p className="font-inter text-lg text-[#222f1e] mb-1 lg:text-2xl">
                                {data.sex}
                            </p>
                        </>
                    )}
                    <p className="font-inter text-lg text-[#222f1e] mb-1 lg:text-2xl">
                        {data.date ? data.date : 'No disponible'}
                    </p>
                    <p className="font-inter text-lg text-[#222f1e] mb-2 lg:text-2xl">
                        Usuario:{' '}
                        {user.name ? user.name : 'Usuario no encontrado'}
                    </p>
                    <div className="flex items-center gap-4">
                        {type === 'posts' && (
                            <LikeButton
                                className="w-5 h-5 mr-5"
                                isLiked={isLiked}
                                likeCount={likeCount}
                                handleLikeClick={handleLikeClick}
                            />
                        )}
                        <RxUpdate
                            className="text-blue-500 cursor-pointer hover:text-blue-700"
                            size={25}
                            onClick={handleUpdateClick}
                        />
                        {isUpdateModalOpen && (
                            <ModalForm
                                onClose={() => {
                                    setIsUpdateModalOpen(false)
                                    fetchData()
                                }}
                                formType={type}
                                initialData={data}
                            />
                        )}
                        <MdDeleteOutline
                            className="text-red-500 cursor-pointer hover:text-red-700"
                            size={25}
                            onClick={handleDeleteClick}
                        />
                    </div>
                </div>
                <div className="flex mt-5 justify-center w-[80%] h-[auto] sm:mt-0 sm:h-[80%]">
                    <img
                        src={data.url_images}
                        alt="Imagen Artículo"
                        className="h-[47%] sm:w-[42vw] sm:h-[45vw] object-cover mb-5 lg:h-[500px]"
                    />
                </div>
            </div>
            <div className="w-[80%] mb-10 mt-2 lg:mt-9 flex flex-col items-center">
                <p className="font-inter text-lg text-[#222f1e] mb-20 sm:mb-40 lg:text-2xl">
                    {data.content}
                </p>
            </div>
            {type === 'posts' && (
                <div className="flex w-full bg-customGreen pb-16 flex-col items-center justify-start">
                    <div className="w-[80%] relative flex flex-col">
                        <h1 className="absolute top-[-6.3vh] lg:top-[-7.5vh] text-6xl font-bold text-left text-customGreen mb-0 lg:text-7xl">
                            COMENTARIOS
                        </h1>
                        <BoxComments post_id={id} />
                        <h3 className="text-[#76816A] text-2xl  font-semibold mb-2 mt-16 lg:text-3xl">
                            Deja tu comentario
                        </h3>
                        <SendComment post_id={id} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Article
