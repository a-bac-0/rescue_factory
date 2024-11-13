import React, { useEffect, useState } from 'react'
import LikeButton from './LikeButton'
import MyButton from '../components/Button'
import { toggleLike } from '../services/PostsServices'
import { getUsersById } from '../services/UsersServices'
import { RxUpdate } from 'react-icons/rx'
import { MdDeleteOutline } from 'react-icons/md'
import { deletePost } from '../services/PostsServices'
import { deleteAdoption } from '../services/AdoptionsServices'
import ModalForm from '../components/ModalForm'
import Alert from './Alert'

// Limite de carácteres dependiendo del tamaño de la pantalla
const CHAR_LIMIT_SMALL = 70
const CHAR_LIMIT_MEDIUM = 200
const CHAR_LIMIT_LARGE = 320

const Card = ({ datatype, data, onUpdate }) => {
    const [charLimit, setCharLimit] = useState(CHAR_LIMIT_SMALL)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(data.like_count)
    const [user, setUser] = useState({})
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [cardData, setCardData] = useState(data)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)

    // Establecemos los tamaños de pantalla ligados al límite de carácteres
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

    // UseEffect para mostrar el estado inicial del like (activado o no) y el contador
    useEffect(() => {
        if (datatype === 'posts') {
            const likedItems = JSON.parse(
                localStorage.getItem('likedItems') || '{}'
            )
            setIsLiked(likedItems[cardData.id] || false)
        }
        setLikeCount(cardData.like_count)
    }, [cardData.id, cardData.like_count, datatype])

    // Obtención del user_id del post o el adoption
    useEffect(() => {
        const fetchUser = async () => {
            if (cardData.user_id) {
                const userResult = await getUsersById(cardData.user_id)
                setUser(userResult)
            }
        }
        fetchUser()
    }, [cardData.user_id])

    // Función para limitar el texto mostrado en la card. Limite a través de palabras completas
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

        try {
            // Lógica de update de posts
            const updatedPost = await toggleLike(
                cardData.id,
                isLiked ? likeCount - 1 : likeCount + 1
            )
            setIsLiked(!isLiked)
            setLikeCount(updatedPost.like_count)

            // Update en el localStorage
            const likedItems =
                JSON.parse(localStorage.getItem('likedItems')) || {}
            if (isLiked) {
                delete likedItems[cardData.id]
            } else {
                likedItems[cardData.id] = true
            }
            localStorage.setItem('likedItems', JSON.stringify(likedItems))
        } catch (error) {
            console.error('Error updating the like:', error)
            alert(
                'There was an error updating the like. Please try again later.'
            )
        }
    }

    // Apertura del modal
    const handleUpdateClick = (e) => {
        e.stopPropagation()
        setIsUpdateModalOpen(true)
    }

    // Cierre del modal y actualización de los datos, si la ha habido
    const handleModalClose = async (updatedData) => {
        setIsUpdateModalOpen(false)
        // Se actualiza si hay datos nuevos y diferentes a los existentes
        if (
            updatedData &&
            JSON.stringify(updatedData) !== JSON.stringify(cardData)
        ) {
            setCardData(updatedData)
            if (onUpdate) {
                onUpdate(updatedData)
            }
        }
    }
    // Eliminación del artículo y actualización
    const handleDeleteClick = (e) => {
        e.stopPropagation()
        setShowDeleteAlert(true)
    }

    // Función para confirmar el delete
    const handleDeleteConfirm = async () => {
        try {
            if (datatype === 'posts') {
                await deletePost(cardData.id)
            } else {
                await deleteAdoption(cardData.id)
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

    // Función para la cancelación
    const handleDeleteCancel = () => {
        setShowDeleteAlert(false)
    }

    // Estilos para adoptions
    const adoptionsStyles = {
        cardContainer:
            'bg-white items-center w-[330px] h-[auto] pb-5 flex flex-col shadow-md cursor-pointer hover:scale-102 transition-transform duration-300',
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

    // Estilos para posts
    const postsStyles = {
        cardContainer:
            'bg-white shadow-lg w-[90vw] h-[auto] lg:w-full -center flex flex-row hover:scale-102 transition-transform duration-300',
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
            'w-full h-[auto] mb-2 p-2 text-black font-inter font-bold text-[12px] sm:text-[16px] rounded-md mt-2 lg:text-[16px]',
        iconContainer: 'flex justify-start items-center mt-2 gap-4',
    }

    const styles = datatype === 'adoptions' ? adoptionsStyles : postsStyles

    return (
        <>
            <div className={`${styles.cardContainer}`}>
                <div className={`${styles.contentContainer}`}>
                    <h1 className={`${styles.title}`}>
                        {datatype === 'adoptions'
                            ? cardData.name
                            : cardData.title}
                    </h1>
                    <h2 className={`${styles.subtitle}`}>
                        {datatype === 'adoptions'
                            ? `${cardData.age} años`
                            : cardData.date}
                    </h2>
                    {datatype === 'adoptions' && (
                        <h2 className={`${styles.additionalInfo}`}>
                            {cardData.sex}
                        </h2>
                    )}
                    <p className={`${styles.adoptionsAuthor}`}>
                        Usuario:{' '}
                        {user.name ? user.name : 'Usuario no encontrado'}
                    </p>
                    <p className={`${styles.content}`}>
                        {truncateContent(cardData.content)}
                    </p>
                    <MyButton
                        label="Seguir leyendo"
                        className={`${styles.showMoreButton}`}
                        onClick={() =>
                            (window.location.href = `/${datatype}/${cardData.id}`)
                        }
                    />
                    <div className={`${styles.iconContainer}`}>
                        {datatype === 'posts' && (
                            <>
                                <LikeButton
                                    className="w-4 h-4 mr-5"
                                    isLiked={isLiked}
                                    likeCount={likeCount}
                                    handleLikeClick={handleLikeClick}
                                />
                                <button onClick={handleUpdateClick}>
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
                    src={cardData.url_images}
                    alt={
                        datatype === 'adoptions'
                            ? cardData.name
                            : cardData.title
                    }
                    className={`${styles.image}`}
                />
                {datatype === 'adoptions' && (
                    <div className={`${styles.iconContainer}`}>
                        <button onClick={handleUpdateClick}>
                            <RxUpdate className="text-xl text-blue-500 hover:text-blue-700" />
                        </button>
                        <button onClick={handleDeleteClick}>
                            <MdDeleteOutline className="text-xl text-red-500 hover:text-red-700" />
                        </button>
                    </div>
                )}

                {isUpdateModalOpen && (
                    <ModalForm
                        onClose={handleModalClose}
                        formType={datatype}
                        initialData={cardData}
                    />
                )}
            </div>

            {showDeleteAlert && (
                <Alert
                    message={`¿Estás seguro de eliminar esta ${
                        datatype === 'posts' ? 'noticia' : 'adopción'
                    }?`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                />
            )}
        </>
    )
}

export default Card
