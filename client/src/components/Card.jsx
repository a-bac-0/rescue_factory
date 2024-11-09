import React, { useEffect, useState } from 'react'
import LikeButton from './LikeButton'
import MyButton from '../components/Button'
import { toggleLike } from '../services/PostsServices'
import { getUsersById } from '../services/UsersServices'
import { RxUpdate } from 'react-icons/rx'
import { MdDeleteOutline } from 'react-icons/md'
import { deletePost } from '../services/PostsServices'
import { deleteAdoption } from '../services/AdoptionsServices'

// Constantes para límites de caracteres
const CHAR_LIMIT_SMALL = 70
const CHAR_LIMIT_MEDIUM = 200
const CHAR_LIMIT_LARGE = 320

const Card = ({ datatype, data }) => {
    const [charLimit, setCharLimit] = useState(CHAR_LIMIT_SMALL)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(data.like_count)
    const [user, setUser] = useState({})

    useEffect(() => {
        const updateCharLimit = () => {
            if (window.innerWidth >= 1024) {
                setCharLimit(CHAR_LIMIT_LARGE)
            } else if (window.innerWidth >= 768) {
                setCharLimit(CHAR_LIMIT_MEDIUM)
            } else {
                setCharLimit(CHAR_LIMIT_SMALL)
            }
        }
        window.addEventListener('resize', updateCharLimit)
        updateCharLimit()
        return () => window.removeEventListener('resize', updateCharLimit)
    }, [])

    useEffect(() => {
        if (datatype === 'posts') {
            const likedItems = JSON.parse(
                localStorage.getItem('likedItems') || '{}'
            )
            setIsLiked(likedItems[data.id] || false)
        }
        setLikeCount(data.like_count)
    }, [data.id, data.like_count, datatype])

    useEffect(() => {
        const fetchUser = async () => {
            if (data.user_id) {
                const userResult = await getUsersById(data.user_id)
                setUser(userResult)
            }
        }
        fetchUser()
    }, [data.user_id])

    const truncateContent = (text) => {
        const limit = datatype === 'adoptions' ? CHAR_LIMIT_SMALL : charLimit
        const words = text.split(' ')
        let truncatedText = ''
        for (let word of words) {
            if ((truncatedText + word).length > limit) break
            truncatedText += word + ' '
        }
        return truncatedText.trim() + ' (...)'
    }

    const handleLikeClick = async (e) => {
        e.stopPropagation()
        if (datatype !== 'posts') return
        const newLikeStatus = !isLiked
        const newLikeCount = newLikeStatus ? likeCount + 1 : likeCount - 1
        try {
            await toggleLike(data.id, newLikeCount)
            setLikeCount(newLikeCount)
            setIsLiked(newLikeStatus)
            const likedItems = JSON.parse(
                localStorage.getItem('likedItems') || '{}'
            )
            if (newLikeStatus) {
                likedItems[data.id] = true
            } else {
                delete likedItems[data.id]
            }
            localStorage.setItem('likedItems', JSON.stringify(likedItems))
        } catch (error) {
            console.error('Error al actualizar el "like"', error)
        }
    }

    // Funcionalidad eliminar adopción o noticia. Añadimos alerta provisional hasta tener la alerta personalizada
    const handleDeleteClick = async () => {
        const confirmation = window.confirm(
            `¿Estás seguro de eliminar esta ${
                datatype === 'posts' ? 'noticia' : 'adopción'
            }?`
        )
        if (confirmation) {
            try {
                if (datatype === 'posts') {
                    await deletePost(data.id)
                } else {
                    await deleteAdoption(data.id)
                }
                window.location.reload()
            } catch (error) {
                console.error(
                    `Error al eliminar la ${
                        datatype === 'posts' ? 'noticia' : 'adopción'
                    }`,
                    error
                )
            }
        }
    }

    // Estilos para los componentes de adopciones
    const adoptionsStyles = {
        cardContainer:
            'bg-white items-center w-[330px] h-[auto] pb-5 flex flex-col shadow-md cursor-pointer hover:scale-102 transition-transform duration-300', // Reducir pb-9 a pb-5
        contentContainer: 'flex flex-col justify-center items-start w-[85%]',
        title: 'w-full h-[18px] text-left pt-8 pb-6 mb-1 font-inter font-bold text-[18px]',
        subtitle: 'w-full text-left font-inter text-[15px]',
        additionalInfo: 'w-full text-left mb-2 font-inter text-[15px]',
        content: 'w-full text-left font-inter pt-1 text-[15px] mb-2',
        image: 'w-[85%] h-[200px] object-cover rounded-md mx-auto',
        showMoreButton:
            'w-full h-[auto] mb-1 p-1 text-black font-inter font-bold text-[15px] rounded-md mb-2',
        iconContainer: 'flex justify-center mt-2 gap-4',
    }

    // Estilos vinculados al tipo de datos "posts"
    const postsStyles = {
        cardContainer:
            'bg-white shadow-lg w-[auto] h-[auto] items-center flex flex-row hover:scale-102 transition-transform duration-300',
        contentContainer: 'p-4 flex-col w-[45%] md:w-[70%]',
        title: 'text-black mb-2 font-inter font-bold text-[14px] md:text-[16px] lg:text-[19px]',
        subtitle:
            'text-black font-inter text-[14px] md:text-[12px] lg:text-[15px]',
        content: 'mt-4 text-black text-[13px] md:text-[12px] lg:text-[15px]',
        additionalInfo: 'text-black text-[13px] md:text-[12px] lg:text-[15px]',
        image: 'rounded-md w-[50%] h-[90%] m-3 object-cover md:w-[50%] md:h-[300px] md:ml-auto',
        likeCount:
            'mt-2 flex items-center text-black text-[12px] cursor-pointer lg:text-[13px]',
        showMoreButton:
            'w-full h-[auto] mb-2 p-2 text-black font-inter font-bold text-[13px] sm:text-[16px] rounded-md mt-2 lg:text-[16px]',
        iconContainer: 'flex justify-start items-center mt-2 gap-4',
    }

    const styles = datatype === 'adoptions' ? adoptionsStyles : postsStyles

    return (
        <div className={`${styles.cardContainer}`}>
            <div className={`${styles.contentContainer}`}>
                <h1 className={`${styles.title}`}>
                    {datatype === 'adoptions' ? data.name : data.title}
                </h1>
                <h2 className={`${styles.subtitle}`}>
                    {datatype === 'adoptions' ? `${data.age} años` : data.date}
                </h2>
                {datatype === 'adoptions' && (
                    <h2 className={`${styles.additionalInfo}`}>{data.sex}</h2>
                )}
                <p className={`${styles.adoptionsAuthor}`}>
                    Usuario: {user.name ? user.name : 'Usuario no encontrado'}
                </p>
                <p className={`${styles.content}`}>
                    {truncateContent(data.content)}
                </p>
                <MyButton
                    label="Seguir leyendo"
                    className={`${styles.showMoreButton}`}
                    onClick={() =>
                        (window.location.href = `/${datatype}/${data.id}`)
                    }
                />
                <div className={`${styles.iconContainer}`}>
                    {datatype === 'posts' && (
                        <>
                            <LikeButton
                                isLiked={isLiked}
                                likeCount={likeCount}
                                handleLikeClick={handleLikeClick}
                            />
                            <button>
                                <RxUpdate className="text-xl text-blue-500 hover:text-blue-700" />
                            </button>
                            <button onClick={handleDeleteClick}>
                                <MdDeleteOutline className="text-xl text-red-500 hover:text-red-700" />
                            </button>
                        </>
                    )}
                </div>
            </div>
            <img
                src={data.url_images}
                alt={datatype === 'adoptions' ? data.name : data.title}
                className={`${styles.image}`}
            />
            {datatype === 'adoptions' && (
                <div className={`${styles.iconContainer}`}>
                    <button>
                        <RxUpdate className="text-xl text-blue-500 hover:text-blue-700" />
                    </button>
                    <button onClick={handleDeleteClick}>
                        <MdDeleteOutline className="text-xl text-red-500 hover:text-red-700" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default Card
