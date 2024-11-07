import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAdoptionsById } from '../services/AdoptionsServices'
import { getUsersById } from '../services/UsersServices'
import { getPostsById, toggleLike } from '../services/PostsServices'
import LikeButton from '../components/LikeButton'

const Article = () => {
    const { id, type } = useParams()
    const [data, setData] = useState({})
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result
                if (type === 'posts') {
                    result = await getPostsById(id)
                } else if (type === 'adoptions') {
                    result = await getAdoptionsById(id)
                }
                setData(result)

                // Obtener el estado de "like" desde localStorage usando el ID
                const likedItems =
                    JSON.parse(localStorage.getItem('likedItems')) || {}
                setIsLiked(likedItems[id] || false)
                setLikeCount(result.like_count || 0)

                if (result.user_id) {
                    const userResult = await getUsersById(result.user_id)
                    setUser(userResult)
                }

                setLoading(false)
            } catch (error) {
                console.error('Error obteniendo los datos:', error)
            }
        }

        fetchData()
    }, [id, type])

    const handleLikeClick = async () => {
        const newLikeStatus = !isLiked
        const newLikeCount = newLikeStatus ? likeCount + 1 : likeCount - 1

        try {
            if (type === 'posts') {
                await toggleLike(id, newLikeCount)
            }

            setIsLiked(newLikeStatus)
            setLikeCount(newLikeCount)

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

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <div className="width-full mt- flex flex-col h-auto items-center  bg-[#76816A]">
            <div className="lg:gap-5 mt-20 w-full flex flex-col items-center sm:flex-row sm:w-[80%]">
                <div className="w-[80%] h-[auto]  sm:w-[70%] flex flex-col justify-center">
                    <h1 className="font-inter sm:w-[50%] text-3xl font-bold flex text-black mb-3 lg:text-7xl">
                        {type === 'adoptions' ? data.name : data.title}
                    </h1>
                    {type === 'adoptions' && (
                        <>
                            <p className="font-inter text-lg flex text-black mb-1 lg:text-3xl">
                                {data.age} años
                            </p>
                            <p className="font-inter text-lg text-black mb-1 lg:text-2xl">
                                {data.sex}
                            </p>
                        </>
                    )}
                    <p className="font-inter text-lg text-black mb-1 lg:text-2xl">
                        Fecha: {data.date ? data.date : 'No disponible'}
                    </p>
                    <p className="font-inter text-lg text-black mb-2 lg:text-2xl">
                        Usuario:{' '}
                        {user.name ? user.name : 'Usuario no encontrado'}
                    </p>
                    {type === 'posts' && (
                        <LikeButton
                            isLiked={isLiked}
                            likeCount={likeCount}
                            handleLikeClick={handleLikeClick}
                        />
                    )}
                </div>
                <div className="flex mt-5 justify-center w-[80%] h-[auto] sm:mt-0 sm:h-[80%]">
                    <img
                        src={data.url_images}
                        alt="Imagen Artículo"
                        className="h-[47%] sm:w-[42vw] sm:h-[45vw] object-cover mb-5 lg:h-[500px] "
                    />
                </div>
            </div>
            <div className="w-[80%] mb-10 mt-2 sm:mt-9 flex items-center">
                <p className="font-inter text-lg text-black mb-5 lg:text-2xl">
                    {data.content}
                </p>
            </div>
        </div>
    )
}

export default Article
